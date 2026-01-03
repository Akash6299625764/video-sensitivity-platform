import { useEffect, useState } from "react";
import { fetchMyVideos } from "../api/videoApi";

function Dashboard({ refreshKey }) {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWExMTExMjIyMjMzMzM0NDQ0NTU1NSIsInJvbGUiOiJlZGl0b3IiLCJpYXQiOjE3Njc0NzM5MjksImV4cCI6MTc2NzU2MDMyOX0.ov17T0034v6paXInqHai9J2q1kTFiC8fohrrd8_4hUQ";
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchMyVideos(token).then((res) => {
      console.log("VIDEOS FROM API:", res.data); // 🔍 DEBUG
      setVideos(res.data);
    });
  }, [refreshKey]);

  return (
    <div>
      <h2>My Videos</h2>

      {videos.length === 0 ? (
        <p>No videos found</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Video Name</th>
              <th>Status</th>
              <th>Progress</th>
            </tr>
          </thead>

          <tbody>
            {videos.map((v) => (
              <tr key={v._id}>
                {/* ✅ THIS IS THE FIX */}
                <td>{v.originalName}</td>
                <td>{v.status}</td>
                <td>{v.progress}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;
