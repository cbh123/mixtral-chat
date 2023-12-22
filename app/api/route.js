import openai
#import { ReplicateStream, StreamingTextResponse } from "ai";
export const runtime = "edge";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

if (!process.env.REPLICATE_API_TOKEN) {
  throw new Error(
    "The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it."
  );
}

export async function POST(req) {
  const params = await req.json();

  const response = await runMixtral(params);

  // Convert the response into a friendly text-stream
  const stream = await ReplicateStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}

async function runMixtral({ model, prompt, maxTokens, temperature, topP }) {
  response = openai.Completion.create(
      engine="mistralai/Mixtral-8x7B-Instruct-v0.1",
      prompt=`${prompt}`,
      max_tokens=maxTokens,  # Adjust max tokens as needed
      temperature=temperature, # Adjust temperature as needed
      stream = true
  )
  return response
}
