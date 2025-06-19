// import axios from "axios";

// // Helper function to generate a video using the Veo 3.0 API
// export const generateVideo = async (prompt: string, sampleCount: number, duration: number, apiKey: string) => {
//   // const url = `https://us-central1-aiplatform.googleapis.com/v1/projects/video-generator-463222/locations/us-central1/publishers/google/models/veo-3.0-generate-preview:predictLongRunning`;
//  const url = `https://us-central1-aiplatform.googleapis.com/v1/projects/video-generator-463222/locations/us-central1/publishers/google/models/veo-2.0-generate-001:predictLongRunning`;

//   const payload = {
//     instances: [
//       {
//         prompt: prompt,
//       },
//     ],
//     parameters: {
//       sampleCount: sampleCount,
//       durationSeconds: duration,
//       aspectRatio: "16:9", // or "9:16" based on the requirement
//       generateAudio: true,
//       storageUri: "gs://video-generation-bucket-ss/output_video.mp4", // Optional: specify Cloud Storage URI
//     },
//   };

//   try {
//     const response = await axios.post(url, payload, {
//       headers: {
//         Authorization: `Bearer ${apiKey}`,
//         "Content-Type": "application/json",
//       },
//     });

//     return response.data; // This contains operation name, and further steps for polling
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       throw new Error(`Error in generating video: ${error.message}`);
//     } else {
//       throw new Error("An unknown error occurred while generating the video.");
//     }
//   }
// };

// // Helper function to poll the status of the video generation
// export const pollVideoGenerationStatus = async (operationName: string, apiKey: string) => {
//   const url = `https://us-central1-aiplatform.googleapis.com/v1/${operationName}:fetchPredictOperation`;

//   try {
//     const response = await axios.post(url, {}, {
//       headers: {
//         Authorization: `Bearer ${apiKey}`,
//         "Content-Type": "application/json",
//       },
//     });

//     return response.data;
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       throw new Error(`Error polling video generation: ${error.message}`);
//     } else {
//       throw new Error("An unknown error occurred while polling the video generation.");
//     }
//   }
// };

import axios from "axios";
import { google } from "googleapis"; // Import Google API Client Library
import path from "path";

// // Path to the service account key file
// const KEY_FILE_PATH = "video-generator-463222-2a3459699829.json";

// // Set up authentication using service account
// const auth = new google.auth.GoogleAuth({
//   keyFile: path.join(__dirname, KEY_FILE_PATH),  // Path to your service account JSON key
//   scopes: ["https://www.googleapis.com/auth/cloud-platform"], // Set necessary scope
// });


// Define the path to your service account key file (located in the root folder)
const KEY_FILE_PATH = path.join(__dirname, '..', 'video-generator-463222-2a3459699829.json');
console.log("Using key file path:", KEY_FILE_PATH);

// Set up authentication using service account
const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE_PATH,  // Path to the JSON key file in the root folder
  scopes: ["https://www.googleapis.com/auth/cloud-platform"],  // Required permissions for Vertex AI
});
// Helper function to generate a video using the Veo 3.0 API
export const generateVideo = async (prompt: string, sampleCount: number, duration: number) => {
  const url = `https://us-central1-aiplatform.googleapis.com/v1/projects/video-generator-463222/locations/us-central1/publishers/google/models/veo-3.0-generate-preview:predictLongRunning`;

  const payload = {
    instances: [
      {
        prompt: prompt,
      },
    ],
    parameters: {
      sampleCount: sampleCount,
      durationSeconds: duration,
      aspectRatio: "16:9", // or "9:16" based on the requirement
      generateAudio: true,
      storageUri: "gs://video-generation-bucket-ss/output_video.mp4", // Optional: specify Cloud Storage URI
    },
  };

  try {
    // Get OAuth 2.0 client for authorization
    // const client = await auth.getClient();

    // // Fetch the access token for the service account
    // const accessToken = await client.getAccessToken();
    //  console.log(">>>>>>>Access Token:", accessToken); 

    // Make the API request with the access token in the Authorization header
    const response = await axios.post(url, payload, {
      headers: {
        // Authorization: `Bearer ${accessToken}`, // Use the OAuth 2.0 token here
        "Content-Type": "application/json",
      },
    });

    return response.data; // This contains operation name, and further steps for polling
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error in generating video: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while generating the video.");
    }
  }
};

// Helper function to poll the status of the video generation
export const pollVideoGenerationStatus = async (operationName: string) => {
  const url = `https://us-central1-aiplatform.googleapis.com/v1/${operationName}:fetchPredictOperation`;

  try {
    // Get OAuth 2.0 client for authorization
    // const client = await auth.getClient();

    // // Fetch the access token for the service account
    // const accessToken = await client.getAccessToken();
    //  console.log("Access Token:", accessToken); 

    const response = await axios.post(url, {}, {
      headers: {
        // Authorization: `Bearer ${accessToken}`, // Use the OAuth 2.0 token here
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error polling video generation: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while polling the video generation.");
    }
  }
};
