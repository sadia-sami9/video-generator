import express from "express";
import { generateVideoController } from "../controllers/videoController";

const router = express.Router();

// Route to generate a video
router.post("/generate-video", generateVideoController);

export default router;
