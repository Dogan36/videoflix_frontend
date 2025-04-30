import React, { useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import { getData } from "../services/api";
import styles from "./Watch.module.css";
import backArrow from "@/assets/arrow_back.svg";
import logo from "@/assets/logo.svg";
import { API_BASE_URL } from "@/config";

/**
 * Watch Component
 * Renders the video player for a specific movie.
 * Uses URL parameters to fetch the movie data.
 *  
 * URL: /watch/:movieId
 */

export default function Watch() {
  const navigate = useNavigate();
  const movieId = useParams().movieId

  const [showHeader, setShowHeader] = useState(true);
  const [movie, setMovie] = useState(null);
  const [videoResolution, setVideoResolution] = useState(getVideoResolution());
  const [videoUrl, setVideoUrl] = useState("");
  
  const handleBack = React.useCallback(() => {
    navigate("/");
  }, [navigate]);

  function getVideoResolution() {
    const w = window.innerWidth;
    if (w <= 480) return 120;
    if (w <= 720) return 360;
    if (w <= 1080) return 720;
    return 1080;
  }

  // a) JSON‑Meta laden
  useEffect(() => {
    async function fetchMeta() {
      const { ok, data } = await getData(`movies/${movieId}/`);
      if (ok) setMovie(data);
      else console.error("Meta‑Error:", data?.message);
    }
    fetchMeta();
  }, [movieId]);

  // b) Stream‑URL setzen
  useEffect(() => {
    if (!movie) return;
    const url = `${API_BASE_URL}movies/${movieId}/stream/?resolution=${videoResolution}`;
    setVideoUrl(url);
  }, [movie, videoResolution, movieId]);

  // Escape‑Key
  useEffect(() => {
    const onKey = e => e.key === "Escape" && handleBack();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleBack]);

  // Header autohide
  useEffect(() => {
    let timeout;
    const onMove = () => {
      setShowHeader(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowHeader(false), 1000);
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      clearTimeout(timeout);
    };
  }, []);

  if (!movie) return <div className={styles.loader}>Loading...</div>;

  return (
    <div className={styles.videoWrapper}>
      <div className={`${styles.header} ${!showHeader ? styles.hidden : ""}`}>
        <img
          src={backArrow}
          alt="Zurück"
          className={styles.backArrow}
          onClick={handleBack}
        />
        <div className={styles.title}>{movie.title}</div>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>

      <VideoPlayer
        movieId={movieId}
        videoUrl={videoUrl}
        showUI={showHeader}
        currentResolution={videoResolution}
        onResolutionChange={setVideoResolution}
        availableResolutions={[120, 360, 720, 1080]}
        savedProgress={movie.progressInSeconds}
        finished={movie.finished}
      />
    </div>
  );
}