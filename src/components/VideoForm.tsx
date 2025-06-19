import { useState } from "react";

// Define the type for the props
interface VideoFormProps {
  onGenerate: (data: { productDetails: string; videoType: string; sampleCount: number; duration: number }) => void;
}

const VideoForm: React.FC<VideoFormProps> = ({ onGenerate }) => {
  const [productDetails, setProductDetails] = useState("");
  const [videoType, setVideoType] = useState("");
  const [sampleCount, setSampleCount] = useState(1);
  const [duration, setDuration] = useState(8);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({ productDetails, videoType, sampleCount, duration });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Product Details" onChange={(e) => setProductDetails(e.target.value)} />
      <input type="text" placeholder="Video Type" onChange={(e) => setVideoType(e.target.value)} />
      <input type="number" value={sampleCount} onChange={(e) => setSampleCount(parseInt(e.target.value))} />
      <input type="number" value={duration} onChange={(e) => setDuration(parseInt(e.target.value))} />
      <button type="submit">Generate Video</button>
    </form>
  );
};

export default VideoForm;
