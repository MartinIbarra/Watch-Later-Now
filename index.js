document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get("watchLaterVideos", (data) => {
    const videosContainer = document.getElementById("videos");
    if (data.watchLaterVideos && data.watchLaterVideos.length > 0) {
      data.watchLaterVideos.forEach((video) => {
        const videoItem = document.createElement("div");
        videoItem.className = "video-item";

        const thumbnail = document.createElement("img");
        thumbnail.src = video.snippet.thumbnails.default.url;
        thumbnail.className = "video-thumbnail";
        videoItem.appendChild(thumbnail);

        const title = document.createElement("div");
        title.textContent = video.snippet.title;
        title.className = "video-title";
        videoItem.appendChild(title);

        videosContainer.appendChild(videoItem);
      });
    } else {
      videosContainer.textContent = "No videos in your Watch Later list.";
    }
  });
});