import fs from "fs";
import path from "path";
import OpenAI from "openai";
const openai = new OpenAI();
const speechFile = path.resolve("./chinese.mp3");
async function main() {
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: "笑一笑,十年少。",
    //      笑一笑,十年嫂
  });
  console.log(speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);
}
main();
