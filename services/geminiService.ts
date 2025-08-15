import { GoogleGenAI, Type } from "@google/genai";
import { Difficulty } from '../types.ts';
import { QUESTIONS_PER_LEVEL } from '../constants.ts';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.ARRAY,
  description: `Generate exactly ${QUESTIONS_PER_LEVEL} unique questions in Arabic.`,
  items: {
    type: Type.OBJECT,
    properties: {
      question: {
        type: Type.STRING,
        description: "The question text in Arabic.",
      },
      correctAnswer: {
        type: Type.STRING,
        description: "The single correct answer in Arabic.",
      },
      incorrectAnswers: {
        type: Type.ARRAY,
        description: "An array of exactly 3 distinct incorrect answers in Arabic.",
        items: {
          type: Type.STRING,
        },
      },
    },
    required: ["question", "correctAnswer", "incorrectAnswers"],
  },
};

export const fetchFootballQuestions = async (level) => {
  try {
    const prompt = `
      أنت خبير في كرة القدم وتقوم بإنشاء اختبار. قم بإنشاء ${QUESTIONS_PER_LEVEL} أسئلة بالضبط حول كرة القدم العالمية للعبة اختبار.
      يجب أن يكون مستوى الصعوبة '${level}'.
      لكل سؤال، قدم إجابة واحدة صحيحة وثلاث إجابات خاطئة مميزة.
      لا تكرر الأسئلة. يمكن أن تشمل الموضوعات اللاعبين والأندية وكؤوس العالم ودوري أبطال أوروبا والقواعد واللحظات التاريخية.
      تأكد من أن الإجابات الخاطئة معقولة ولكنها غير صحيحة.
      يجب أن تكون جميع الأسئلة والإجابات باللغة العربية الفصحى.
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


const getFallbackQuestions = (level) => {
    console.warn(`Using fallback questions for level: ${level}`);
    const fallbacks = {
        [Difficulty.EASY]: [
            { question: "أي فريق فاز بأكبر عدد من ألقاب دوري أبطال أوروبا؟", correctAnswer: "ريال مدريد", incorrectAnswers: ["برشلونة", "بايرن ميونخ", "ليفربول"] },
            { question: "كم عدد اللاعبين في فريق كرة القدم على أرض الملعب؟", correctAnswer: "11", incorrectAnswers: ["10", "12", "9"] },
            { question: "من يُعرف بلقب 'الملك' في كرة القدم؟", correctAnswer: "بيليه", incorrectAnswers: ["مارادونا", "ميسي", "رونالدينيو"] },
            { question: "أي دولة فازت بأول بطولة لكأس العالم؟", correctAnswer: "الأوروغواي", incorrectAnswers: ["البرازيل", "الأرجنتين", "إيطاليا"] },
            { question: "ما هو اسم ملعب نادي مانشستر يونايتد؟", correctAnswer: "أولد ترافورد", incorrectAnswers: ["أنفيلد", "ستامفورد بريدج", "ملعب الإمارات"] },
            { question: "من هو الهداف التاريخي لكأس العالم؟", correctAnswer: "ميروسلاف كلوزه", incorrectAnswers: ["رونالدو نازاريو", "غيرد مولر", "ليونيل ميسي"] },
            { question: "أي نادٍ لعب له كيليان مبابي قبل ريال مدريد؟", correctAnswer: "باريس سان جيرمان", incorrectAnswers: ["موناكو", "ليفربول", "برشلونة"] }
        ]
    };

    return fallbacks[level] || fallbacks[Difficulty.EASY];
}