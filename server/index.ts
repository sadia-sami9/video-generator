// // server/index.ts
// import express from "express";
// import axios from "axios";

// const app = express();
// app.use(express.json());

// const port = 5000;

// // Endpoint to generate video
// app.post("/generate-video", async (req, res) => {
//   const { productDetails, videoType } = req.body;

//   // Prepare the API request payload
//   const payload = {
//     prompt: `Generate a video based on: ${productDetails} with style ${videoType}`,
//     // Include any other required parameters for Gemini API
//   };

//   try {
//     const response = await axios.post(
//       "https://api.google.com/gemini/generate", // replace with the actual Gemini API endpoint
//       payload,
//       { headers: { Authorization: `Bearer ${process.env.GOOGLE_API_KEY}` } }
//     );
//     res.json({ videoUrl: response.data.videoUrl });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error generating video");
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

import express from "express";
import dotenv from "dotenv";
import videoRoutes from "./routes/videoRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api", videoRoutes);  // Setup routes for video generation

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
