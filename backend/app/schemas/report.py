import datetime
from typing import Any
from pydantic import BaseModel, ConfigDict, Field


class WalkthroughAnswers(BaseModel):
    """
    Answers collected by the quiz wizard (either flow). Kept loose/optional
    because the client and BDM flows ask different subsets of questions -
    the scoring service only reads the keys it needs.
    """
    flow: str = Field(description='"client" or "bdm"')
    prospect_name: str = ""

    # shared qualification dimensions
    has_defined_scope: str | None = None          # "yes" | "rough" | "no"
    timeline_pressure: str | None = None          # "urgent" | "flexible" | "unknown"
    internal_team_size: str | None = None         # "none" | "small" | "established"
    budget_certainty: str | None = None           # "fixed" | "flexible" | "unknown"
    engagement_length: str | None = None          # "short" | "ongoing" | "unsure"
    who_owns_product_decisions: str | None = None # "client" | "shared" | "vendor"

    # BDM-only technical depth
    platforms: list[str] = []                     # ["ios","android","web"]
    screens_estimate: int | None = None
    modules_estimate: int | None = None
    integration_complexity: str | None = None      # "low" | "medium" | "high"
    compliance_sensitivity: str | None = None      # "none" | "standard" | "regulated"

    extra: dict[str, Any] = {}


class ReportCreate(BaseModel):
    answers: WalkthroughAnswers


class ReportOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    flow: str
    prospect_name: str
    recommended_model: str
    package_fit: str
    confidence: float
    effort_low_weeks: float
    effort_high_weeks: float
    red_flags: list[str]
    responsibilities: dict[str, Any]
    summary: str
    created_at: datetime.datetime


class ScoringResult(BaseModel):
    recommended_model: str
    package_fit: str
    confidence: float
    effort_low_weeks: float
    effort_high_weeks: float
    red_flags: list[str]
    responsibilities: dict[str, Any]
    summary: str
