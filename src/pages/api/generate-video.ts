import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Ensure the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const response = await fetch("http://localhost:5000/api/generate-video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    // const data = await response.json();
    // res.status(200).json(data);
    // Log the raw response text to debug the issue
    const rawResponse = await response.text(); // Use .text() to get the raw response as string
    // console.log("Raw response:", rawResponse);

    try {
      const data = JSON.parse(rawResponse); // Parse the response as JSON
      res.status(200).json(data);  // Return the video URL
    } catch (jsonError) {
      console.error("Failed to parse response as JSON:", jsonError);
      res.status(500).json({ message: "Failed to parse response from backend" });
    }
  } catch (error) {
    console.error("Error during video generation request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
