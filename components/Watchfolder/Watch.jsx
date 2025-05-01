"use client";
import React, { useEffect, useRef, useState } from "react";
// import VideoPlayer from "react-video-js-player";
import styles from "./watch.module.css";

const sidebarVideos = [
  {
    title: "Testimonial 1",
    channel: "EvHomes",
    time: "2 weeks ago",
    description: "This is description for Testimonial 1",
    url: "https://www.w3schools.com/html/movie.mp4",
    thumbnail: "images/Building1.jpg",
  },
  {
    title: "Testimonial 2",
    channel: "EvHomes",
    time: "1 week ago",
    description: "This is description for Testimonial 2",
    url: "https://www.w3schools.com/html/movie.mp4",
    thumbnail: "images/Building2.jpg",
  },
  {
    title: "Testimonial 3",
    channel: "EvHomes ",
    time: "3 weeks ago",
    description: "This is description for Testimonial 3",
    url: "https://www.w3schools.com/html/movie.mp4",
    thumbnail: "images/buildingforDescription.jpg",
  },
  {
    title: "Testimonial 4",
    channel: "EvHomes",
    time: "5 weeks ago",
    description: "This is description for Testimonial 4",
    url: "https://www.w3schools.com/html/movie.mp4",
    thumbnail: "images/Gym.jpg",
  },
  {
    title: "Testimonial 5",
    channel: "EvHomes",
    time: "1 year ago",
    description: "This is description for Testimonial 5",
    url: "https://www.w3schools.com/html/movie.mp4",
    thumbnail: "images/PlayArea.jpg",
  },
  {
    title: "Testimonial 6",
    channel: "EvHomes",
    time: "1 year ago",
    description: "This is description for Testimonial 6",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "images/swimming.jpg",
  },
];

const Watch = () => {
  const [selectedVideo, setSelectedVideo] = useState(sidebarVideos[0]);
  const videoRef = useRef(null);

  const handleVideoHover = (e) => {
    const video = e.currentTarget.querySelector("video");
    if (video) {
      video.currentTime = 0;
      video.play();
    }
  };

  const handleVideoLeave = (e) => {
    const video = e.currentTarget.querySelector("video");
    if (video) {
      video.pause();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.videoPlayer}>
          <div className={styles.videoBox}>
            <video
              ref={videoRef}
              src={selectedVideo.url}
              width="100%"
              height="400"
              controls
            />
          </div>
          <h2 className={styles.title}>{selectedVideo.title}</h2>
          <div className={styles.videoDetails}>
            <span>{selectedVideo.time}</span>
          </div>
          <div className={styles.uploaderInfo}>
            <div className={styles.videoAvatar}></div>
            <div>
              <h3>{selectedVideo.channel}</h3>
            </div>
          </div>

          <div className={styles.description}>
            <h4>Description</h4>
            <p>{selectedVideo.description}</p>
          </div>
        </div>
      </div>

      <div className={styles.sidebar}>
        <h4>Videos</h4>
        {sidebarVideos.map((video, idx) => (
          <div
            key={idx}
            className={styles.recommendation}
            onClick={() => setSelectedVideo(video)}
            style={{
              cursor: "pointer",
              borderRadius:10,
              backgroundColor:
                selectedVideo.title === video.title ? "#2d2d2d" : "transparent",
            }}
          >
            <div
              className={styles.sideVedios}
              onMouseEnter={handleVideoHover}
              onMouseLeave={handleVideoLeave}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className={styles.thumbnail}
              />
              <video
                src={video.url}
                className={styles.sidebarVideo}
                loop
                muted
                preload="metadata"
              />
            </div>
            <div className={styles.sidebarVideoInfo}>
              <div className={styles.vidTitle}>{video.title}</div>
              <div className={styles.vidChannel}>{video.channel}</div>
              <div className={styles.vidStats}>{video.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watch;
