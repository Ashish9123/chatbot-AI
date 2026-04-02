import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';

const API_KEY = process.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("No API key found in .env");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

async function listModels() {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
    const data = await response.json();
    fs.writeFileSync('models.json', JSON.stringify(data, null, 2));
    console.log("Written to models.json");
  } catch (err) {
    console.error("Error fetching models", err);
  }
}

listModels();
