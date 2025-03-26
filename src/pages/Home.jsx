import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";
import styles from "./Home.module.css";
import HeroSection from "../components/HeroSection";
import MovieCard from "../components/MovieCard";
import { useState } from "react";
const movies = [
  {
    id: 1,
    title: "Escape",
    description: "Watch your favorite movies and TV shows online.",
    video: "/videos/escape.mp4",
    thumbnail: "/img/Frame165.png",
  },
  {
    id: 2,
    title: "Escape",
    description: "Watch your favorite movies and TV shows online.",
    video: "/videos/escape.mp4",
    thumbnail: "/img/Frame165.png",
  },
  {
    id: 3,
    title: "Escape",
    description: "Watch your favorite movies and TV shows online.",
    video: "/videos/escape.mp4",
    thumbnail: "/img/Frame165.png",
  },
  {
    id: 4,
    title: "Escape",
    description: "Watch your favorite movies and TV shows online.",
    video: "/videos/escape.mp4",
    thumbnail: "/img/Frame165.png",
  },
  {
    id: 5,
    title: "Escape",
    description: "Watch your favorite movies and TV shows online.",
    video: "/videos/escape.mp4",
    thumbnail: "/img/Frame165.png",
  },
  {
    id: 6,
    title: "Escape",
    description: "Watch your favorite movies and TV shows online.",
    video: "/videos/escape.mp4",
    thumbnail: "/img/Frame165.png",
  },
];
function Home() {
  const isMobile = window.innerWidth <= 768;
  const [activeMovie, setActiveMovie] = useState(null);
  const featuredMovie = {
    title: "Escape",
    description: "Watch your favorite movies and TV shows online.",
    video: "/videos/escape.mp4",
  };
  return (
    <>
      <HomeHeader />
      <div className={styles.home}>
      {(activeMovie || !isMobile) && (
        <HeroSection movie={activeMovie || featuredMovie} onClose={isMobile ? () => setActiveMovie(null) : null} />
      )}


        <div className={styles.moviesContent}>
          <div className={styles.movieRow}>
            <span className={styles.movieRowTitle}>Action</span>
            <div className={styles.movieRowPosters}>
            {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} onClick={setActiveMovie} />
        ))}
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
