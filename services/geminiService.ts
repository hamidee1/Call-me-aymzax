
import { GoogleGenAI, Type } from "@google/genai";
import { Difficulty, QuestionData } from '../types';
import { QUESTIONS_PER_LEVEL } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.ARRAY,
  description: `Generate exactly ${QUESTIONS_PER_LEVEL} unique questions.`,
  items: {
    type: Type.OBJECT,
    properties: {
      question: {
        type: Type.STRING,
        description: "The question text.",
      },
      correctAnswer: {
        type: Type.STRING,
        description: "The single correct answer.",
      },
      incorrectAnswers: {
        type: Type.ARRAY,
        description: "An array of exactly 3 distinct incorrect answers.",
        items: {
          type: Type.STRING,
        },
      },
    },
    required: ["question", "correctAnswer", "incorrectAnswers"],
  },
};

export const fetchFootballQuestions = async (level: Difficulty): Promise<QuestionData[]> => {
  try {
    const prompt = `
      You are a football expert creating a quiz. Generate exactly ${QUESTIONS_PER_LEVEL} questions about world football for a quiz game.
      The difficulty level should be '${level}'.
      For each question, provide one correct answer and three distinct incorrect answers.
      Do not repeat questions. The topics can include players, clubs, World Cups, Champions League, rules, and historical moments.
      Ensure the incorrect answers are plausible but wrong.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    const questions = JSON.parse(jsonText);
    
    // Validate the response structure
    if (!Array.isArray(questions) || questions.length !== QUESTIONS_PER_LEVEL) {
      throw new Error("API returned an invalid data format.");
    }

    return questions.map(q => ({
        ...q,
        incorrectAnswers: q.incorrectAnswers.slice(0, 3) // ensure only 3 incorrect answers
    }));

  } catch (error) {
    console.error("Error fetching questions from Gemini API:", error);
    // In case of an API error, return some fallback questions
    return getFallbackQuestions(level);
  }
};


const getFallbackQuestions = (level: Difficulty): QuestionData[] => {
    console.warn(`Using fallback questions for level: ${level}`);
    const fallbacks = {
        [Difficulty.EASY]: [
            { question: "أي فريق فاز بأكبر عدد من ألقاب دوري أبطال أوروبا؟", correctAnswer: "ريال مدريد", incorrectAnswers: ["برشلونة", "بايرن ميونخ", "ليفربول"] },
            { question: "كم عدد اللاعبين في فريق كرة القدم على أرض الملعب؟", correctAnswer: "11", incorrectAnswers: ["10", "12", "9"] },
            { question: "من يُعرف بلقب 'الملك' في كرة القدم؟", correctAnswer: "بيليه", incorrectAnswers: ["مارادونا", "ميسي", "رونالدو"] },
            { question: "أي دولة فازت بأول بطولة لكأس العالم؟", correctAnswer: "الأوروغواي", incorrectAnswers: ["البرازيل", "الأرجنتين", "إيطاليا"] },
            { question: "ما هو اسم ملعب نادي مانشستر يونايتد؟", correctAnswer: "أولد ترافورد", incorrectAnswers: ["أنفيلد", "ستامفورد بريدج", "ملعب الإمارات"] },
            { question: "من هو الهداف التاريخي لكأس العالم؟", correctAnswer: "ميروسلاف كلوزه", incorrectAnswers: ["رونالدو نازاريو", "غيرد مولر", "ليونيل ميسي"] },
            { question: "أي نادٍ يلعب له كيليان مبابي حاليًا (في موسم 2023-24)؟", correctAnswer: "باريس سان جيرمان", incorrectAnswers: ["ريال مدريد", "موناكو", "ليفربول"] }
        ]
    };

    return fallbacks[level] || fallbacks[Difficulty.EASY];
}
