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






// import { Request, Response } from "express";
// import { generateVideo, pollVideoGenerationStatus } from "../utils/googleAPI";
// import dotenv from "dotenv";

// dotenv.config();

// // Controller to handle video generation requests
// export const generateVideoController = async (req: Request, res: Response) => {
//   const { productDetails, videoType, sampleCount, duration } = req.body;

//   const prompt = `Generate a video for: ${productDetails} in style: ${videoType}`;

//   try {
//     console.log(">>>>>>>>>>Received request:", req.body); // Log the incoming request

//     // Call generateVideo function from googleAPI.ts to generate video
//     const videoGenerationResponse = await generateVideo(prompt, sampleCount, duration);

//     console.log(">>>>>>>>>>Video generation response:", videoGenerationResponse); // Log the API response

//     // Polling for video generation status
//     // const operationName = videoGenerationResponse.name;
//     const operationName = videoGenerationResponse.operationName;

//     let videoStatus = await pollVideoGenerationStatus(operationName);

//     // You can keep polling for the status until it's done, and return the video URL
//       while (!videoStatus.done) {
//       await new Promise((resolve) => setTimeout(resolve, 2000)); // wait 2 sec
//       videoStatus = await pollVideoGenerationStatus(operationName);
//     }


//     // Once the video is done, extract the video URL from the response
//     const videoUrl = videoStatus.response.generatedSamples[0].video.uri;
//     res.json({ videoUrl });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error generating video");
//   }
// };

// import { Request, Response } from "express";
// import { generateVideo, pollVideoGenerationStatus } from "../utils/googleAPI";
// import dotenv from "dotenv";

// dotenv.config();

// // Controller to handle video generation requests
// export const generateVideoController = async (req: Request, res: Response) => {
//   const { productDetails, videoType, sampleCount, duration } = req.body;

//   // Construct the prompt for the video
//   const prompt = `Generate a video for: ${productDetails} in style: ${videoType}`;

//   try {
//     console.log(">>>>>>>>>>Received request:", req.body);

//     // 1️⃣ Call generateVideo which returns { operationName }
//     const videoGenerationResponse = await generateVideo(prompt, sampleCount, duration);
//     console.log(">>>>>>>>>>Video generation response:", videoGenerationResponse);

//     // 2️⃣ Extract operation ID (UUID) from the full path
//     const fullOpName = videoGenerationResponse.operationName;
//     const operationId = fullOpName.split("/").pop();

//     if (!operationId) {
//       throw new Error("❌ Could not extract operation ID from operationName.");
//     }

//     // 3️⃣ Start polling until the video generation is done
//     let videoStatus = await pollVideoGenerationStatus(operationId);
//     console.log("🔁 Initial poll response:", videoStatus);

//     while (!videoStatus.done) {
//       console.log("⏳ Video is still processing... waiting 2s");
//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       videoStatus = await pollVideoGenerationStatus(operationId);
//     }


//     if (!videoStatus.response?.videos?.length) {
//   throw new Error("❌ No video returned in response.");
// }

//     // 4️⃣ Extract the video URI from final result
//     const videoUrl = videoStatus.response.videos[0].video.uri;

//     console.log("✅ Video generated at:", videoUrl);

//     // ✅ Send the final video URL to the frontend
//     res.json({ videoUrl });
//   } catch (error) {
//     console.error("❌ Error in generateVideoController:", error);
//     res.status(500).send("Error generating video");
//   }
// };


import { Request, Response } from "express";
import { generateVideo, pollVideoGenerationStatus, generateSignedUrl } from "../utils/googleAPI";
import dotenv from "dotenv";

dotenv.config();

export const generateVideoController = async (req: Request, res: Response) => {
  // const { productDetails, videoType, sampleCount, duration } = req.body;

  // const prompt = `Generate a video for: ${productDetails} in style: ${videoType}`;
const { prompt, sampleCount, duration } = req.body;

  try {
    console.log(">>>>>>>>>>Received request:", req.body);

    const videoGenerationResponse = await generateVideo(prompt, sampleCount, duration);
    console.log(">>>>>>>>>>Video generation response:", videoGenerationResponse);

    const fullOpName = videoGenerationResponse.operationName;
    const operationId = fullOpName.split("/").pop();

    if (!operationId) {
      throw new Error("❌ Could not extract operation ID from operationName.");
    }

    let videoStatus = await pollVideoGenerationStatus(operationId);
    console.log("🔁 Initial poll response:", videoStatus);

    while (!videoStatus.done) {
      console.log("⏳ Video is still processing... waiting 2s");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      videoStatus = await pollVideoGenerationStatus(operationId);
    }

    // ✅ SAFELY extract video URL (Veo 2 uses response.videos)
   const videos = videoStatus.response?.videos;

if (!Array.isArray(videos) || videos.length === 0) {
  throw new Error("❌ No video found in the response.");
}

console.log("🎥 Full videos array from response:", JSON.stringify(videos, null, 2));
const firstVideo = videos[0];
const uri = firstVideo?.gcsUri;

if (!uri) {
  throw new Error("❌ gcsUri not found in response.");
}

console.log("✅ Video generated at:", uri);
// res.json({ videoUrl: uri });
const signedUrl = await generateSignedUrl(uri);
res.json({ videoUrl: signedUrl });



  } catch (error) {
    console.error("❌ Error in generateVideoController:", error);
    res.status(500).send("Error generating video");
  }
};
