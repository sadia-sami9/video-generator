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







// import axios from "axios";
// import { google } from "googleapis"; // Import Google API Client Library
// import path from "path";

// // // Path to the service account key file
// // const KEY_FILE_PATH = "video-generator-463222-2a3459699829.json";

// // // Set up authentication using service account
// // const auth = new google.auth.GoogleAuth({
// //   keyFile: path.join(__dirname, KEY_FILE_PATH),  // Path to your service account JSON key
// //   scopes: ["https://www.googleapis.com/auth/cloud-platform"], // Set necessary scope
// // });


// // Define the path to your service account key file (located in the root folder)
// const KEY_FILE_PATH = path.join(__dirname, '..', 'video-generator-463222-2a3459699829.json');
// console.log("Using key file path:", KEY_FILE_PATH);

// // Set up authentication using service account
// const auth = new google.auth.GoogleAuth({
//   keyFile: KEY_FILE_PATH,  // Path to the JSON key file in the root folder
//   scopes: ["https://www.googleapis.com/auth/cloud-platform"],  // Required permissions for Vertex AI
// });
// // Helper function to generate a video using the Veo 3.0 API
// export const generateVideo = async (prompt: string, sampleCount: number, duration: number) => {
//   const url = `https://us-central1-aiplatform.googleapis.com/v1/projects/video-generator-463222/locations/us-central1/publishers/google/models/veo-3.0-generate-preview:predictLongRunning`;

//   const payload = {
//   instances: [
//     {
//       prompt: prompt,
//     },
//   ],
//   parameters: {
//     aspectRatio: "16:9",
//     sampleCount: sampleCount,
//     durationSeconds: duration,
//     generateAudio: true, // ✅ REQUIRED for veo-3.0
//     storageUri: "gs://video-generation-bucket-ss/output_video.mp4", // ✅ Optional but valid URI required if not returning raw bytes
//   },
// };


//   try {
//     // Get OAuth 2.0 client for authorization
//     const client = await auth.getClient();

//     // Fetch the access token for the service account
//     const accessToken = await client.getAccessToken();
//      console.log(">>>>>>>Access Token:", accessToken); 

//     // Make the API request with the access token in the Authorization header
//     const response = await axios.post(url, payload, {
//       headers: {
//         // Authorization: `Bearer ${accessToken}`, // Use the OAuth 2.0 token here
//         Authorization: `Bearer ${accessToken.token}`, // ✅ use the .token field
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
// export const pollVideoGenerationStatus = async (operationName: string) => {
//   const url = `https://us-central1-aiplatform.googleapis.com/v1/${operationName}:fetchPredictOperation`;

//   try {
//     // Get OAuth 2.0 client for authorization
//     const client = await auth.getClient();

//     // Fetch the access token for the service account
//     const accessToken = await client.getAccessToken();
//      console.log("Access Token:", accessToken); 

//     const response = await axios.post(url, {}, {
//       headers: {
//         // Authorization: `Bearer ${accessToken}`, // Use the OAuth 2.0 token here
//         Authorization: `Bearer ${accessToken.token}`, // ✅ use the .token field
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







// import axios from "axios";
// import { google } from "googleapis";
// import path from "path";

// // Set path to service account key file (make sure it's not in .gitignore)
// const KEY_FILE_PATH = path.join(__dirname, '..', 'video-generator-463222-2a3459699829.json');
// console.log("✅ Using key file path:", KEY_FILE_PATH);

// const auth = new google.auth.GoogleAuth({
//   keyFile: KEY_FILE_PATH,
//   scopes: ["https://www.googleapis.com/auth/cloud-platform"],
// });

// // Generate a video using Google Veo 3.0
// export const generateVideo = async (prompt: string, sampleCount: number, duration: number) => {
//   // const url = "https://us-central1-aiplatform.googleapis.com/v1/projects/video-generator-463222/locations/us-central1/publishers/google/models/veo-3.0-generate-preview:predictLongRunning";
// const url = `https://us-central1-aiplatform.googleapis.com/v1/projects/video-generator-463222/locations/us-central1/publishers/google/models/veo-2.0-generate-001:predictLongRunning`;

//   const payload = {
//     instances: [
//       {
//         prompt: prompt,
//       },
//     ],
//     parameters: {
//       aspectRatio: "16:9",
//       sampleCount: sampleCount,
//       durationSeconds: duration,
//       // generateAudio: true, // Required for veo-3.0
//       storageUri: "gs://video-generation-bucket-ss/output_video.mp4", // Must be valid and writeable
//     },
//   };

//   try {
//     const client = await auth.getClient();
//     const tokenInfo = await client.getAccessToken();

//     if (!tokenInfo?.token) {
//       throw new Error("❌ Failed to obtain access token.");
//     }

//     const accessToken = tokenInfo.token;
//     console.log("✅ Access Token obtained.");

//     // Log the request for debug
//     console.log("📤 Sending request to Veo API with payload:", JSON.stringify(payload, null, 2));

//     const response = await axios.post(url, payload, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//     });

//     console.log("✅ Veo API responded:", response.data);
//     return response.data;
//   } catch (error: any) {
//     console.error("❌ Error in generating video");

