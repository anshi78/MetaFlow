import OpenAi from "openai";
export const openai=new OpenAi({
    apiKey:process.env.OpenAI_API_KEY
})