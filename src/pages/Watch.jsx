import VideoPlayer from "../components/VideoPlayer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Watch.module.css";
import backArrow from "@/assets/arrow_back.svg";
import logo from "@/assets/logo.svg";
import { getData } from "../services/api";
function Watch() {
  const [showHeader, setShowHeader] = useState(true);
  const navigate = useNavigate();
  const movieId = window.location.pathname.split("/").pop();
  const [movie, setMovie] = useState({});
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoResolution, setVideoResolution] = useState(null);

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    const resolution = getVideoResolution();
    setVideoResolution(resolution);

    const getVideoSourceForUser = (movie) => {
      const resolution = getVideoResolution();
      console.log("Video resolution:", resolution);
      switch (resolution) {
        case 120:
          return movie.video_120p;
        case 360:
          return movie.video_360p;
        case 720:
          return movie.video_720p;
        case 1080:
          return movie.video_1080p;
        default:
          return movie.video_360p; // Fallback
      }
    };

    const videoSource = getVideoSourceForUser(movie);
    setVideoUrl(videoSource);
  }, [movie]); // Dieser Effekt läuft, wenn sich 'movie' ändert
  
  useEffect(() => {
    console.log("Video URL:", videoUrl);
    console.log("Video Resolution:", videoResolution);
  }, [videoUrl, videoResolution]); // Dieser Effekt läuft, wenn sich 'videoUrl' ändert

  function getVideoResolution() {
    const width = window.innerWidth; // oder window.screen.width
    if (width <= 480) {
      return 120; // sehr kleine Geräte
    } else if (width <= 720) {
      return 360; // z.B. Smartphones in Hochformat
    } else if (width <= 1080) {
      return 720; // Tablets oder kleinere Desktops
    } else {
      return 1080; // Große Desktops
    }
  }


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleBack();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  useEffect(() => {
    async function fetchMovie() {
      const res = await getData(`movies/${movieId}/`);
      console.log("Response:", res);
      if (res.ok) {
        setMovie(res.data); // Setze den Film in den State
      } else {
        console.error("❌ Fehler beim Laden des Films:", res.message);
      }
    }
    fetchMovie();
  }
  , [movieId]); // Fetch movie data when the component mounts or when movieId changes
  

  useEffect(() => {
    let timeout;
    const handleMouseMove = () => {
      setShowHeader(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowHeader(false), 1000);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className={styles.videoWrapper}>
      <div className={`${styles.header} ${!showHeader ? styles.hidden : ""}`}>
        <img
          src={backArrow}
          alt="Back"
          className={styles.backArrow}
          onClick={handleBack}
        />
        <img src={logo} alt="" />
      </div>
      <VideoPlayer
        videoUrl={videoUrl}
        title={movie.title}
        showUI={showHeader}
        autostart={true}
      />
    </div>
  );
}

export default Watch;
