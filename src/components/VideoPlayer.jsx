// VideoPlayer.jsx
import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import styles from "./VideoPlayer.module.css";

export default function VideoPlayer({
  videoUrl,
  title,
  showUI,
  currentResolution,
  onResolutionChange,
  availableResolutions = [120, 360, 720, 1080],
  autostart = true,    
}) {
  const playerRef = useRef();
  const wrapperRef = useRef();

  // Für das Merken der Position und des Play‑Status
  const savedPositionRef = useRef(0);
  const savedPlayingRef = useRef(false);
  const [pendingSeek, setPendingSeek] = useState(false);

  // Player‑States
  const [playing, setPlaying] = useState(autostart);
  const [muted, setMuted] = useState(true);

  const [volume, setVolume] = useState(0);
  const prevVolumeRef = useRef(volume);

  // Slider‑Anzeige beim Mute‑Hover
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  // Progress & Duration
  const [playedFraction, setPlayedFraction] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);

  // Fullscreen
  const [isFullscreen, setIsFullscreen] = useState(false);

  // --------------------
  //  Event‑Handler
  // --------------------

  const togglePlay = () => setPlaying(p => !p);
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

  const handleVolumeChange = e => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (v > 0) setMuted(false);
    else setMuted(true);
  };

  const handleProgress = state => {
    setPlayedFraction(state.played);
    setPlayedSeconds(state.playedSeconds);
  };

  const handleDuration = dur => {
    setDuration(dur);
  };

  const handleReady = () => {
    // Wenn wir gerade nach einer Auflösungs‑Änderung seeken müssen:
    if (pendingSeek && playerRef.current) {
      playerRef.current.seekTo(savedPositionRef.current, "seconds");
      setPlaying(savedPlayingRef.current);
      setPendingSeek(false);
    }
  };

  const seekToFraction = e => {
    const frac = parseFloat(e.target.value);
    playerRef.current.seekTo(frac, "fraction");
    setPlayedFraction(frac);
  };

  // Auflösungs‑Wechsel: erst Zeit & Status merken, dann parent callback aufrufen
  const handleResolutionChangeLocal = e => {
    const newRes = parseInt(e.target.value, 10);
    if (playerRef.current) {
      savedPositionRef.current = playerRef.current.getCurrentTime();
      savedPlayingRef.current = playing;
    }
    onResolutionChange(newRes);
    setPendingSeek(true);
  };

  // Fullscreen‑Toggle
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
  const formatTime = secs => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className={styles.playerWrapper} ref={wrapperRef}>
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
            {availableResolutions.map(res => (
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