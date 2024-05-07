import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = process.env.API_KEY;
const genAI = new GoogleGenerativeAI('AIzaSyDFwjgy3H9-6tuoIWf4JYVPeUfOlD-oDCk');
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

export async function getSummary(Url: string){
 
try {
  const prompt = `Give the youtube summary for the video with url : ${Url} and provide the transcript of the video. and the creator of the video and if this not a valid link then do not provide the summary. and if you can't reach the video then provide the error message.`
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  return text;
} catch (error) {
  console.log(error);
}
}