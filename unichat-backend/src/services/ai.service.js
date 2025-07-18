const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.getOpenAISummary = async (text) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "Summarize the following chat conversation for a university context." },
      { role: "user", content: text }
    ],
    max_tokens: 150,
  });
  return response.choices[0].message.content;
};