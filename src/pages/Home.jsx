import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";
import styles from "./Home.module.css";
function Home() {
  return (
    <>
      <HomeHeader />
      <div className={styles.home}>
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
        </div>

        <div className={styles.moviesContent}>
          <div className={styles.movieRow}>
            <span className={styles.movieRowTitle}>Action</span>
            <div className={styles.movieRowPosters}>
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
            </div>
          </div>
          <div className={styles.movieRow}>
            <span className={styles.movieRowTitle}>Action</span>
            <div className={styles.movieRowPosters}>
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
            </div>
          </div>
          <div className={styles.movieRow}>
            <span className={styles.movieRowTitle}>Action</span>
            <div className={styles.movieRowPosters}>
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
            </div>
          </div>
          <div className={styles.movieRow}>
            <span className={styles.movieRowTitle}>Action</span>
            <div className={styles.movieRowPosters}>
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
            </div>
          </div>
          <div className={styles.movieRow}>
            <span className={styles.movieRowTitle}>Action</span>
            <div className={styles.movieRowPosters}>
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
            </div>
          </div>
          <div className={styles.movieRow}>
            <span className={styles.movieRowTitle}>Action</span>
            <div className={styles.movieRowPosters}>
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
            </div>
          </div>
          <div className={styles.movieRow}>
            <span className={styles.movieRowTitle}>Action</span>
            <div className={styles.movieRowPosters}>
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
            </div>
          </div>
          <div className={styles.movieRow}>
            <span className={styles.movieRowTitle}>Action</span>
            <div className={styles.movieRowPosters}>
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
            </div>
          </div>
          <div className={styles.movieRow}>
            <span className={styles.movieRowTitle}>Action</span>
            <div className={styles.movieRowPosters}>
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
              <img src="/img/Frame165.png" alt="poster" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
