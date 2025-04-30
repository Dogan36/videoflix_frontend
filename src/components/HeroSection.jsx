import styles from "./HeroSection.module.css";

/**
 * HeroSection component that displays a movie's title, description, and a play button.
 * It also plays a video or shows an image as the background.
 */
function HeroSection({ movie}) {

  /**
    * Function to handle the play button click event.
    * It redirects the user to the movie's watch page.
    */
  function playMovie(movie) {
    return () => {
      window.location.href = `/watch/${movie.id}`;
    };
  }
  
  return (
    <div className={styles.hero}>
      <div className={styles.videoContainer}>
      {movie?.trailer ? (
        <video
          key={movie.trailer}
          autoPlay
          loop
          muted
          playsInline
          className={styles.backgroundVideo}
        >
          <source src={movie.trailer} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : movie?.thumbnail ? (
        <img
          src={movie?.thumbnail}
          alt={movie.title}
          className={styles.backgroundVideo}
        />
      ) : null}
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
