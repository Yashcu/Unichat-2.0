// src/services/ai.service.js
const OpenAI = require("openai");

// Check if we are in a production environment (like Render)
const isProduction = process.env.NODE_ENV === 'production';

// --- Configuration ---
const config = {
    apiKey: process.env.AI_API_KEY, // We'll use a generic name
    baseURL: isProduction
        ? "https://api.groq.com/openai/v1" // Production URL (Groq)
        : "http://localhost:1234/v1",       // Local URL (LM Studio)
};

const openai = new OpenAI(config);

exports.summarizeChat = async (messages) => {
  if (!messages || messages.length === 0) {
    return "There are no messages to summarize.";
  }

  const chatText = messages.map(msg => `${msg.sender.name}: ${msg.content}`).join('\n');

  try {
    const response = await openai.chat.completions.create({
      // For Groq, it's good to specify the model you want to use. Llama3 is a great choice.
      model: isProduction ? "llama3-8b-8192" : "local-model",
      messages: [
        {
          role: "system",
          content: "You are an expert academic assistant. Summarize the following university chat conversation concisely, highlighting key questions, deadlines, and action items."
        },
        {
          role: "user",
          content: chatText
        }
      ],
      max_tokens: 150,
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("AI Service Error:", error);
    throw new Error("Failed to generate summary from AI service.");
  }
};
