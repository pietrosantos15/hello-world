// app/components/Result.tsx
import React from "react";
import { Question } from "../../types/quiz";

type ResultProps = {
  correct: number;
  total: number;
  answers: number[];
  questions: Question[];
  onRestart: () => void;
};

const Result: React.FC<ResultProps> = ({ correct, total, answers, questions, onRestart }) => (
  <div className="max-w-2xl mx-auto mt-8 bg-white p-6 rounded shadow">
    <h2 className="text-2xl font-bold mb-4 text-black">Resultado</h2>
    <p className="text-lg mb-6 text-black">
      Você acertou <span className="font-semibold text-green-600">{correct}</span> de{" "}
      <span className="font-semibold">{total}</span> perguntas!
    </p>
    <p className="text-2xl font-bold mb-8 text-black">
      Nota: <span className="text-blue-600">{Math.round((correct / total) * 6)}</span> / 6
    </p>
    <div className="space-y-6">
      {questions.map((question, idx) => {
        const userAnswerIdx = answers[idx];
        const isCorrect = userAnswerIdx === question.correctAnswer;
        return (
          <div key={question.id || idx} className="p-4 rounded border">
            <p className="font-semibold mb-2 text-black">
              {idx + 1}. {question.question}
            </p>
            <ul>
              {question.options.map((option, optIdx) => {
                let optionClass = "p-2 rounded text-black";
                if (optIdx === question.correctAnswer) {
                  optionClass += " bg-green-100 font-bold";
                }
                if (optIdx === userAnswerIdx && !isCorrect) {
                  optionClass += " bg-red-100";
                }
                if (optIdx === userAnswerIdx && isCorrect) {
                  optionClass += " border border-green-600";
                }
                return (
                  <li key={optIdx} className={optionClass}>
                    {String.fromCharCode(65 + optIdx)}) {option}
                    {optIdx === userAnswerIdx && (
                      <span className="ml-2 italic">
                        {isCorrect ? " (Sua resposta - Correta)" : " (Sua resposta - Errada)"}
                      </span>
                    )}
                    {optIdx === question.correctAnswer && !isCorrect && (
                      <span className="ml-2 italic text-green-600"> ← Correta</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
    <button
      onClick={onRestart}
      className="mt-8 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Tentar novamente
    </button>
  </div>
);

export default Result;
