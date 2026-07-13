/**
 * Question definitions for both wizard flows. Keys match the backend's
 * WalkthroughAnswers schema exactly so the collected answers object can be
 * posted to /api/reports/score without any remapping.
 */

export interface ChoiceQuestion {
  key: string;
  kind: "choice";
  prompt: string;
  helper?: string;
  options: { value: string; label: string }[];
}

export interface NumberQuestion {
  key: string;
  kind: "number";
  prompt: string;
  helper?: string;
  min: number;
  max: number;
  step: number;
}

export interface MultiChoiceQuestion {
  key: string;
  kind: "multi";
  prompt: string;
  helper?: string;
  options: { value: string; label: string }[];
}

export type Question = ChoiceQuestion | NumberQuestion | MultiChoiceQuestion;

export const clientWalkthroughQuestions: Question[] = [
  {
    key: "has_defined_scope",
    kind: "choice",
    prompt: "How clear is the scope of what you want to build?",
    helper: "Plain answer is fine - we're not asking for a spec.",
    options: [
      { value: "yes", label: "Very clear - we know exactly what we need" },
      { value: "rough", label: "Rough idea, details still forming" },
      { value: "no", label: "Not clear yet, still exploring the idea" },
    ],
  },
  {
    key: "internal_team_size",
    kind: "choice",
    prompt: "Do you have an internal team already working on this?",
    options: [
      { value: "established", label: "Yes, an established product/engineering team" },
      { value: "small", label: "A small team, but we need more hands" },
      { value: "none", label: "No internal team at all" },
    ],
  },
  {
    key: "who_owns_product_decisions",
    kind: "choice",
    prompt: "Who should make day-to-day product decisions during the build?",
    options: [
      { value: "client", label: "Us - we want to stay in the driver's seat" },
      { value: "shared", label: "Shared - a true partnership" },
      { value: "vendor", label: "You - we'd rather hand it off" },
    ],
  },
  {
    key: "engagement_length",
    kind: "choice",
    prompt: "Is this a one-off build or an ongoing relationship?",
    options: [
      { value: "short", label: "One project, then we're done" },
      { value: "ongoing", label: "Ongoing - this is the start of something bigger" },
      { value: "unsure", label: "Not sure yet" },
    ],
  },
  {
    key: "budget_certainty",
    kind: "choice",
    prompt: "How settled is your budget?",
    options: [
      { value: "fixed", label: "Fixed - we know the number" },
      { value: "flexible", label: "Flexible within a range" },
      { value: "unknown", label: "Honestly, still figuring it out" },
    ],
  },
  {
    key: "timeline_pressure",
    kind: "choice",
    prompt: "How urgent is the timeline?",
    options: [
      { value: "urgent", label: "Urgent - we need to move fast" },
      { value: "flexible", label: "Flexible - quality over speed" },
      { value: "unknown", label: "No fixed timeline yet" },
    ],
  },
];

export const bdmQualificationQuestions: Question[] = [
  ...clientWalkthroughQuestions,
  {
    key: "platforms",
    kind: "multi",
    prompt: "Which platforms are in scope?",
    options: [
      { value: "ios", label: "iOS" },
      { value: "android", label: "Android" },
      { value: "web", label: "Web" },
    ],
  },
  {
    key: "screens_estimate",
    kind: "number",
    prompt: "Rough number of distinct screens?",
    helper: "Best guess is fine - this only shapes the effort range.",
    min: 1,
    max: 60,
    step: 1,
  },
  {
    key: "modules_estimate",
    kind: "number",
    prompt: "Rough number of functional modules?",
    helper: "e.g. auth, payments, chat, notifications each count as one.",
    min: 1,
    max: 30,
    step: 1,
  },
  {
    key: "integration_complexity",
    kind: "choice",
    prompt: "How complex are the third-party integrations?",
    options: [
      { value: "low", label: "Low - a couple of standard APIs" },
      { value: "medium", label: "Medium - several systems to connect" },
      { value: "high", label: "High - deep, custom, or legacy integrations" },
    ],
  },
  {
    key: "compliance_sensitivity",
    kind: "choice",
    prompt: "Any regulatory or compliance sensitivity?",
    options: [
      { value: "none", label: "None that we know of" },
      { value: "standard", label: "Standard data-privacy handling" },
      { value: "regulated", label: "Regulated domain (health, finance, gov, etc.)" },
    ],
  },
];
