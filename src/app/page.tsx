// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
//               src/app/page.tsx
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }




// "use client"; 
// import { useState } from "react";
// import VideoForm from "../components/VideoForm";
// import VideoDisplay from "../components/VideoDisplay";

// // Define a type for the object passed into handleGenerate
// type VideoGenerationParams = {
//   productDetails: string;
//   videoType: string;
//   sampleCount: number;
//   duration: number;
// };

// const Home = () => {
//   const [videoUrl, setVideoUrl] = useState("");

//   // Use the defined type for the parameter
//   const handleGenerate = async ({ productDetails, videoType, sampleCount, duration }: VideoGenerationParams) => {
//     const response = await fetch("/api/generate-video", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ productDetails, videoType, sampleCount, duration }),
//     });

//     const data = await response.json();
//     setVideoUrl(data.videoUrl);
//   };

//   return (
//     <div>
//       <h1>Video Generation</h1>
//       <VideoForm onGenerate={handleGenerate} />
//       {videoUrl && <VideoDisplay videoUrl={videoUrl} />}
//     </div>
//   );
// };

// export default Home;



// import Link from "next/link";

// export default function LandingPage() {
//   return (
//     <main className="min-h-screen bg-gray-50 text-center p-10 flex flex-col items-center justify-center">
//       <h1 className="text-4xl font-bold mb-6">AI Video Generation Portal</h1>
//       <p className="text-lg mb-8">Choose a use case to generate your custom AI-powered video</p>
//       <div className="flex flex-col gap-4">
//         <Link href="/suplimax">
//           <button className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-700">Marketing Video Generator for Suplimax</button>
//         </Link>
//         <Link href="/real-estate">
//           <button className="bg-green-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-green-700">Real Estate Video Tour Generator</button>
//         </Link>
//       </div>
//     </main>
//   );
// }

// "use client";
// import Link from "next/link";

// export default function LandingPage() {
//   return (
//     <main className="min-h-screen grid grid-cols-1 md:grid-cols-2">
//       {/* Left side - gradient branding */}
//       <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 text-white p-10">
//         <h1 className="text-5xl font-extrabold mb-4 leading-tight drop-shadow">
//           The perfect <br /> video kit
//         </h1>
//         <ul className="text-lg font-medium space-y-2 mt-4">
//           <li>▪ Stunning UI</li>
//           <li>▪ Instant video generation</li>
//           <li>▪ Powered by Google Gemini (Veo)</li>
//         </ul>
//       </div>

//       {/* Right side - content */}
//       <div className="flex flex-col justify-center items-center bg-white p-10">
//         <h2 className="text-3xl font-bold mb-4 text-gray-800">
//           AI Video Generation Portal
//         </h2>
//         <p className="text-gray-600 mb-6 text-center max-w-md">
//           Choose a use case to generate your custom AI-powered video experience
//         </p>

//         <div className="space-y-4 w-full max-w-sm">
//           <Link href="/suplimax">
//             <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl text-lg shadow hover:from-purple-600 hover:to-pink-500 transition">
//               🧃 Marketing Video Generator for Suplimax
//             </button>
//           </Link>
//           <Link href="/real-estate">
//             <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-700 text-white py-3 rounded-xl text-lg shadow hover:from-purple-700 hover:to-indigo-500 transition">
//               🏡 Real Estate Video Tour Generator
//             </button>
//           </Link>
//         </div>
//       </div>
//     </main>
//   );
// }


"use client";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 font-sans">
      {/* Left panel with gradient branding */}
      <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 text-white p-10">
        <h1 className="text-5xl font-extrabold mb-4 leading-tight drop-shadow">
          The perfect <br /> video kit
        </h1>
        <ul className="text-lg font-medium space-y-2 mt-4">
          
          <li>▪ Instant video generation</li>
          <li>▪ Powered by Google Gemini (Veo)</li>
        </ul>
      </div>

      {/* Right side with content and buttons */}
      <div className="flex flex-col justify-center items-center bg-white p-10">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          AI Video Generation Portal
        </h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          Choose a use case to generate your custom AI-powered video experience.
        </p>

        <div className="space-y-6 w-full max-w-sm">
          <Link href="/suplimax">
            <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl text-lg shadow hover:from-purple-600 hover:to-pink-500 transition">
              Marketing Video Generator for Suplimax
            </button>
          </Link>
          <div className="space-y-6 w-full max-w-sm">

          </div>
          <Link href="/real-estate">
            <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-700 text-white py-3 rounded-xl text-lg shadow hover:from-purple-700 hover:to-indigo-500 transition">
              Real Estate Video Tour Generator
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
