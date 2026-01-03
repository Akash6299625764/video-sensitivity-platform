import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const uploadVideo = (file, token) => {
  const formData = new FormData();
  formData.append("video", file);

  return API.post("/videos/upload", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchMyVideos = (token) => {
  return API.get("/videos/my", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
