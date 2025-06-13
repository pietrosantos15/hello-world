export type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // índice da alternativa correta (0 a 3)
};

export type Quiz = {
  topic: string;
  questions: Question[];
};

export type UserAnswer = {
  questionId: string;
  selectedOption: number; // índice da alternativa escolhida
};