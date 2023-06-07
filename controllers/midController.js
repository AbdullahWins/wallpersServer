// import midjourney from "midjourney-client";
// const midjourney = require("midjourney-client");
// import Replicate from "replicate";
const Replicate = require("replicate");

const createImageFromPrompt = async (req, res) => {
  try {
    console.log("Baal");
    const midjourney = await import("midjourney-client");
    const response = await midjourney(
      "mdjrny-v4 style a painting of a ginger cat."
    );
    console.log(response);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
};

const replicateImage = async (req, res) => {
  const prompt = req?.body?.prompt;
  console.log(prompt);
  try {
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const output = await replicate.run(
      "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf",
      {
        input: {
          prompt: `${prompt}`,
        },
      }
    );
    res.send(output);
    console.log(output);
  } catch (error) {
    res.error(error);
    console.log(error);
  }
};

module.exports = {
  createImageFromPrompt,
  replicateImage,
};
