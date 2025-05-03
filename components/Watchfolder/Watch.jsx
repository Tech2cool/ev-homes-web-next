"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  MdFullscreen,
  MdFullscreenExit,
  MdOutlineForward10,
  MdOutlineReplay10,
} from "react-icons/md";
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
  const [showControls, setShowControls] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

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

  const rewind10Seconds = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(
        0,
        videoRef.current.currentTime - 10
      );
    }
  };

  const forward10Seconds = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        duration,
        videoRef.current.currentTime + 10
      );
    }
  };

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
    if (video.muted || video.volume === 0) {
      video.muted = false;
      const restoredVolume = volume === 0 ? 0.5 : volume;
      video.volume = restoredVolume;
      setVolume(restoredVolume);
      setIsMuted(false);
    } else {
      video.muted = true;
      video.volume = 0;
      setVolume(0);
      setIsMuted(true);
    }
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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      const video = videoRef.current;
      if (!video) return;

      switch (e.key.toLowerCase()) {
        case " ":
          e.preventDefault();
          togglePlayPause();
          break;
        case "m":
          toggleMute();
          break;
        case "arrowleft":
          rewind10Seconds();
          break;
        case "arrowright":
          forward10Seconds();
          break;
        case "arrowup":
          e.preventDefault();
          setVolume((prev) => {
            const newVol = Math.min(1, prev + 0.1);
            video.volume = newVol;
            video.muted = newVol === 0;
            setIsMuted(newVol === 0);
            return newVol;
          });
          break;
        case "arrowdown":
          e.preventDefault();
          setVolume((prev) => {
            const newVol = Math.max(0, prev - 0.1);
            video.volume = newVol;
            video.muted = newVol === 0;
            setIsMuted(newVol === 0);
            return newVol;
          });
          break;
        case "f":
          handleToggleFullscreen();
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    togglePlayPause,
    toggleMute,
    rewind10Seconds,
    forward10Seconds,
    handleToggleFullscreen,
    setVolume,
    videoRef,
    isFullScreen,
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.videoPlayer}>
          <div
            className={`${styles.videoBox} ${
              showControls ? styles.showControls : ""
            }`}
            ref={containerRef}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
            onTouchStart={() => setShowControls(true)}
          >
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

            <div className={styles.centerControls}>
              <button className={styles.rewindbtn} onClick={rewind10Seconds}>
                <MdOutlineReplay10 size={24} />
              </button>

              <button className={styles.playpausebtn} onClick={togglePlayPause}>
                {!isPlaying ? <IoMdPlay size={24} /> : <IoMdPause size={24} />}
              </button>

              <button className={styles.forwardbtn} onClick={forward10Seconds}>
                <MdOutlineForward10 size={24} />
              </button>
            </div>

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
                  style={{
                    background: `linear-gradient(to right, red 0%, red ${
                      (currentTime / duration) * 100
                    }%, #ccc ${(currentTime / duration) * 100}%, #ccc 100%)`,
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
                    <div>{formatTime(currentTime)}</div>/
                    <div>{formatTime(duration)}</div>
                  </div>
                </div>
                <div className={styles.rightControls}>
                  <select
                    className={styles.speedControl}
                    value={playbackRate}
                    onChange={(e) => setPlaybackRate(Number(e.target.value))}
                  >
                    <option value={0.5}>0.5x</option>
                    <option value={1}>1x</option>
                    <option value={1.5}>1.5x</option>
                    <option value={2}>2x</option>
                  </select>
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
