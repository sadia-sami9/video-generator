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
