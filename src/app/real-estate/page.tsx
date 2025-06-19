// "use client";
// import { useState } from "react";

// export default function RealEstatePage() {
//   const [address, setAddress] = useState("");
//   const [price, setPrice] = useState("");
//   const [bedrooms, setBedrooms] = useState("");
//   const [bathrooms, setBathrooms] = useState("");
//   const [squareFootage, setSquareFootage] = useState("");
//   const [features, setFeatures] = useState("");
//   const [style, setStyle] = useState("Luxury");
//   const [videoUrl, setVideoUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setVideoUrl("");
//     setError("");

//     const productDetails = `
//       Real estate tour for a property located at ${address}. 
//       Price: ${price}. Bedrooms: ${bedrooms}, Bathrooms: ${bathrooms}, 
//       Square Footage: ${squareFootage}. Features: ${features}.
//     `;

//     const videoType = `${style} property tour`;

//     try {
//       const res = await fetch("/api/generate-video", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ productDetails, videoType, sampleCount: 1, duration: 8 }),
//       });

//       if (!res.ok) throw new Error("Failed to generate video");

//       const data = await res.json();
//       setVideoUrl(data.videoUrl);
//     } catch (err) {
//       setError("Failed to generate video. Please try again later.");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-white text-black p-6 max-w-3xl mx-auto">
//       <h2 className="text-3xl font-bold mb-4 text-center">Real Estate Video Tour Generator</h2>

//       <form onSubmit={handleSubmit} className="space-y-6 bg-gray-100 p-6 rounded-lg shadow">
//         <input
//           className="w-full p-3 border border-gray-300 rounded-lg"
//           placeholder="Address"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//         />
//         <div className="grid grid-cols-2 gap-4">
//           <input
//             className="w-full p-3 border border-gray-300 rounded-lg"
//             placeholder="Price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//           />
//           <input
//             className="w-full p-3 border border-gray-300 rounded-lg"
//             placeholder="Square Footage"
//             value={squareFootage}
//             onChange={(e) => setSquareFootage(e.target.value)}
//           />
//         </div>
//         <div className="grid grid-cols-2 gap-4">
//           <input
//             className="w-full p-3 border border-gray-300 rounded-lg"
//             placeholder="Bedrooms"
//             value={bedrooms}
//             onChange={(e) => setBedrooms(e.target.value)}
//           />
//           <input
//             className="w-full p-3 border border-gray-300 rounded-lg"
//             placeholder="Bathrooms"
//             value={bathrooms}
//             onChange={(e) => setBathrooms(e.target.value)}
//           />
//         </div>
//         <textarea
//           className="w-full p-3 border border-gray-300 rounded-lg resize-none"
//           placeholder="Special features (e.g. modern kitchen, garden, pool...)"
//           rows={3}
//           value={features}
//           onChange={(e) => setFeatures(e.target.value)}
//         />
//         <div>
//           <label className="block mb-1 font-semibold">Tour Style</label>
//           <select
//             className="w-full p-2 border rounded bg-white"
//             value={style}
//             onChange={(e) => setStyle(e.target.value)}
//           >
//             <option value="Luxury">Luxury</option>
//             <option value="Family-Friendly">Family-Friendly</option>
//             <option value="Minimalist">Minimalist</option>
//           </select>
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



"use client";
import { useState } from "react";

export default function RealEstatePage() {
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [squareFootage, setSquareFootage] = useState("");
  const [features, setFeatures] = useState("");
  const [style, setStyle] = useState("Luxury");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setVideoUrl("");
    setError("");

    const prompt = `Generate a high-quality ${style.toLowerCase()} real estate video tour for the following property:\n` +
      `Address: ${address}.\n` +
      `Price: ${price}.\n` +
      `Bedrooms: ${bedrooms}, Bathrooms: ${bathrooms}, Square Footage: ${squareFootage} sq ft.\n` +
      `Key Features: ${features}.\n` +
      `Ensure the visuals showcase the elegance and appeal of the property alongwith important property details.`;

    try {
      const res = await fetch("/api/generate-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, sampleCount: 1, duration: 8 }),
      });

      if (!res.ok) throw new Error("Failed to generate video");

      const data = await res.json();
      setVideoUrl(data.videoUrl);
    } catch (err) {
      setError("Failed to generate video. Please try again.");
    }

    setLoading(false);
  };

//   return (
//     <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 font-sans">
//       {/* Left side gradient branding */}
//       <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 text-white p-10">
//         <h1 className="text-5xl font-extrabold mb-4 leading-tight drop-shadow">
//           Real Estate <br /> Tour Builder
//         </h1>
//         <ul className="text-lg font-medium space-y-2 mt-4">
//           <li>▪ Elegant listings</li>
//           <li>▪ Custom prompts</li>
//           <li>▪ Instant video generation</li>
//         </ul>
//       </div>

