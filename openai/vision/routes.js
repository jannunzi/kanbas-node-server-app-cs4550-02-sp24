import OpenAI from "openai";
const openai = new OpenAI();

export default function VisionRoutes(app) {
  const describe = async (req, res) => {
    const { imageUrl } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Describe this image" },
            { type: "image_url", image_url: { url: imageUrl } },
          ],
        },
      ],
    });

    const description = response.choices[0].message.content;
    res.send(description);
  };

  app.post("/api/openai/vision", describe);
}
