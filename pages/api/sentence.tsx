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
  const { sentence, style } = req.body;

  console.log(sentence, style);

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
      prompt: generatePrompt({ sentence, style }),
      temperature: 1,
      max_tokens: 4000,
      frequency_penalty: 0,
      // presence_penalty: 1,
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
  style: string;
}

function generatePrompt({ sentence, style }: Props) {
  if (style === "biblical") {
    return `I want you to act as an biblical translator. Replace my simplified A0-level words and sentences with more beautiful and elegant, biblical words but in very short sentences. Keep the meaning same. I want you to only reply the correction, the improvements and nothing else, do not write explanations. My sentence is "${sentence}"
    `;
  } else if (style == "articulate") {
    return `I am not fluent in English. I'm having trouble forming sentences. I want you to be my fluent english translator than can transform my choppy words into an articulated, colloquial sentence that does not use complex words. Do not include any other explanations in your answer. Only give me the transformed sentence in your answer. My request is for you to form a sentence with the words "cars, so loud, they should ban, it hurts my hears".`;
  } else {
    return `rewrite the text "${sentence}" in ${style} writing style`;
  }
}
