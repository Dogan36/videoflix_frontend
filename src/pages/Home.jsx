import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";
import styles from "./Home.module.css";
import HeroSection from "../components/HeroSection";
import MovieCard from "../components/MovieCard";
import { getData } from "../services/api";
import { useState, useEffect } from "react";

function Home() {
  const isMobile = window.innerWidth <= 768;
  const [movies, setMovies] = useState([]);
  const [activeMovie, setActiveMovie] = useState(null);
  const [featuredMovie, setFeaturedMovie] = useState(null);

  function updateActiveMovie(movie) {
    setActiveMovie(movie)
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  useEffect(() => {
    async function loadMovies() {
      const res = await getData("movies/home/");
      console.log("Response:", res);
      if (res.ok) {
        setMovies(res.data);
        console.log("Movies loaded:", res.data);
        if (res.data.newest && res.data.newest.length > 0) {
          setFeaturedMovie(res.data.newest[0]);
        } // Setze den ersten Film als aktiv
      } else {
        console.error("❌ Fehler beim Laden der Filme:", res.message);
      }
      //setLoading(false);
    }
    loadMovies();
  }, []);
  
 
  return (
    <>
      <HomeHeader />
      <div className={styles.home}>
        {(activeMovie || !isMobile) && (
          <HeroSection
            movie={activeMovie || featuredMovie}
            onClose={isMobile ? () => setActiveMovie(null) : null}
          />
        )}

        <div className={styles.moviesContent}>
          {/* Newest Movies */}
          {movies.newest && movies.newest.length > 0 && (
            <section className={styles.movieRow}>
              <h2 className={styles.movieRowTitle}>Newest Movies</h2>
              <div className={styles.movieRowPosters}>
                {movies.newest.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} onClick={() => updateActiveMovie(movie)} />
                ))}
              </div>
            </section>
          )}

          {/* Recently Watched */}
          {movies.recently_watched && movies.recently_watched.length > 0 && (
            <section className={styles.movieRow}>
              <h2 className={styles.movieRowTitle}>Recently Watched</h2>
              <div className={styles.movieRowPosters}>
                {movies.recently_watched.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} onClick={() => updateActiveMovie(movie)}  />
                ))}
              </div>
            </section>
          )}

          {/* Finished Movies */}
          {movies.finished && movies.finished.length > 0 && (
            <section className={styles.movieRow}>
              <h2 className={styles.movieRowTitle}>Finished Movies</h2>
              <div className={styles.movieRowPosters}>
                {movies.finished.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} onClick={() => updateActiveMovie(movie)}  />
                ))}
              </div>
            </section>
          )}

          {/* Categories */}
          {movies.categories &&
            movies.categories.length > 0 &&
            movies.categories.map(
              (catObj, index) =>
                catObj.movies &&
                catObj.movies.length > 0 && (
                  <section className={styles.movieRow} key={index}>
                    <h2 className={styles.movieRowTitle}>{catObj.category}</h2>
                    <div className={styles.movieRowPosters}>
                      {catObj.movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} onClick={() => updateActiveMovie(movie)}  />
                      ))}
                    </div>
                  </section>
                )
            )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
