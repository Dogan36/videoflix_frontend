// VideoPlayer.jsx
import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import styles from "./VideoPlayer.module.css";
import { postDataWJSON } from "@/services/api";

/**
 * VideoPlayer component that handles the video playback and controls.
 * It includes features like play/pause, mute/unmute, volume control,
 * progress tracking, resolution change, and fullscreen toggle.
 * It also handles the resume prompt if the user has previously watched the video.
 */
export default function VideoPlayer({
  videoUrl,
  title,
  showUI,
  currentResolution,
  onResolutionChange,
  availableResolutions = [120, 360, 720, 1080],
  autostart = true,
  savedProgress,
  movieId,
  finished
}) {
  const playerRef = useRef();
  const wrapperRef = useRef();

  const savedPositionRef = useRef(0);
  const savedPlayingRef = useRef(false);
  const [pendingSeek, setPendingSeek] = useState(false);

  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const [initialSeek, setInitialSeek] = useState(0);

  const [playing, setPlaying] = useState(autostart);
  const [muted, setMuted] = useState(true);

  const [volume, setVolume] = useState(0);
  const prevVolumeRef = useRef(volume);

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const [playedFraction, setPlayedFraction] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const togglePlay = () => setPlaying((p) => !p);
  const toggleMute = () => {
    if (muted) {
      setMuted(false);
      setVolume(prevVolumeRef.current || 0.5);
    } else {
      prevVolumeRef.current = volume;
      setVolume(0);
      setMuted(true);
    }
  };

  const handleVolumeChange = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (v > 0) setMuted(false);
    else setMuted(true);
  };

  const handleProgress = (state) => {
    setPlayedFraction(state.played);
    setPlayedSeconds(state.playedSeconds);
  };

  const handleDuration = (dur) => {
    setDuration(dur);
  };

  const handleReady = () => {
    if (pendingSeek && playerRef.current) {
      playerRef.current.seekTo(savedPositionRef.current, "seconds");
      setPlaying(savedPlayingRef.current);
      setPendingSeek(false);
    }
  };

  const seekToFraction = (e) => {
    const frac = parseFloat(e.target.value);
    playerRef.current.seekTo(frac, "fraction");
    setPlayedFraction(frac);
  };

  const handleResolutionChangeLocal = (e) => {
    const newRes = parseInt(e.target.value, 10);
    if (playerRef.current) {
      savedPositionRef.current = playerRef.current.getCurrentTime();
      savedPlayingRef.current = playing;
    }
    onResolutionChange(newRes);
    setPendingSeek(true);
  };


  const toggleFullscreen = () => {
    if (!isFullscreen) wrapperRef.current.requestFullscreen?.();
    else document.exitFullscreen?.();
  };
  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  // Helper zum Formatieren von Zeit
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (savedProgress > 3 && !finished) {
      setPlaying(false);
      setInitialSeek(savedProgress);
      setShowResumePrompt(true);
    } else {
      // kein Resume nötig
      playerRef.current.seekTo(0);
    }
  }, [savedProgress, finished]);

  useEffect(() => {
    let interval;
    if (playerRef.current) {
      interval = setInterval(async () => {
        const current = Math.floor(playerRef.current.getCurrentTime());
        const atEnd = current +1 >= duration
        await postDataWJSON('movies/progress/update/', {
          movie_id: movieId,
          progressInSeconds: current,
          finished: atEnd
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [movieId, duration]);

  return (
    <div className={styles.playerWrapper} ref={wrapperRef}>
      {showResumePrompt && (
        <div className={styles.resumeOverlay}>
          <p>
            Would you like to resume at {formatTime(initialSeek)} or start over?
          </p>
          <button
            onClick={() => {
              setShowResumePrompt(false);
              playerRef.current.seekTo(initialSeek, "seconds");
              setPlaying(true);
            }}
          >
            Resume
          </button>
          <button
            onClick={() => {
              setShowResumePrompt(false);
              playerRef.current.seekTo(0, "seconds");
              setPlaying(true);
            }}
          >
            Restart
          </button>
        </div>
      )}
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        playing={playing}
        muted={muted}
        width="100%"
        height="100%"
        controls={false}
        onProgress={handleProgress}
        onDuration={handleDuration}
        onReady={handleReady}
      />

      {/* Titel */}
      <div className={`${styles.videoTitle} ${!showUI ? styles.hidden : ""}`}>
        {title}
      </div>

      {/* Eigene Control‑Bar */}
      {showUI && (
        <div className={styles.controlBar}>
          {/* Play/Pause */}
          <button onClick={togglePlay} className={styles.controlButton}>
            {playing ? "❚❚" : "▶"}
          </button>

          {/* Mute/Unmute */}
          <div
            className={styles.volumeControl}
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
          >
            <button onClick={toggleMute} className={styles.controlButton}>
              {muted || volume === 0 ? "🔇" : "🔊"}
            </button>
            {showVolumeSlider && (
              <input
                type="range"
                className={styles.volumeSlider}
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
              />
            )}
          </div>

          {/* Progress‑Slider (Bruchteil 0…1) */}
          <input
            type="range"
            className={styles.progress}
            min={0}
            max={1}
            step={0.001}
            value={playedFraction}
            onChange={seekToFraction}
          />

          {/* Zeit-Anzeige */}
          <span className={styles.timeDisplay}>
            {formatTime(playedSeconds)} / {formatTime(duration)}
          </span>

          {/* Resolution Dropdown */}
          <select
            className={styles.resolutionSelect}
            value={currentResolution}
            onChange={handleResolutionChangeLocal}
          >
            {availableResolutions.map((res) => (
              <option key={res} value={res}>
                {res}p
              </option>
            ))}
          </select>

          {/* Fullscreen */}
          <button onClick={toggleFullscreen} className={styles.controlButton}>
            {isFullscreen ? "🡼" : "⛶"}
          </button>
        </div>
      )}
    </div>
  );
}
