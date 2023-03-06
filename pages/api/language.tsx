import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sentence, language } = req.body;

  console.log(sentence, language);

  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `I am a foreigner and I want you to be my translator. Translate "${sentence}" into ${language}. if some of the words are not a direct translation, do not tell me that they do not have a direct translation. only give me the translated text in your answer. If the translated language does not use romanized language, then also provide the phonetic pronunciation.`,
      // prompt: `Translate "${sentence}" into ${language}. If the translated language does not use the English alphabet, then also provide the phonetic`,
      temperature: 0.3,
      max_tokens: 100,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

interface Props {
  sentence: string;
  language: string;
}

function generatePrompt({ sentence, language }: Props) {
  return `I am a foreigner and I want you to be my translator. if some of the words are not a direct translation, do not tell me that they do not have a direct translation. only give me the translated text in your answer. Translate the text using the translated language's alphabet characters. Do not romanize the translation. If the translated language does not use romanized language, then also provide the phonetic pronunciation. 
  
  sentence: I need a blanket
  language: Tagalog
  translation: "Kailangan ko ng kumot (Kah-i-la-ngan koh nang ku-mot)"
  
  Now Translate "${sentence}" into ${language}.
  `;
}