//       {/* Right side form */}
//       <div className="flex flex-col justify-center items-center bg-white p-8">
//         <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">
//           Real Estate Video Tour Generator
//         </h2>

//         <form
//           onSubmit={handleSubmit}
//           className="space-y-6 w-full max-w-xl bg-gray-100 p-6 rounded-lg shadow"
//         >
//           <div>
//             <label className="block mb-1 font-semibold text-gray-700">Property Address</label>
//             <input
//               className="w-full p-3 border border-gray-300 rounded-lg text-black"
//               placeholder="Enter property address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block mb-1 font-semibold text-gray-700">Price</label>
//               <input
//                 className="w-full p-3 border border-gray-300 rounded-lg text-black"
//                 placeholder="e.g. $10,000,000"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//               />
//             </div>
//             <div>
//               <label className="block mb-1 font-semibold text-gray-700">Square Footage</label>
//               <input
//                 className="w-full p-3 border border-gray-300 rounded-lg text-black"
//                 placeholder="e.g. 6,100"
//                 value={squareFootage}
//                 onChange={(e) => setSquareFootage(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block mb-1 font-semibold text-gray-700">Bedrooms</label>
//               <input
//                 className="w-full p-3 border border-gray-300 rounded-lg text-black"
//                 placeholder="e.g. 5"
//                 value={bedrooms}
//                 onChange={(e) => setBedrooms(e.target.value)}
//               />
//             </div>
//             <div>
//               <label className="block mb-1 font-semibold text-gray-700">Bathrooms</label>
//               <input
//                 className="w-full p-3 border border-gray-300 rounded-lg text-black"
//                 placeholder="e.g. 6.5"
//                 value={bathrooms}
//                 onChange={(e) => setBathrooms(e.target.value)}
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block mb-1 font-semibold text-gray-700">Special Features</label>
//             <textarea
//               className="w-full p-3 border border-gray-300 rounded-lg resize-none text-black"
//               placeholder="e.g. Modern kitchen, landscaped garden, pool, elegant entrance..."
//               rows={3}
//               value={features}
//               onChange={(e) => setFeatures(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-semibold text-gray-700">Tour Style</label>
//             <select
//               className="w-full p-3 border border-gray-300 rounded-lg text-black bg-white"
//               value={style}
//               onChange={(e) => setStyle(e.target.value)}
//             >
//               <option value="Luxury">Luxury</option>
//               <option value="Family-Friendly">Family-Friendly</option>
//               <option value="Minimalist">Minimalist</option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg text-lg hover:from-purple-600 hover:to-pink-500 transition"
//           >
//             {loading ? "Generating..." : "Generate Video"}
//           </button>
//         </form>

//         {error && <p className="text-red-600 text-center mt-4">{error}</p>}

//         {videoUrl && (
//           <div className="mt-8 bg-gray-100 p-4 rounded-lg shadow w-full max-w-xl">
//             <video controls className="w-full rounded-lg">
//               <source src={videoUrl} type="video/mp4" />
//             </video>
//             <a
//               href={videoUrl}
//               download
//               className="block text-center mt-3 text-blue-600 hover:underline"
//             >
//               Download Video
//             </a>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 font-sans">
      {/* Left side gradient branding */}
      <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 text-white p-10">
        <h1 className="text-5xl font-extrabold mb-4 leading-tight drop-shadow">
          Real Estate <br /> Tour Builder
        </h1>
        <ul className="text-lg font-medium space-y-2 mt-4">
          <li>▪ Elegant listings</li>
          <li>▪ Custom prompts</li>
          <li>▪ Instant video generation</li>
        </ul>
      </div>

      {/* Right side form or video */}
      <div className="flex flex-col justify-center items-center bg-white p-8">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-center mb-6">
          Real Estate Video Tour Generator
        </h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {!videoUrl ? (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 w-full max-w-xl bg-gray-100 p-6 rounded-lg shadow"
          >
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Property Address</label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg text-black"
                placeholder="Enter property address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-semibold text-gray-700">Price</label>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg text-black"
                  placeholder="e.g. $10,000,000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-gray-700">Square Footage</label>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg text-black"
                  placeholder="e.g. 6,100"
                  value={squareFootage}
                  onChange={(e) => setSquareFootage(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-semibold text-gray-700">Bedrooms</label>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg text-black"
                  placeholder="e.g. 5"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-gray-700">Bathrooms</label>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg text-black"
                  placeholder="e.g. 6.5"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-700">Special Features</label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg resize-none text-black"
                placeholder="e.g. Modern kitchen, landscaped garden, pool, elegant entrance..."
                rows={3}
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-700">Tour Style</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg text-black bg-white"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
              >
                <option value="Luxury">Luxury</option>
                <option value="Family-Friendly">Family-Friendly</option>
                <option value="Minimalist">Minimalist</option>
              </select>
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