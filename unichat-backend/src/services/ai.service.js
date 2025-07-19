// src/services/ai.service.js
const OpenAI = require("openai");

// Initialize OpenAI but point it to your LOCAL server
const openai = new OpenAI({
  baseURL: "http://127.0.0.1:1234/v1", // THE ONLY CHANGE NEEDED!
  apiKey: "not-needed", // You can write anything here, it's not used.
});

// The rest of your code remains exactly the same!
exports.summarizeChat = async (messages) => {
  if (!messages || messages.length === 0) {
    return "There are no messages to summarize.";
  }

  const chatText = messages.map(msg => `${msg.sender.name}: ${msg.content}`).join('\n');

  try {
    const response = await openai.chat.completions.create({
      model: "local-model",
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
    console.error("Local AI Server Error:", error);
    throw new Error("Failed to generate summary from local AI service.");
  }
};