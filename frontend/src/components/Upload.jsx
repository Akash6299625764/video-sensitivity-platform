import { useEffect, useRef, useState } from "react";
import { uploadVideo } from "../api/videoApi";
import { socket } from "../socket/socket";

function Upload() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWExMTExMjIyMjMzMzM0NDQ0NTU1NSIsInJvbGUiOiJlZGl0b3IiLCJpYXQiOjE3Njc0NzM5MjksImV4cCI6MTc2NzU2MDMyOX0.ov17T0034v6paXInqHai9J2q1kTFiC8fohrrd8_4hUQ";

  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");

  const currentVideoId = useRef(null);

  useEffect(() => {
    socket.on("video-progress", (data) => {
      // ✅ FIX: bind to first received videoId
      if (!currentVideoId.current) {
        currentVideoId.current = data.videoId;
      }

      if (data.videoId === currentVideoId.current) {
        setProgress(data.progress);
      }
    });

    socket.on("video-complete", (data) => {
      if (data.videoId === currentVideoId.current) {
        setStatus(data.status);
      }
    });

    return () => {
      socket.off("video-progress");
      socket.off("video-complete");
    };
  }, []);

  const handleUpload = async (e) => {
    setProgress(0);
    setStatus("");
    currentVideoId.current = null;

    // upload still needed to create DB entry
    await uploadVideo(e.target.files[0], token);
  };

  return (
    <div>
      <h3>Upload Video</h3>
      <input type="file" accept="video/*" onChange={handleUpload} />

      <p>Progress: {progress}%</p>
      {status && <p>Status: {status}</p>}
    </div>
  );
}

export default Upload;
