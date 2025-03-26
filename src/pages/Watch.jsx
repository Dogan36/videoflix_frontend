import VideoPlayer from "../components/VideoPlayer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Watch.module.css";
import backArrow from "@/assets/arrow_back.svg";
import logo from "@/assets/logo.svg";
function Watch() {
  const [showHeader, setShowHeader] = useState(true);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };
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
        videoUrl="http://localhost:5173/videos/escape.mp4"
        title="Majestic whales"
        showUI={showHeader}
      />
    </div>
  );
}

export default Watch;
