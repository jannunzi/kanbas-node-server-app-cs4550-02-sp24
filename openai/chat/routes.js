import { join } from "path";
import { readdir } from "fs/promises";
import fs from "fs";
import path from "path";

import OpenAI from "openai";
const openai = new OpenAI();

const conversation = [];

export default function ChatCompletionRoutes(app) {
  const getChat = (req, res) => res.json(conversation);
  app.get("/api/openai/conversation", getChat);

  const postChat = async (req, res) => {
    const { role, content } = req.body;
    const userMessage = { role, content };
    conversation.push(userMessage);
    const completion = await openai.chat.completions.create({
      messages: conversation,
      model: "gpt-4",
    });
    const choice = completion.choices[0];
    conversation.push(choice.message);
    res.json(choice.message);
  };
  const requestImage = async (req, res) => {
    const promptAndShape = req.body;
    // let size = shapeMap[promptAndShape.shape];
    const image = await openai.images.generate({
      prompt: promptAndShape.content,
      model: "dall-e-3",
      n: 1,
      size: "1024x1024",
    });
    const response = {
      role: "assistant",
      content: promptAndShape.content,
      revisedPrompt: image.data[0].revised_prompt,
      imageUrl: image.data[0].url,
    };
    conversation.push(response);
    res.json(response);
  };

  const describeImage = async (req, res) => {
    const { role, content } = req.body;
    const userMessage = { role, content };
    conversation.push(userMessage);
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
                url: content,
              },
            },
          ],
        },
      ],
    });
    console.log(response.choices[0].message);
    conversation.push(response.choices[0].message);
    res.json(response.choices[0].message);
  };

  app.post("/api/openai/conversation", postChat);
  app.post("/api/openai/conversation/images", requestImage);
  app.post("/api/openai/conversation/vision", describeImage);
  const listAudioFiles = async (req, res) => {
    const directoryPath = join(process.cwd(), "openai", "tts");
    try {
      const files = await readdir(directoryPath);
      console.log(files);
      const mp3Files = files.filter((file) => file.endsWith(".mp3"));
      res.json(mp3Files);
    } catch (error) {
      console.error("Error reading directory:", error);
      res.status(500).send("Failed to list audio files.");
    }
  };
  app.get("/api/openai/audio", listAudioFiles);
  const generateAudio = async (req, res) => {
    const { role, content } = req.body;
    conversation.push({ role, content });

    const timeStamp = new Date().getTime().toString();
    const speechFile = path.resolve(`./openai/tts/speech-${timeStamp}.mp3`);
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: content,
    });
    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer);
    conversation.push({ role: "assistant", content: speechFile });
    res.json({ role: "assistant", content: speechFile });
  };

  app.post("/api/openai/conversation/tts", generateAudio);
}
