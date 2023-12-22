import openai
#import { ReplicateStream, StreamingTextResponse } from "ai";
export const runtime = "edge";

client = openai.OpenAI(
    base_url = "https://api.endpoints.anyscale.com/v1",
    api_key = 'esecret_2fiq3yggj78a759vxrl88zp62n'
)



export async function POST(req) {
  const params = await req.json();

  const response = await runMixtral(params);

  // Convert the response into a friendly text-stream
  const stream = await ReplicateStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}

async function runMixtral({ model, prompt, maxTokens, temperature, topP }) {
  response = client.chat.completions.create(
      engine="mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages=[{"role": "system", "content": "You are a helpful assistant."}, 
              {"role": "user", "content": prompt],
      max_tokens=maxTokens,  # Adjust max tokens as needed
      temperature=temperature, # Adjust temperature as needed
      stream = true
  )
  return response
}
