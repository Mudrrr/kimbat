import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

// Initialize only if key exists to prevent immediate errors on load if missing
let ai: GoogleGenAI | null = null;
if (API_KEY) {
    ai = new GoogleGenAI({ apiKey: API_KEY });
}

export const getExpertResponse = async (userMessage: string, context: string): Promise<string> => {
    if (!ai) {
        return "Система ИИ не настроена (отсутствует API ключ). Пожалуйста, обратитесь к администратору или подождите ответа живого специалиста.";
    }

    try {
        const model = 'gemini-2.5-flash';
        const systemInstruction = `
            Ты — эмпатичный и профессиональный помощник в приложении "Школа женского здоровья".
            Твоя задача — поддерживать женщин, занимающихся восстановлением мышц тазового дна.
            
            Контекст пользователя: ${context}

            Правила:
            1. Отвечай мягко, поддерживающе, используя "женский" стиль общения (забота, теплота).
            2. Если вопрос касается острой боли или серьезных медицинских симптомов, ОБЯЗАТЕЛЬНО порекомендуй обратиться к врачу. Не ставь диагнозы.
            3. Твои ответы должны быть краткими (до 100 слов), но емкими.
            4. Мотивируй продолжать тренировки.
        `;

        const response = await ai.models.generateContent({
            model: model,
            contents: userMessage,
            config: {
                systemInstruction: systemInstruction,
            }
        });

        return response.text || "Извините, сейчас я не могу ответить. Попробуйте позже.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Произошла ошибка связи с сервером. Пожалуйста, попробуйте позже.";
    }
};