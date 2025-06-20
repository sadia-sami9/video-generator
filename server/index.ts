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
