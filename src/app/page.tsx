// app/page.tsx
"use client";

import React, { useState } from "react";
import QuizForm from "./components/quizform";
import Questionario from "./components/questionario";
import Result from "./components/resposta";

type QuizResult = {
  correct: number;
  total: number;
  answers: number[];
};

export default function HomePage() {
  const [topic, setTopic] = useState<string | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);

  const handleGenerate = (selectedTopic: string) => {
    setTopic(selectedTopic);
    setResult(null); // Reinicia o resultado ao gerar novo quiz
  };

  const handleFinish = (res: QuizResult) => {
    setResult(res);
  };

  const handleRestart = () => {
    setTopic(null);
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4 text-black">
      {!topic && <QuizForm onGenerate={handleGenerate} />}
      {topic && !result && <Questionario topic={topic} onFinish={handleFinish} />}
      {result && (
        <Result
          correct={result.correct}
          total={result.total}
          onRestart={handleRestart}
        />
      )}
    </main>
  );
}
