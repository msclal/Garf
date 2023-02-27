import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

type Data = {
  input: string;
};

const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { priceMin, priceMax, gender, age, interests } = req.body;

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
      prompt: `suggest 3 gift ideas between $${priceMin} and $${priceMax} for a ${age} years old ${gender} that is into ${interests}.`,
      temperature: 0.8,
      max_tokens: 4050,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
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

// export default async function (req, res) {
//   if (!configuration.apiKey) {
//     res.status(500).json({
//       error: {
//         message:
//           "OpenAI API key not configured, please follow instructions in README.md",
//       },
//     });
//     return;
//   }

//   const { priceMin, priceMax, gender, age, interests } = req.body;

//   try {
//     const completion = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: `suggest 3 gift ideas between $${priceMin} and $${priceMax} for a ${age} years old ${gender} that is into ${interests}.`,
//       temperature: 0.6,
//       max_tokens: 4050,
//     });
//     res.status(200).json({ result: completion.data.choices[0].text });
//   } catch (error) {
//     // Consider adjusting the error handling logic for your use case
//     if (error.response) {
//       console.error(error.response.status, error.response.data);
//       res.status(error.response.status).json(error.response.data);
//     } else {
//       console.error(`Error with OpenAI API request: ${error.message}`);
//       res.status(500).json({
//         error: {
//           message: "An error occurred during your request.",
//         },
//       });
//     }
//   }
// }
