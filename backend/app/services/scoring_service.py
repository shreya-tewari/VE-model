"""
The diagnostic engine.

Both the Client walkthrough and the BDM qualification flow end up here.
It scores the answers against five engagement models, picks a package
tier, estimates an effort range, flags risk signals, and writes the
responsibility boundaries + a short human-readable summary.

The five outcomes:
  - staff_augmentation : client has strong internal ownership, just needs hands
  - agency              : client wants a partner to own delivery end-to-end,
                          ongoing relationship, evolving scope
  - project_outsourcing : well-defined scope, fixed budget, one-off delivery
  - process_outsourcing : recurring/operational work, not a single project
  - discovery           : scope is too undefined to commit to any of the above

This is intentionally a transparent, rule-based model (not a black box)
so a BDM can explain *why* a recommendation came out the way it did -
that's what `summary` and `responsibilities` are for.
"""
from app.schemas.report import WalkthroughAnswers, ScoringResult

MODELS = [
    "staff_augmentation",
    "agency",
    "project_outsourcing",
    "process_outsourcing",
    "discovery",
]

MODEL_LABELS = {
    "staff_augmentation": "Staff Augmentation",
    "agency": "Agency",
    "project_outsourcing": "Project Outsourcing",
    "process_outsourcing": "Process Outsourcing",
    "discovery": "Discovery",
}

PACKAGE_LABELS = {
    "starter": "Starter",
    "growth": "Growth",
    "enterprise": "Enterprise",
}


def _score_models(a: WalkthroughAnswers) -> dict[str, float]:
    scores = {m: 0.0 for m in MODELS}

    # --- scope definition ---
    if a.has_defined_scope == "yes":
        scores["project_outsourcing"] += 3
        scores["staff_augmentation"] += 1
    elif a.has_defined_scope == "rough":
        scores["agency"] += 2
        scores["project_outsourcing"] += 1
    else:  # no / unknown
        scores["discovery"] += 4

    # --- internal team ---
    if a.internal_team_size == "established":
        scores["staff_augmentation"] += 3
    elif a.internal_team_size == "small":
        scores["agency"] += 2
        scores["staff_augmentation"] += 1
    else:  # none
        scores["agency"] += 2
        scores["project_outsourcing"] += 1

    # --- who owns product decisions ---
    if a.who_owns_product_decisions == "client":
        scores["staff_augmentation"] += 2
    elif a.who_owns_product_decisions == "shared":
        scores["agency"] += 2
    elif a.who_owns_product_decisions == "vendor":
        scores["project_outsourcing"] += 2
        scores["process_outsourcing"] += 1

    # --- engagement length ---
    if a.engagement_length == "short":
        scores["project_outsourcing"] += 2
    elif a.engagement_length == "ongoing":
        scores["agency"] += 2
        scores["process_outsourcing"] += 2
    else:
        scores["discovery"] += 1

    # --- budget certainty ---
    if a.budget_certainty == "fixed":
        scores["project_outsourcing"] += 2
    elif a.budget_certainty == "flexible":
        scores["agency"] += 1
        scores["staff_augmentation"] += 1
    else:
        scores["discovery"] += 2

    # --- timeline pressure ---
    if a.timeline_pressure == "urgent" and a.has_defined_scope == "no":
        # urgent + undefined scope is a classic discovery-first red flag,
        # handled in _red_flags(), but also nudges the score
        scores["discovery"] += 1

    # --- BDM technical depth signals (optional, only present in BDM flow) ---
    if a.compliance_sensitivity == "regulated":
        scores["process_outsourcing"] += 2
        scores["agency"] += 1
    if a.integration_complexity == "high":
        scores["agency"] += 1
        scores["project_outsourcing"] += 1
    if a.modules_estimate and a.modules_estimate >= 8:
        scores["agency"] += 1

    return scores


def _confidence(scores: dict[str, float], winner: str) -> float:
    ordered = sorted(scores.values(), reverse=True)
    top = ordered[0] if ordered else 0.0
    runner_up = ordered[1] if len(ordered) > 1 else 0.0
    if top <= 0:
        return 0.35
    gap = (top - runner_up) / max(top, 1.0)
    # base confidence scaled by how decisively the winner led, clamped to a
    # believable 0.4 - 0.97 band so the tool never claims false certainty
    return round(min(0.97, max(0.40, 0.55 + gap * 0.45)), 2)


