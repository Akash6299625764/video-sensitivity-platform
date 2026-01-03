import Video from "../models/Video.js";
import { analyzeVideo } from "../services/videoProcessor.js";
import { io } from "../../server.js";

/* =======================
   UPLOAD VIDEO
======================= */
export const uploadVideo = async (req, res) => {
  console.log("FILE OBJECT:", req.file);

  if (!req.file) {
    return res.status(400).json({ message: "No file received" });
  }

  const video = await Video.create({
    userId: req.user.id,
    originalName: req.file.originalname,
    storedFilename: req.file.filename,
    status: "processing",
    progress: 0,
  });

  // 🔁 Emit progress updates
  analyzeVideo(async (progress) => {
    await Video.updateOne({ _id: video._id }, { $set: { progress } });

    io.emit("video-progress", {
      videoId: video._id.toString(),
      progress,
    });
  }).then(async (result) => {
    await Video.updateOne(
      { _id: video._id },
      { $set: { status: result, progress: 100 } }
    );

    // 🔥 Force final 100% update
    io.emit("video-progress", {
      videoId: video._id.toString(),
      progress: 100,
    });

    io.emit("video-complete", {
      videoId: video._id.toString(),
      status: result,
    });
  });

  // ✅ RETURN FULL VIDEO OBJECT (IMPORTANT)
  res.status(201).json(video);
};

/* =======================
   GET USER VIDEOS
======================= */
export const getMyVideos = async (req, res) => {
  const videos = await Video.find({ userId: req.user.id }).sort({
    createdAt: -1,
  });

  // ✅ BACKWARD COMPATIBILITY FIX
  const safeVideos = videos.map((v) => ({
    _id: v._id,
    originalName: v.originalName || v.storedFilename || "Unnamed video",
    storedFilename: v.storedFilename || "",
    status: v.status,
    progress: v.progress,
    createdAt: v.createdAt,
  }));

  res.json(safeVideos);
};
