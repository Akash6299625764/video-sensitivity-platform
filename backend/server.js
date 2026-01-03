import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";
import app from "./app.js";
import { connectDB } from "./src/config/db.js";

dotenv.config();
connectDB();

const server = http.createServer(app);

export const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

server.listen(process.env.PORT, () => {
  console.log(`Backend running on port ${process.env.PORT}`);
});
