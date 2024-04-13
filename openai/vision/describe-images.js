import OpenAI from "openai";
const openai = new OpenAI();
async function main() {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Describe this image." },
          {
            type: "image_url",
            image_url: {
              url: "https://imgix.bustle.com/uploads/image/2020/4/20/4f0e4ffe-434d-421c-8221-f00ac8213df2-ee1a587a-34a4-4d4d-b4d4-61a7d4faadab-shutterstock-1470652997.jpg",
            },
          },
        ],
      },
    ],
  });
  console.log(response.choices[0]);
}
main();
