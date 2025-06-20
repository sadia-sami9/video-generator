import axios from "axios";
import { google } from "googleapis";
import path from "path";
import { Storage } from "@google-cloud/storage";


// Path to service account key
const KEY_FILE_PATH = path.join(__dirname, '..', 'video-generator-463222-2a3459699829.json');
// console.log("Using key file path:", KEY_FILE_PATH);



const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE_PATH,
  scopes: ["https://www.googleapis.com/auth/cloud-platform"],
});

const storage = new Storage({ keyFilename: KEY_FILE_PATH });


// Function to initiate video generation
export const generateVideo = async (prompt: string, sampleCount: number, duration: number) => {
  const url = "https://us-central1-aiplatform.googleapis.com/v1/projects/video-generator-463222/locations/us-central1/publishers/google/models/veo-2.0-generate-001:predictLongRunning";

  const payload = {
    instances: [
      {
        prompt: prompt,
      },
    ],
    parameters: {
      aspectRatio: "16:9",
      sampleCount: sampleCount,
      durationSeconds: duration,
      storageUri: "gs://video-generation-bucket-ss/output_video.mp4",
    },
  };

  try {
    const client = await auth.getClient();
    const tokenInfo = await client.getAccessToken();

    if (!tokenInfo?.token) throw new Error("Failed to obtain access token.");
    const accessToken = tokenInfo.token;

    // console.log("Access Token obtained.");
    // console.log("Sending request to Veo API with payload:", JSON.stringify(payload, null, 2));

    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    // console.log("Veo API responded:", response.data);

    // Extract and transform the correct operationName for polling
    const operationId = response.data.name.split("/").pop();
    const operationName = `projects/video-generator-463222/locations/us-central1/operations/${operationId}`;

    return { operationName };
  } catch (error: any) {
    console.error("Error in generating video");
    if (axios.isAxiosError(error)) {
      console.error("Axios error response:", error.response?.data || error.message);
    } else {
      console.error("Unknown error:", error);
    }
    throw new Error("Error in generating video: " + error.message);
  }
};

export const pollVideoGenerationStatus = async (operationId: string) => {
  const url = `https://us-central1-aiplatform.googleapis.com/v1/projects/video-generator-463222/locations/us-central1/publishers/google/models/veo-2.0-generate-001:fetchPredictOperation`;

  try {
    const client = await auth.getClient();
    const tokenInfo = await client.getAccessToken();

    if (!tokenInfo?.token) throw new Error("Failed to obtain access token for polling.");
    const accessToken = tokenInfo.token;

    const response = await axios.post(
      url,
      {
        operationName: `projects/video-generator-463222/locations/us-central1/publishers/google/models/veo-2.0-generate-001/operations/${operationId}`,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    // console.log("Polling response:", response.data);
    return response.data;
    
  } catch (error: any) {
    console.error("Error polling video generation status");

    if (axios.isAxiosError(error)) {
      console.error("Axios error response:", error.response?.data || error.message);
    } else {
      console.error("Unknown error:", error);
    }

    throw new Error("Error polling video generation: " + error.message);
  }

  
};


// Convert gs://... to signed HTTPS URL
export const generateSignedUrl = async (gcsUri: string): Promise<string> => {
  const match = gcsUri.match(/^gs:\/\/([^\/]+)\/(.+)$/);
  if (!match) throw new Error("Invalid GCS URI format");

  const [_, bucketName, filePath] = match;

  const [url] = await storage
    .bucket(bucketName)
    .file(filePath)
    .getSignedUrl({
      action: "read",
      expires: Date.now() + 1000 * 60 * 10, // valid for 10 mins
    });

  return url;
};