//     if (axios.isAxiosError(error)) {
//       console.error("📩 Axios error response:", error.response?.data || error.message);
//     } else {
//       console.error("🔍 Unknown error:", error);
//     }

//     throw new Error("Error in generating video: " + error.message);
//   }
// };

// // Poll the video generation status
// // export const pollVideoGenerationStatus = async (operationName: string) => {
// //   // const url = `https://us-central1-aiplatform.googleapis.com/v1/${operationName}:fetchPredictOperation`;
// // const url = `https://us-central1-aiplatform.googleapis.com/v1/${operationName}`

// //   try {
// //     const client = await auth.getClient();
// //     const tokenInfo = await client.getAccessToken();

// //     if (!tokenInfo?.token) {
// //       throw new Error("❌ Failed to obtain access token for polling.");
// //     }

// //     const accessToken = tokenInfo.token;

// //     const response = await axios.post(url, {}, {
// //       headers: {
// //         Authorization: `Bearer ${accessToken}`,
// //         "Content-Type": "application/json",
// //       },
// //     });

// //     console.log("🔁 Polling response:", response.data);
// //     return response.data;
// //   } catch (error: any) {
// //     console.error("❌ Error polling video generation status");

// //     if (axios.isAxiosError(error)) {
// //       console.error("📩 Axios error response:", error.response?.data || error.message);
// //     } else {
// //       console.error("🔍 Unknown error:", error);
// //     }

// //     throw new Error("Error polling video generation: " + error.message);
// //   }
// // };



// export const pollVideoGenerationStatus = async (operationName: string) => {
//   const url = `https://us-central1-aiplatform.googleapis.com/v1/${operationName}`; // ✅ Correct

//   try {
//     const client = await auth.getClient();
//     const tokenInfo = await client.getAccessToken();

//     if (!tokenInfo?.token) {
//       throw new Error("❌ Failed to obtain access token for polling.");
//     }

//     const accessToken = tokenInfo.token;

//     // ✅ Axios GET instead of POST
//     const response = await axios.get(url, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//     });

//     console.log("🔁 Polling response:", response.data);
//     return response.data;
//   } catch (error: any) {
//     console.error("❌ Error polling video generation status");

//     if (axios.isAxiosError(error)) {
//       console.error("📩 Axios error response:", error.response?.data || error.message);
//     } else {
//       console.error("🔍 Unknown error:", error);
//     }

//     throw new Error("Error polling video generation: " + error.message);
//   }
// };






import axios from "axios";
import { google } from "googleapis";
import path from "path";
import { Storage } from "@google-cloud/storage";


// Path to service account key
const KEY_FILE_PATH = path.join(__dirname, '..', 'video-generator-463222-2a3459699829.json');
console.log("✅ Using key file path:", KEY_FILE_PATH);



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

    if (!tokenInfo?.token) throw new Error("❌ Failed to obtain access token.");
    const accessToken = tokenInfo.token;

    console.log("✅ Access Token obtained.");
    console.log("📤 Sending request to Veo API with payload:", JSON.stringify(payload, null, 2));

    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    console.log("✅ Veo API responded:", response.data);

    // Extract and transform the correct operationName for polling
    const operationId = response.data.name.split("/").pop();
    const operationName = `projects/video-generator-463222/locations/us-central1/operations/${operationId}`;

    return { operationName };
  } catch (error: any) {
    console.error("❌ Error in generating video");
    if (axios.isAxiosError(error)) {
      console.error("📩 Axios error response:", error.response?.data || error.message);
    } else {
      console.error("🔍 Unknown error:", error);
    }
    throw new Error("Error in generating video: " + error.message);
  }
};

// Function to poll status of the video generation operation
// export const pollVideoGenerationStatus = async (operationName: string) => {
//   const url = `https://us-central1-aiplatform.googleapis.com/v1/${operationName}`;

//   try {
//     const client = await auth.getClient();
//     const tokenInfo = await client.getAccessToken();

//     if (!tokenInfo?.token) throw new Error("❌ Failed to obtain access token for polling.");
//     const accessToken = tokenInfo.token;

//     const response = await axios.get(url, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//     });

//     console.log("🔁 Polling response:", response.data);
//     return response.data;
//   } catch (error: any) {
//     console.error("❌ Error polling video generation status");
//     if (axios.isAxiosError(error)) {
//       console.error("📩 Axios error response:", error.response?.data || error.message);
//     } else {
//       console.error("🔍 Unknown error:", error);
//     }
//     throw new Error("Error polling video generation: " + error.message);
//   }
// };


export const pollVideoGenerationStatus = async (operationId: string) => {
  const url = `https://us-central1-aiplatform.googleapis.com/v1/projects/video-generator-463222/locations/us-central1/publishers/google/models/veo-2.0-generate-001:fetchPredictOperation`;

  try {
    const client = await auth.getClient();
    const tokenInfo = await client.getAccessToken();

    if (!tokenInfo?.token) throw new Error("❌ Failed to obtain access token for polling.");
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

    console.log("🔁 Polling response:", response.data);
    return response.data;
    
  } catch (error: any) {
    console.error("❌ Error polling video generation status");

    if (axios.isAxiosError(error)) {
      console.error("📩 Axios error response:", error.response?.data || error.message);
    } else {
      console.error("🔍 Unknown error:", error);
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
