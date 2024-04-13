import OpenAI from "openai";
const openai = new OpenAI();
async function main() {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: "a city on mars",
    n: 1,
    size: "1024x1024",
  });
  let revised_prompt = response.data[0].revised_prompt;
  let image_url = response.data[0].url;
  console.log(revised_prompt);
  console.log(image_url);
}
main();
