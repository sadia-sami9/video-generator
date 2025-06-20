AI Video Generation with Google Gemini (Veo 2)

This is a full-stack AI video generation application built using Next.js (frontend) and Node.js with Express (backend). The project uses Google Gemini (Veo 2) for generating custom videos from user-defined inputs. There are two use cases included in the application.

Use Cases

1. Marketing Video Generator for Suplimax Energy Drink
   Users can provide key product features, tone, target audience, and style to generate a customized marketing video.

2. Real Estate Video Tour Generator
   Users can fill in real estate property details such as address, price, bedrooms, bathrooms, square footage, features, and preferred tour style to generate a virtual video tour.

 How It Works

- The application starts at a landing page with two buttons representing each use case.
- Clicking a use case navigates to a dedicated form page.
- On form submission, a prompt is generated and sent to the backend.
- The backend communicates with Google Gemini (Veo 2) API to generate the video.
- Once the video is ready, it is retrieved from Google Cloud Storage as a signed URL.
- The video is displayed on the frontend with an option to download it.

Tech Stack

- Frontend: Next.js, TypeScript, Tailwind CSS
- Backend: Node.js, Express, TypeScript
- AI Integration: Google Gemini (Veo 2.0)
- Cloud Storage: Google Cloud Storage with Signed URLs

Environment Variables

Create a `.env` file in the root of your project with the following variables:

GOOGLE_API_KEY=your_google_api_key
PROJECT_ID=your_project_id
PORT=5000


Also, ensure your Google Cloud service account JSON key file is placed in the server directory and referenced correctly in your code.
Setup Instructions

1. Install Dependencies
Install both frontend and backend dependencies:
npm install

2. Run the Frontend (Next.js)

npm run dev
The frontend will run on http://localhost:3000

3. Run the Backend (Node.js + Express)

npx ts-node server/index.ts
The backend will run on http://localhost:5000

