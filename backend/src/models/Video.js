import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    originalName: {
      type: String,
    },

    storedFilename: {
      type: String,
    },

    status: {
      type: String,
      enum: ["processing", "safe", "flagged"],
      default: "processing",
    },

    progress: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Video", videoSchema);
