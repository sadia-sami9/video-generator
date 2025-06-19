// import { Request, Response } from "express";
// import { generateVideo, pollVideoGenerationStatus } from "../utils/googleAPI";
// import dotenv from "dotenv";

// dotenv.config();

// const API_KEY = process.env.GOOGLE_API_KEY!; // Store the Google API key in your .env
// if (!API_KEY) {
//   console.log(">>>>>>>>>GOOGLE_API_KEY is not set in .env");
// }
// // console.log(">>>>>", process.env.GOOGLE_API_KEY)
// // Controller to handle video generation requests
// export const generateVideoController = async (req: Request, res: Response) => {
//   const { productDetails, videoType, sampleCount, duration } = req.body;

//   const prompt = `Generate a video for: ${productDetails} in style: ${videoType}`;

//   try {
//      console.log(">>>>>>>>>>Received request:", req.body); // Log the incoming request
//     console.log(">>>>>>>Using API key:", API_KEY); // Log the API key to ensure it's available

//     const videoGenerationResponse = await generateVideo(prompt, sampleCount, duration, API_KEY);
// console.log(">>>>>>>>>>Video generation response:", videoGenerationResponse); // Log the API response

//     // Polling for video generation status
//     const operationName = videoGenerationResponse.name;
//     let videoStatus = await pollVideoGenerationStatus(operationName, API_KEY);

//     // You can keep polling for the status until it's done, and return the video URL
//     while (!videoStatus.done) {
//       videoStatus = await pollVideoGenerationStatus(operationName, API_KEY);
//     }

//     // Once the video is done, extract the video URL from the response
//     const videoUrl = videoStatus.response.generatedSamples[0].video.uri;
//     res.json({ videoUrl });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error generating video");
//   }
// };

import { Request, Response } from "express";
import { generateVideo, pollVideoGenerationStatus } from "../utils/googleAPI";
import dotenv from "dotenv";

dotenv.config();

// Controller to handle video generation requests
export const generateVideoController = async (req: Request, res: Response) => {
  const { productDetails, videoType, sampleCount, duration } = req.body;

  const prompt = `Generate a video for: ${productDetails} in style: ${videoType}`;

  try {
    console.log(">>>>>>>>>>Received request:", req.body); // Log the incoming request

    // Call generateVideo function from googleAPI.ts to generate video
    const videoGenerationResponse = await generateVideo(prompt, sampleCount, duration);

    console.log(">>>>>>>>>>Video generation response:", videoGenerationResponse); // Log the API response

    // Polling for video generation status
    const operationName = videoGenerationResponse.name;
    let videoStatus = await pollVideoGenerationStatus(operationName);

    // You can keep polling for the status until it's done, and return the video URL
    while (!videoStatus.done) {
      videoStatus = await pollVideoGenerationStatus(operationName);
    }

    // Once the video is done, extract the video URL from the response
    const videoUrl = videoStatus.response.generatedSamples[0].video.uri;
    res.json({ videoUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating video");
  }
};
