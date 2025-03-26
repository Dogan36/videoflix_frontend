import ReactPlayer from "react-player";
import styles from "./VideoPlayer.module.css";

function VideoPlayer({ videoUrl, title, showUI }) {
  return (
    <div className={styles.playerWrapper}>
      <ReactPlayer
        url={videoUrl}
        className={styles.reactPlayer}
        width="100%"
        height="100%"
        controls
        

      />

      {/* Titel über den Controls */}
      <div className={`${styles.videoTitle} ${!showUI ? styles.hidden : ""}`}>
        {title}
      </div>
    </div>
  );
}

export default VideoPlayer;
