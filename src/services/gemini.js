import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API client
// The key should be stored in a .env file as VITE_GEMINI_API_KEY
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;
let model = null;

if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
  model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' }); // or gemini-pro
}

export const generateChatResponse = async (history, newPrompt) => {
  if (!model) {
    throw new Error('Gemini API key is missing. Please add VITE_GEMINI_API_KEY to your .env file.');
  }

  try {
    // Convert our internal history format to what Gemini expects
    const formattedHistory = history.map(msg => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    const result = await chat.sendMessage(newPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
};
