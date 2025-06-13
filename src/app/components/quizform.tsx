// app/components/QuizForm.tsx
"use client";

import React, { useState } from "react";

type QuizFormProps = {
  onGenerate: (topic: string) => void;
};

const QuizForm: React.FC<QuizFormProps> = ({ onGenerate }) => {
  const [topic, setTopic] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(topic.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto mt-10">
      <label className="text-lg text-black font-semibold">
        Tema do questionário:
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="block mt-2 p-2 border border-gray-300 rounded w-full text-black"
          placeholder="Ex: Inglês"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-600 text-black py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Gerar Questionário
      </button>
    </form>
  );
};

export default QuizForm;
