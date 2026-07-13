import React from "react";
import QuizWizard from "../components/QuizWizard";
import { clientWalkthroughQuestions } from "../data/quizData";

export default function ClientWalkthrough() {
  return (
    <QuizWizard flow="client" label="Client walkthrough" questions={clientWalkthroughQuestions} />
  );
}
