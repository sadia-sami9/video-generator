// "use client";
// import { useState } from "react";

// export default function SuplimaxPage() {
//   const [features, setFeatures] = useState("");
//   const [tone, setTone] = useState("Energetic");
//   const [audience, setAudience] = useState("Gen-Z");
//   const [style, setStyle] = useState("Cinematic");
//   const [videoUrl, setVideoUrl] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setVideoUrl("");

//     const prompt = `Generate a short marketing video for Suplimax energy drink. Product features: ${features}. Tone: ${tone}. Audience: ${audience}. Style: ${style}. The video should display the word 'Suplimax' on the can.`;

//     const res = await fetch("/api/generate-video", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ prompt, sampleCount: 1, duration: 8 })
//     });

//     const data = await res.json();
//     setVideoUrl(data.videoUrl);
//     setLoading(false);
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Suplimax Marketing Video Generator</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <textarea
//           className="w-full p-2 border rounded"
//           placeholder="Enter key product features..."
//           value={features}
//           onChange={(e) => setFeatures(e.target.value)}
//         />
//         <div className="flex gap-4">
//           <select className="flex-1 p-2 border rounded" value={tone} onChange={(e) => setTone(e.target.value)}>
//             <option value="Energetic">Energetic</option>
//             <option value="Professional">Professional</option>
//             <option value="Casual">Casual</option>
//           </select>
//           <select className="flex-1 p-2 border rounded" value={audience} onChange={(e) => setAudience(e.target.value)}>
//             <option value="Gen-Z">Gen-Z</option>
//             <option value="Athletes">Athletes</option>
//             <option value="Tech Enthusiasts">Tech Enthusiasts</option>
//           </select>
//           <select className="flex-1 p-2 border rounded" value={style} onChange={(e) => setStyle(e.target.value)}>
//             <option value="Cinematic">Cinematic</option>
//             <option value="Animated">Animated</option>
//             <option value="Ad Style">Ad Style</option>
//           </select>
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           {loading ? "Generating..." : "Generate Video"}
//         </button>
//       </form>

//       {videoUrl && (
//         <div className="mt-6">
//           <video controls className="w-full rounded shadow">
//             <source src={videoUrl} type="video/mp4" />
//           </video>
//           <a
//             href={videoUrl}
//             download
//             className="block text-center mt-2 text-blue-600 underline"
//           >
//             Download Video
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";
import { useState } from "react";

export default function SuplimaxPage() {
  const [features, setFeatures] = useState("");
  const [tone, setTone] = useState("Energetic");
  const [audience, setAudience] = useState("Gen-Z");
  const [style, setStyle] = useState("Cinematic");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setVideoUrl("");
    setError("");

    const prompt = `Generate a short marketing video for SUPLIMAX energy drink. Product features: ${features}. Tone: ${tone}. Audience: ${audience}. Style: ${style}. The video should display the word 'Suplimax' on the can.`;

    try {
      const res = await fetch("/api/generate-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, sampleCount: 1, duration: 8 })
      });

      if (!res.ok) throw new Error("Failed to generate video");

      const data = await res.json();
      setVideoUrl(data.videoUrl);
    } catch (err) {
      setError("Failed to generate video. Please try again later.");
    }
    setLoading(false);
  };

//   return (
//     <div className="min-h-screen bg-white text-black p-6 max-w-3xl mx-auto">
//       <h2 className="text-3xl font-bold mb-4 text-center">Suplimax Marketing Video Generator</h2>
//       <form onSubmit={handleSubmit} className="space-y-6 bg-gray-100 p-6 rounded-lg shadow">
//         <textarea
//           className="w-full p-3 border border-gray-300 rounded-lg resize-none"
//           placeholder="Enter key product features..."
//           rows={4}
//           value={features}
//           onChange={(e) => setFeatures(e.target.value)}
//         />
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block mb-1 font-semibold">Tone</label>
//             <select className="w-full p-2 border rounded bg-white" value={tone} onChange={(e) => setTone(e.target.value)}>
//               <option value="Energetic">Energetic</option>
//               <option value="Professional">Professional</option>
//               <option value="Casual">Casual</option>
//             </select>
//           </div>
//           <div>
//             <label className="block mb-1 font-semibold">Target Audience</label>
//             <select className="w-full p-2 border rounded bg-white" value={audience} onChange={(e) => setAudience(e.target.value)}>
//               <option value="Gen-Z">Gen-Z</option>
//               <option value="Athletes">Athletes</option>
//               <option value="Tech Enthusiasts">Tech Enthusiasts</option>
//             </select>
//           </div>
//           <div>
//             <label className="block mb-1 font-semibold">Video Style</label>
//             <select className="w-full p-2 border rounded bg-white" value={style} onChange={(e) => setStyle(e.target.value)}>
//               <option value="Cinematic">Cinematic</option>
//               <option value="Animated">Animated</option>
//               <option value="Ad Style">Ad Style</option>
//             </select>
//           </div>
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700"
//         >
//           {loading ? "Generating..." : "Generate Video"}
//         </button>
//       </form>

//       {error && <p className="text-red-600 text-center mt-4">{error}</p>}

//       {videoUrl && (
//         <div className="mt-8 bg-gray-100 p-4 rounded-lg shadow">
//           <video controls className="w-full rounded-lg">
//             <source src={videoUrl} type="video/mp4" />
//           </video>
//           <a
//             href={videoUrl}
//             download
//             className="block text-center mt-3 text-blue-600 hover:underline"
//           >
//             Download Video
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 font-sans">
      {/* Left panel for brand identity */}
      <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 text-white p-10">
        <h1 className="text-5xl font-extrabold mb-4 leading-tight drop-shadow">
          Suplimax <br /> Energy Drink
        </h1>
        <ul className="text-lg font-medium space-y-2 mt-4">
          <li>▪ Branded visuals</li>
          <li>▪ Instant customization</li>
          <li>▪ AI-driven promo content</li>
        </ul>
      </div>

      {/* Right panel for form or video */}
      <div className="flex flex-col justify-center items-center bg-white p-8">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-center mb-6">
          Suplimax Marketing Video Generator
        </h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {!videoUrl ? (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 w-full max-w-xl bg-gray-100 p-6 rounded-lg shadow"
          >
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Key Product Features</label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg resize-none text-black"
                placeholder="Enter key product features..."
                rows={4}
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-1 font-semibold text-gray-700">Tone</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded bg-white text-black"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                >
                  <option value="Energetic">Energetic</option>
                  <option value="Professional">Professional</option>
                  <option value="Casual">Casual</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-700">Target Audience</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded bg-white text-black"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                >
                  <option value="Gen-Z">Gen-Z</option>
                  <option value="Athletes">Athletes</option>
                  <option value="Tech Enthusiasts">Tech Enthusiasts</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-700">Video Style</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded bg-white text-black"
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                >
                  <option value="Cinematic">Cinematic</option>
                  <option value="Animated">Animated</option>
                  <option value="Ad Style">Ad Style</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg text-lg hover:from-purple-600 hover:to-pink-500 transition"
            >
              {loading ? "Generating..." : "Generate Video"}
            </button>
          </form>
        ) : (
          <div className="w-full max-w-xl bg-gray-100 p-4 rounded-lg shadow text-center">
            <video controls className="w-full rounded-lg">
              <source src={videoUrl} type="video/mp4" />
            </video>
            <a
              href={videoUrl}
              download
              className="block text-center mt-3 text-blue-600 hover:underline"
            >
              Download Video
            </a>
          </div>
        )}
      </div>
    </main>
  );
}