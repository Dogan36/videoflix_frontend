import styles from "./HeroSection.module.css";

function HeroSection({ movie}) {
  function playMovie(movie) {
    return () => {
      window.location.href = `/watch/${movie.id}`;
    };
  }
  if (!movie) {
    return null; // Return null if no movie is provided
  }

  return (
    <div className={styles.hero}>
      <div className={styles.videoContainer}>
      <video key={movie.trailer} autoPlay loop muted playsInline className={styles.backgroundVideo}>
        {movie?.trailer && <source src={movie.trailer} type="video/mp4" />}
        Your browser does not support the video tag.
      </video>
      </div>
      
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>{movie?.title}</h1>
        <p className={styles.heroDescription}>{movie?.description}</p>
        {movie && (
          <div className={styles.heroButtons}>
            <button onClick={playMovie(movie)} className={styles.heroButton}>
              Play
            </button>
          </div>
        )}
      </div>
     
    </div>
  );
}

export default HeroSection;
