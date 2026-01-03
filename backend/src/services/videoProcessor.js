export const analyzeVideo = async (onProgress) => {
  return new Promise((resolve) => {
    let progress = 0;

    const timer = setInterval(() => {
      progress += 20;
      onProgress(progress);

      if (progress >= 100) {
        clearInterval(timer);
        resolve(Math.random() > 0.5 ? "safe" : "flagged");
      }
    }, 1000);
  });
};
