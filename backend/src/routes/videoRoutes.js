import express from "express";
import multer from "multer";
import { uploadVideo, getMyVideos } from "../controllers/videoController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/upload",
  auth(["editor", "admin"]),
  upload.single("video"),
  uploadVideo
);

router.get("/my", auth(["viewer", "editor", "admin"]), getMyVideos);

export default router;
