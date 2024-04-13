import OpenAI from "openai";
const openai = new OpenAI();

const shapeMap = {
  square: "1024x1024",
  portrait: "1024x1792",
  landscape: "1792x1024",
};
const conversation = [];

export default function ImageGenerationRoutes(app) {
  const requestImage = async (req, res) => {
    const promptAndShape = req.body;
    let size = shapeMap[promptAndShape.shape];
    const image = await openai.images.generate({
      prompt: promptAndShape.prompt,
      model: "dall-e-3",
      n: 1,
      size: size,
    });
    const response = {
      ...promptAndShape,
      revisedPrompt: image.data[0].revised_prompt,
      imageUrl: image.data[0].url,
    };
    conversation.push(response);
    res.json(response);
  };

  app.post("/api/openai/images/conversation", requestImage);
  app.get("/api/openai/images/conversation", (req, res) =>
    res.json(conversation)
  );
}
