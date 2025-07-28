import React from "react";
import { FormField } from "../popup/TaskManagementProfile/components/settings/AccountSettings/FormField";

export default function ScreeningQuestions({
  questions,
  answers,
  setAnswers,
}: {
  questions: { id: string; question: string }[];
  answers: { [key: string]: string };
  setAnswers: (val: { [key: string]: string }) => void;
}) {
  const handleChange = (id: string, value: string) => {
    setAnswers({ ...answers, [id]: value });
  };

  return (
    <div className="mt-6 space-y-4">
      <h3 className="font-semibold text-lg">Screening Questions</h3>
      {questions.map((q) => (
        <FormField
          key={q.id}
          label={q.question}
          value={answers[q.id] || ""}
          onChange={(e: any) => handleChange(q.id, e.target.value)}
          placeholder="Enter your answer"
          descr=""
        />
      ))}
    </div>
  );
}