def _package_fit(a: WalkthroughAnswers, model: str) -> str:
    screens = a.screens_estimate or 0
    modules = a.modules_estimate or 0
    size_signal = screens + modules * 2

    if model == "discovery":
        return "starter"
    if size_signal >= 20 or a.compliance_sensitivity == "regulated" or model == "process_outsourcing":
        return "enterprise"
    if size_signal >= 8 or model == "agency":
        return "growth"
    return "starter"


def _effort_range_weeks(a: WalkthroughAnswers, model: str) -> tuple[float, float]:
    screens = a.screens_estimate or 6
    modules = a.modules_estimate or 3
    base = 2 + screens * 0.4 + modules * 0.8

    multiplier = {
        "discovery": 0.35,
        "staff_augmentation": 0.8,
        "project_outsourcing": 1.0,
        "agency": 1.15,
        "process_outsourcing": 1.3,
    }.get(model, 1.0)

    if a.integration_complexity == "high":
        base *= 1.25
    elif a.integration_complexity == "medium":
        base *= 1.1

    low = round(base * multiplier * 0.8, 1)
    high = round(base * multiplier * 1.3, 1)
    return low, high


def _red_flags(a: WalkthroughAnswers) -> list[str]:
    flags = []
    if a.timeline_pressure == "urgent" and a.has_defined_scope in (None, "no"):
        flags.append("Urgent timeline with undefined scope - set expectations on a discovery sprint before quoting delivery dates.")
    if a.budget_certainty == "unknown" and a.engagement_length == "short":
        flags.append("No budget clarity on a short engagement - qualify budget before investing in a full proposal.")
    if a.who_owns_product_decisions == "vendor" and a.internal_team_size == "none":
        flags.append("Client wants full ownership handed over with no internal team - confirm they can commit to timely feedback and sign-off.")
    if a.compliance_sensitivity == "regulated" and a.has_defined_scope != "yes":
        flags.append("Regulated domain with unclear scope - compliance requirements should be scoped explicitly, not assumed.")
    if not flags:
        flags.append("No major risk signals detected from the answers given.")
    return flags


def _responsibilities(model: str) -> dict[str, list[str]]:
    table = {
        "staff_augmentation": {
            "client_owns": ["Product roadmap", "Architecture decisions", "Delivery management", "QA sign-off"],
            "vendor_owns": ["Providing skilled engineers", "Code quality on assigned tickets", "Reporting hours/progress"],
        },
        "agency": {
            "client_owns": ["Business goals & priorities", "Budget approval", "Final acceptance"],
            "vendor_owns": ["End-to-end delivery", "Architecture & tech choices", "Project management", "QA & release"],
        },
        "project_outsourcing": {
            "client_owns": ["Signed-off requirements", "Timely feedback rounds", "Payment milestones"],
            "vendor_owns": ["Fixed-scope delivery", "Timeline & budget adherence", "Documentation handover"],
        },
        "process_outsourcing": {
            "client_owns": ["Defining the business process/SLA", "Escalation ownership"],
            "vendor_owns": ["Ongoing operation of the process", "Staffing continuity", "SLA reporting"],
        },
        "discovery": {
            "client_owns": ["Domain knowledge & stakeholders", "Availability for workshops"],
            "vendor_owns": ["Facilitating discovery", "Producing scoped backlog & estimate", "Recommending the next model"],
        },
    }
    return table[model]


def _summary(a: WalkthroughAnswers, model: str, package: str, confidence: float) -> str:
    label = MODEL_LABELS[model]
    pkg = PACKAGE_LABELS[package]
    who = a.prospect_name or "This prospect"
    return (
        f"{who} maps to {label} at {pkg} package fit, "
        f"with {int(confidence * 100)}% confidence given the answers provided. "
        f"Final model, scope and pricing still require BDM validation before it goes into a proposal."
    )


def score_answers(a: WalkthroughAnswers) -> ScoringResult:
    scores = _score_models(a)
    model = max(scores, key=scores.get)
    confidence = _confidence(scores, model)
    package = _package_fit(a, model)
    low, high = _effort_range_weeks(a, model)
    flags = _red_flags(a)
    resp = _responsibilities(model)
    summary = _summary(a, model, package, confidence)

    return ScoringResult(
        recommended_model=MODEL_LABELS[model],
        package_fit=PACKAGE_LABELS[package],
        confidence=confidence,
        effort_low_weeks=low,
        effort_high_weeks=high,
        red_flags=flags,
        responsibilities=resp,
        summary=summary,
    )
