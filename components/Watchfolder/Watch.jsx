"use client";
import React, { useEffect, useRef, useState } from "react";
// import VideoPlayer from "react-video-js-player";
import {
  MdFullscreen,
  MdOutlineRectangle,
  MdFullscreenExit,
} from "react-icons/md";
import { CgMiniPlayer } from "react-icons/cg";
import {
  IoMdVolumeOff,
  IoMdVolumeLow,
  IoMdVolumeHigh,
  IoMdPlay,
  IoMdPause,
} from "react-icons/io";
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const containerRef = useRef(null);

  const handleToggleFullscreen = () => {
    const elem = containerRef.current;

    if (!document.fullscreenElement) {
      elem.requestFullscreen().then(() => {
        setIsFullScreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullScreen(false);
      });
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleMetadata = () => setDuration(video.duration);
      video.addEventListener("loadedmetadata", handleMetadata);
      return () => {
        video.removeEventListener("loadedmetadata", handleMetadata);
      };
    }
  }, [selectedVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleEnded = () => setIsPlaying(false);
      video.addEventListener("ended", handleEnded);
      return () => {
        video.removeEventListener("ended", handleEnded);
      };
    }
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    const video = videoRef.current;
    video.volume = newVolume;
    video.muted = newVolume === 0;
    setIsMuted(newVolume === 0);
    setVolume(newVolume);
  };

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
          <div className={styles.videoBox} ref={containerRef}>
            <video
              ref={videoRef}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              src={selectedVideo.url}
              width="100%"
              height="400"
              preload="metadata"
              // controls
            />

            <div className={styles.controls}>
              <div className={styles.progressContainer}>
                <input
                  type="range"
                  min="0"
                  max={duration}
                  step="any"
                  value={currentTime}
                  onChange={(e) => {
                    const newTime = parseFloat(e.target.value);
                    videoRef.current.currentTime = newTime;
                    setCurrentTime(newTime);
                  }}
                  className={styles.progressBar}
                />
              </div>
              <div className={styles.belowControls}>
                <div className={styles.leftControls}>
                  <button
                    className={styles.playpausebtn}
                    onClick={togglePlayPause}
                  >
                    {!isPlaying ? (
                      <IoMdPlay size={24} />
                    ) : (
                      <IoMdPause size={24} />
                    )}
                  </button>

                  <button className={styles.volumebtn} onClick={toggleMute}>
                    {isMuted || volume === 0 ? (
                      <IoMdVolumeOff size={24} />
                    ) : volume < 0.5 ? (
                      <IoMdVolumeLow size={24} />
                    ) : (
                      <IoMdVolumeHigh size={24} />
                    )}
                  </button>

                  <input
                    className={styles.volumeslider}
                    type="range"
                    min="0"
                    max="1"
                    step="any"
                    value={volume}
                    onChange={handleVolumeChange}
                  />

                  <div className={styles.durationcontainer}>
                    <div className={styles.currenttime}>
                      {formatTime(currentTime)}
                    </div>
                    /
                    <div className={styles.totaltime}>
                      {formatTime(duration)}
                    </div>
                  </div>
                </div>
                <div className={styles.rightControls}>
                  <button className={styles.miniPlayerBtn}>
                  <CgMiniPlayer size={24} />
                  </button>
                  <button className={styles.theatreBtn}>
                    <MdOutlineRectangle size={24} />
                  </button>
                  <button className={styles.fullScreenBtn}>
                    {isFullScreen ? (
                      <MdFullscreenExit
                        size={27}
                        onClick={handleToggleFullscreen}
                      />
                    ) : (
                      <MdFullscreen
                        size={27}
                        onClick={handleToggleFullscreen}
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>
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
              borderRadius: 10,
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
