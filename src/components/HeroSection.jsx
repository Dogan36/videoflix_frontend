import styles from "./HeroSection.module.css";

function HeroSection({ movie, onClose }) {
    if (!movie) return null;
  
    return (
        <div className={styles.hero}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className={styles.backgroundVideo}
        >
          <source src="/videos/escape.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Escape</h1>
          <p className={styles.heroDescription}>
            Watch your favorite movies and TV shows online.
          </p>
          <div className={styles.heroButtons}>
            <button className={styles.heroButton}>Play</button>
            <button className={styles.heroButton}>More Info</button>
          </div>
        </div>
        {onClose && (
        <button onClick={onClose} className="closeButton">×</button>
      )}
    </div>
      
    );
  }
  
  export default HeroSection;