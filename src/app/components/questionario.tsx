// app/components/Questionario.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Question } from "../../../.next/types/quiz"; // Ajuste o caminho conforme necessário

type QuestionarioProps = {
  topic: string;
  onFinish: (result: { correct: number; total: number; answers: number[] }) => void;
};

const Questionario: React.FC<QuestionarioProps> = ({ topic, onFinish }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/generate-quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic }),
        });
        const data = await res.json();
        if (res.ok) {
          setQuestions(data.questions);
          setUserAnswers(Array(data.questions.length).fill(-1));
        } else {
          setError(data.error || "Erro ao buscar perguntas.");
        }
      } catch (err) {
        setError("Erro ao conectar à API.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [topic]);

  const handleSelect = (qIdx: number, optIdx: number) => {
    setUserAnswers((prev) => {
      const copy = [...prev];
      copy[qIdx] = optIdx;
      return copy;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correct = questions.reduce(
      (acc, q, idx) => acc + (q.correctAnswer === userAnswers[idx] ? 1 : 0),
      0
    );
    onFinish({ correct, total: questions.length, answers: userAnswers });
  };

  if (loading) return <div className="text-center mt-10">Carregando perguntas...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-8 space-y-8">
      {questions.map((q, qIdx) => (
        <div key={q.id || qIdx} className="bg-white p-4 rounded shadow">
          <p className=" mb-2 text-black">{qIdx + 1}. {q.question}</p>
          <div className="grid grid-cols-1 gap-2">
            {q.options.map((opt: string, optIdx: number) => (
              <label
                key={optIdx}
                className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                  userAnswers[qIdx] === optIdx ? "bg-blue-400" : ""
                }`}
              >
                <input
                  type="radio"
                  name={`q${qIdx}`}
                  checked={userAnswers[qIdx] === optIdx}
                  onChange={() => handleSelect(qIdx, optIdx)}
                  className="accent-blue-600"
                  required
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Enviar respostas
      </button>
    </form>
  );
};

export default Questionario;
