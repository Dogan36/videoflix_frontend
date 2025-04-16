import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";
import styles from "./Home.module.css";
import HeroSection from "../components/HeroSection";
import MovieCard from "../components/MovieCard";
import { getData } from "../services/api";
import { useState, useEffect} from "react";

function Home() {
  const isMobile = window.innerWidth <= 768;
  const [newest, setNewest] = useState();
  const [recentlyWatched, setRecentlyWatched] = useState();
  const [finished, setFinished] = useState();
  const [categories, setCategories] = useState([]); // Kategorien erwarten wir als Array, in dem jedes Element ein Objekt mit { category, results, next, ... } ist
  const [activeMovie, setActiveMovie] = useState(null);
  const [featuredMovie, setFeaturedMovie] = useState(null);

  function updateActiveMovie(movie) {
    setActiveMovie(movie);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  useEffect(() => {
    async function loadMovies() {
      const res = await getData("movies/home/");
      console.log("Response:", res);
      if (res.ok) {
        setNewest(res.data.newest);
        setRecentlyWatched(res.data.recently_watched);
        setFinished(res.data.finished);
        setCategories(res.data.categories);
        if (res.data.newest && res.data.newest.length > 0) {
          setFeaturedMovie(res.data.newest[0]);
        } // Setze den ersten Film als aktiv
      } else {
        console.error("❌ Fehler beim Laden der Filme:", res.message);
      }
      //setLoading(false);
    }
    loadMovies();
  }, []); // movies is intentionally excluded from dependencies to avoid infinite re-renders

  useEffect(() => {
    console.log(categories);
   
  }, [categories]);

  return (
    <>
      <HomeHeader />
      <div className={styles.home}>
        {!isMobile && <HeroSection movie={activeMovie || featuredMovie} />}
        <div className={styles.moviesContent}>
          {/* Newest Movies */}
          { newest &&  newest.length > 0 && (
            <section className={styles.movieRow}>
              <h2 className={styles.movieRowTitle}>Newest Movies</h2>
              <div className={styles.movieRowPosters}>
                { newest.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onClick={() => updateActiveMovie(movie)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Recently Watched */}
          { recentlyWatched &&
             recentlyWatched.length > 0 && (
              <section className={styles.movieRow}>
                <h2 className={styles.movieRowTitle}>Continue Watching</h2>
                <div className={styles.movieRowPosters}>
                  { recentlyWatched.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onClick={() => updateActiveMovie(movie)}
                    />
                  ))}
                </div>
              </section>
            )}

          {/* Finished Movies */}
          { finished &&  finished.length > 0 && (
            <section className={styles.movieRow}>
              <h2 className={styles.movieRowTitle}>Watch Again</h2>
              <div className={styles.movieRowPosters}>
                { finished.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onClick={() => updateActiveMovie(movie)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Categories */}
          { categories &&
             categories.length > 0 &&
             categories.map(
              (catObj, index) =>
                catObj &&
                          catObj && catObj.movies.length > 0 && (
                  <section className={styles.movieRow} key={index}>
                    <h2 className={styles.movieRowTitle}>{catObj.category}</h2>
                    <div className={styles.movieRowPosters}>
                      {catObj.movies.map((movie) => (
                        <MovieCard
                          key={movie.id}
                          movie={movie}
                          onClick={() => updateActiveMovie(movie)}
                        />
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
