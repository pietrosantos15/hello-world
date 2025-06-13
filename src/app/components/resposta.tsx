// app/components/Result.tsx
import React from "react";

type ResultProps = {
  correct: number;
  total: number;
  onRestart: () => void;
};

const Result: React.FC<ResultProps> = ({ correct, total, onRestart }) => (
  <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow text-center">
    <h2 className="text-2xl font-bold mb-4 text-black">Resultado</h2>
    <p className="text-lg mb-2 text-black">
      Você acertou <span className="font-semibold text-green-600">{correct}</span> de{" "}
      <span className="font-semibold">{total}</span> perguntas!
    </p>
    <p className="text-2xl font-bold mb-6 text-black">
      Nota: <span className="text-blue-600">{Math.round((correct / total) * 6)}</span> / 6
    </p>
    <button
      onClick={onRestart}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Tentar novamente
    </button>
  </div>
);

export default Result;
