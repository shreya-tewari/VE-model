import React from "react";
import QuizWizard from "../components/QuizWizard";
import { bdmQualificationQuestions } from "../data/quizData";

export default function BdmQualification() {
  return (
    <QuizWizard flow="bdm" label="BDM qualification" questions={bdmQualificationQuestions} />
  );
}
