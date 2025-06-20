import { Request, Response } from "express";
import { generateVideo, pollVideoGenerationStatus, generateSignedUrl } from "../utils/googleAPI";
import dotenv from "dotenv";

dotenv.config();

export const generateVideoController = async (req: Request, res: Response) => {
  // const { productDetails, videoType, sampleCount, duration } = req.body;

  // const prompt = `Generate a video for: ${productDetails} in style: ${videoType}`;
const { prompt, sampleCount, duration } = req.body;

  try {
    // console.log(">>>>>>>>>>Received request:", req.body);

    const videoGenerationResponse = await generateVideo(prompt, sampleCount, duration);
    // console.log(">>>>>>>>>>Video generation response:", videoGenerationResponse);

    const fullOpName = videoGenerationResponse.operationName;
    const operationId = fullOpName.split("/").pop();

    if (!operationId) {
      throw new Error("Could not extract operation ID from operationName.");
    }

    let videoStatus = await pollVideoGenerationStatus(operationId);
    // console.log("Initial poll response:", videoStatus);

    while (!videoStatus.done) {
      console.log("Video is still processing... waiting 2s");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      videoStatus = await pollVideoGenerationStatus(operationId);
    }

    // SAFELY extract video URL (Veo 2 uses response.videos)
   const videos = videoStatus.response?.videos;

if (!Array.isArray(videos) || videos.length === 0) {
  throw new Error("No video found in the response.");
}

// console.log("Full videos array from response:", JSON.stringify(videos, null, 2));
const firstVideo = videos[0];
const uri = firstVideo?.gcsUri;

if (!uri) {
  throw new Error("gcsUri not found in response.");
}

console.log("Video generated at:", uri);
// res.json({ videoUrl: uri });
const signedUrl = await generateSignedUrl(uri);
res.json({ videoUrl: signedUrl });

  } catch (error) {
    console.error("Error in generateVideoController:", error);
    res.status(500).send("Error generating video");
  }
};
