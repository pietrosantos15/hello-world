import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Use sua variável de ambiente para a chave da API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // ou "gemini-2.0-flash-001" se preferir
});

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    // Prompt para gerar 10 questões de múltipla escolha sobre o tema
    const prompt = `
      Gere exatamente 6 perguntas de múltipla escolha sobre o tema "${topic}" para um quiz.
      Cada pergunta deve ter 4 alternativas (A, B, C, D) e apenas uma correta.
      Responda SOMENTE com um array JSON, sem nenhum texto antes ou depois, no seguinte formato:
        [
        {
            "id": "1",
            "question": "Pergunta aqui",
            "options": ["A", "B", "C", "D"],
            "correctAnswer": 0
        }
        //
        ]
`;
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    let questions;
    try {
      // Expressão regular para pegar o primeiro array na resposta
      const match = responseText.match(/\[[\s\S]*\]/);
      if (!match) throw new Error("JSON não encontrado na resposta da IA.");
      questions = JSON.parse(match[0]);
    } catch (e) {
      return NextResponse.json(
        { error: "Erro ao interpretar resposta da IA. Tente novamente." },
        { status: 500 }
      );
    }
    return NextResponse.json({ questions });
  } catch (e) {
    return NextResponse.json(
      { error: "Erro interno ao gerar quiz." },
      { status: 500 }
    );
}   }