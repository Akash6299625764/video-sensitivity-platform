📌 Project Description

The Video Sensitivity Platform is a full-stack web application,
It allows users to upload video files, processes them for sensitivity analysis, displays processing progress, and shows the final result as safe or flagged.



🛠️ Technology Stack
Frontend

React (Vite)

JavaScript

Axios

Socket.io Client

Backend

Node.js

Express.js

Multer (for video upload)

Socket.io

Database

MongoDB (Mongoose)

✨ Features Implemented (As per PDF)

Upload video files

Store video metadata in MongoDB

Simulated sensitivity analysis

Real-time progress indicator (0% – 100%)

Display final status (safe / flagged)

List uploaded videos with name, status, and progress

📂 Project Structure
video-sensitivity-platform
├── backend
│   ├── server.js
│   ├── app.js
│   └── src
│       ├── controllers
│       ├── models
│       ├── routes
│       ├── services
│       └── middleware
│
├── frontend
│   ├── index.html
│   └── src
│       ├── components
│       ├── pages
│       ├── api
│       ├── socket
│       ├── App.jsx
│       └── main.jsx
│
└── README.md

🚀 How to Run the Project
Prerequisites

Node.js installed

MongoDB running locally

Backend Setup
cd backend
npm install
npm run dev


Backend will start on:

http://localhost:5000

Frontend Setup
cd frontend
npm install
npm run dev


Frontend will start on:

http://localhost:5173

⚙️ How the System Works

User uploads a video from the frontend.

Backend stores the video and metadata in MongoDB.

Sensitivity processing starts.

Progress updates are sent in real time.

Final status (safe or flagged) is generated.

Uploaded videos are shown in the “My Videos” section(after refresh).



✅ Conclusion

This project fulfills all the requirements specified in the assignment:

Full-stack implementation

Video upload and processing

Real-time progress tracking

MongoDB integration
