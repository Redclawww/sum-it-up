import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyDFwjgy3H9-6tuoIWf4JYVPeUfOlD-oDCk');
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

export async function getSummary(Url: string){
 
try {
  const prompt = `Give the youtube summary for the video with url : ${Url} and provide the transcript of the video. 
 
  `
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  return text;                        
} catch (error) {
  console.log(error);
}
}