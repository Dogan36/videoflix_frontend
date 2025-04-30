import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";
import styles from "./Home.module.css";
import HeroSection from "../components/HeroSection";
import MovieCard from "../components/MovieCard";
import { getData } from "../services/api";
import { useState, useEffect, useRef, useCallback } from "react";
import { getColumnCountForWindow } from "@/utils/columnUtils";

/**
 * Home Component
 *
 * Displays the homepage for logged-in users.
 * Sections: Newest Movies, Continue Watching, Watch Again, and dynamic Categories.
 * Implements lazy loading and pagination with IntersectionObserver.
 */
function Home() {
  const isMobile = window.innerWidth <= 768;

  const newestRef = useRef();
  const recentRef = useRef();
  const finishedRef = useRef();
  const categoryRefs = useRef({}); // { [category_id]: element }
  const containerRef = useRef();

  const [newest, setNewest] = useState([]);
  const [newestPage, setNewestPage] = useState(2);
  const [hasMoreNewest, setHasMoreNewest] = useState(true);
  const [isLoadingNewest, setIsLoadingNewest] = useState(false);

  // --- State für Recently Watched ---
  const [recentlyWatched, setRecentlyWatched] = useState([]);
  const [recentlyWatchedPage, setRecentlyWatchedPage] = useState(2);
  const [hasMoreRecentlyWatched, setHasMoreRecentlyWatched] = useState(true);
  const [isLoadingRecentlyWatched, setIsLoadingRecentlyWatched] =
    useState(false);

  // --- State für Finished Movies ---
  const [finished, setFinished] = useState([]);
  const [finishedPage, setFinishedPage] = useState(2);
  const [hasMoreFinished, setHasMoreFinished] = useState(true);
  const [isLoadingFinished, setIsLoadingFinished] = useState(false);

  // --- State für Kategorien mit Paging ---
  const [categories, setCategories] = useState([]); // Array von { category, category_id, movies }
  const [categoryPages, setCategoryPages] = useState({}); // { [id]: nextPage }
  const [hasMoreCategory, setHasMoreCategory] = useState({}); // { [id]: boolean }
  const [isLoadingCategory, setIsLoadingCategory] = useState({}); // { [id]: boolean } // Kategorien erwarten wir als Array, in dem jedes Element ein Objekt mit { category, results, next, ... } ist

  const [activeMovie, setActiveMovie] = useState(null);
  const [featuredMovie, setFeaturedMovie] = useState(null);

   /**
   * Resets the active movie selection, used when header logo is clicked
   */
  const resetActiveMovie = () => setActiveMovie(null);

  /**
   * Sets the active movie and scrolls to top
   */
  function updateActiveMovie(movie) {
    setActiveMovie(movie);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  /**
   * Fetches initial movie data for homepage sections and configures pagination state
   */
  useEffect(() => {
    async function loadMovies() {
      const columns = getColumnCountForWindow();
      try {
        const res = await getData("movies/home/", { page_size: columns });
        if (res.ok) {
          // Newest
          setNewest(res.data.newest.results || []);
          setNewestPage(2);
          setHasMoreNewest(res.data.newest.next ? true : false);

          // Recently Watched
          setRecentlyWatched(res.data.recently_watched.results || []);
          setRecentlyWatchedPage(2);
          setHasMoreRecentlyWatched(
            res.data.recently_watched.next ? true : false
          );

          // Finished
          setFinished(res.data.finished.results || []);
          setFinishedPage(2);
          setHasMoreFinished(res.data.finished.next ? true : false);

          // Kategorien initial
          const cats = (res.data.categories || []).map((cat) => ({
            category: cat.category,
            category_id: cat.category_id,
            movies: cat.results || [], // ← hier auf `results` zugreifen
            next: cat.next, // optional abspeichern, um zu prüfen
          }));
          setCategories(cats);

          // Paging-States für Kategorien initialisieren
          const pages = {};
          const more = {};
          const load = {};
          cats.forEach((cat) => {
            pages[cat.category_id] = 2;
            more[cat.category_id] = Boolean(cat.next); // ← next prüfen, nicht cat.next auf truthy
            load[cat.category_id] = false;
          });
          setCategoryPages(pages);
          setHasMoreCategory(more);
          setIsLoadingCategory(load);

          // Featured
          if (res.data.newest.results && res.data.newest.results.length > 0) {
            setFeaturedMovie(res.data.newest.results[0]);
          }
        } else {
          console.error(
            "❌ Fehler beim Laden der Filme:",
            res.status,
            res.message
          );
        }
      } catch (err) {
        console.error("❌ Netzwerkfehler beim Laden:", err);
      }
    }
    loadMovies();
  }, []);

  const loadMoreNewest = useCallback(async () => {
    if (!hasMoreNewest || isLoadingNewest) return;
    setIsLoadingNewest(true);
    const columns = getColumnCountForWindow();
    try {
      const res = await getData("movies/load-more/", {
        section: "newest",
        page: newestPage,
        page_size: columns,
      });
      if (res.ok) {
        setNewest((prev) => [...prev, ...res.data.results]);
        if (res.data.next) setNewestPage((prev) => prev + 1);
        else setHasMoreNewest(false);
      } else console.error("LoadMore Newest error:", res.status);
    } catch (err) {
      console.error("LoadMore Newest network error:", err);
    } finally {
      setIsLoadingNewest(false);
    }
  }, [hasMoreNewest, isLoadingNewest, newestPage]);

  const loadMoreRecentlyWatched = useCallback(async () => {
    if (!hasMoreRecentlyWatched || isLoadingRecentlyWatched) return;
    setIsLoadingRecentlyWatched(true);
    const columns = getColumnCountForWindow();
    try {
      const res = await getData("movies/load-more/", {
        section: "recently_watched",
        page: recentlyWatchedPage,
        page_size: columns,
      });
      if (res.ok) {
        setRecentlyWatched((prev) => [...prev, ...res.data.results]);
        if (res.data.next) setRecentlyWatchedPage((prev) => prev + 1);
        else setHasMoreRecentlyWatched(false);
      } else console.error("LoadMore RW error:", res.status);
    } catch (err) {
      console.error("LoadMore RW network error:", err);
    } finally {
      setIsLoadingRecentlyWatched(false);
    }
  }, [hasMoreRecentlyWatched, isLoadingRecentlyWatched, recentlyWatchedPage]);

  const loadMoreFinished = useCallback(async () => {
    if (!hasMoreFinished || isLoadingFinished) return;
    setIsLoadingFinished(true);
    const columns = getColumnCountForWindow();
    try {
      const res = await getData("movies/load-more/", {
        section: "finished",
        page: finishedPage,
        page_size: columns,
      });
      if (res.ok) {
        setFinished((prev) => [...prev, ...res.data.results]);
        if (res.data.next) setFinishedPage((prev) => prev + 1);
        else setHasMoreFinished(false);
      } else console.error("LoadMore Finished error:", res.status);
    } catch (err) {
      console.error("LoadMore Finished network error:", err);
    } finally {
      setIsLoadingFinished(false);
    }
  }, [hasMoreFinished, isLoadingFinished, finishedPage]);

  const loadMoreCategory = useCallback(
    async (category_id) => {
      if (!hasMoreCategory[category_id] || isLoadingCategory[category_id])
        return;
      setIsLoadingCategory((prev) => ({ ...prev, [category_id]: true }));
      const columns = getColumnCountForWindow();
      try {
        const res = await getData("movies/load-more/", {
          section: "category",
          category_id,
          page: categoryPages[category_id],
          page_size: columns,
        });
        if (res.ok) {
          setCategories((prevCats) =>
            prevCats.map((cat) =>
              cat.category_id === category_id
                ? { ...cat, movies: [...cat.movies, ...res.data.results] }
                : cat
            )
          );
          if (res.data.next)
            setCategoryPages((prev) => ({
              ...prev,
              [category_id]: prev[category_id] + 1,
            }));
          else
            setHasMoreCategory((prev) => ({ ...prev, [category_id]: false }));
        } else
          console.error(`LoadMore Category ${category_id} error:`, res.status);
      } catch (err) {
        console.error(`LoadMore Category ${category_id} network error:`, err);
      } finally {
        setIsLoadingCategory((prev) => ({ ...prev, [category_id]: false }));
      }
    },
    [hasMoreCategory, isLoadingCategory, categoryPages]
  );

  /**
   * Fetches the next page of movies for a specific section or category on scroll
   * Individual handlers: loadMoreNewest, loadMoreRecentlyWatched, loadMoreFinished, loadMoreCategory
   */

  /**
   * Sets up IntersectionObserver for lazy loading each section
   * Disconnects observers on cleanup
   */
  useEffect(() => {
    const observers = [];

    // Helper zum Beobachten eines einzelnen Elements
    const observe = (element, loadMoreFn) => {
      if (!element) return;
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            loadMoreFn();
            obs.unobserve(entry.target);
          }
        });
      }, {
        root: containerRef.current,
        rootMargin: '0px -16px 0px -16px',
      });
        
      obs.observe(element);
      observers.push(obs);
    };

    // Newest
    if (hasMoreNewest && !isLoadingNewest) {
      observe(newestRef.current, loadMoreNewest);
    }
    // Continue Watching
    if (hasMoreRecentlyWatched && !isLoadingRecentlyWatched) {
      observe(recentRef.current, loadMoreRecentlyWatched);
    }
    // Watch Again
    if (hasMoreFinished && !isLoadingFinished) {
      observe(finishedRef.current, loadMoreFinished);
    }
    // Categories
    categories.forEach((cat) => {
      const el = categoryRefs.current[cat.category_id];
      if (
        hasMoreCategory[cat.category_id] &&
        !isLoadingCategory[cat.category_id]
      ) {
        observe(el, () => loadMoreCategory(cat.category_id));
      }
    });

    // Cleanup beim Unmount oder wenn Dependencies sich ändern
    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [
    containerRef,
    loadMoreNewest,
    loadMoreRecentlyWatched,
    loadMoreFinished,
    loadMoreCategory,

    hasMoreNewest,
    isLoadingNewest,
    hasMoreRecentlyWatched,
    isLoadingRecentlyWatched,
    hasMoreFinished,
    isLoadingFinished,

    categories,
    isLoadingCategory,
    hasMoreCategory,
  ]);

  return (
    <>
      <HomeHeader onResetActiveMovie={resetActiveMovie} />
      <div className={styles.home}>
        {(!isMobile || activeMovie) && (
          <HeroSection movie={activeMovie || featuredMovie} />
        )}
        <div ref={containerRef} className={styles.moviesContent}>
          {/* Newest Movies */}
          {newest.length > 0 && (
            <section className={styles.movieRow}>
              <h2 className={styles.movieRowTitle}>Newest Movies</h2>
              <div className={styles.movieRowPosters}>
                {newest.map((movie, i) => {
                  const isLast = i === newest.length - 1;
                  return (
                    <div key={movie.id} ref={isLast ? newestRef : null}>
                      <MovieCard
                        movie={movie}
                        onClick={() => updateActiveMovie(movie)}
                      />
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Recently Watched */}
          {recentlyWatched && recentlyWatched.length > 0 && (
            <section className={styles.movieRow}>
              <h2 className={styles.movieRowTitle}>Continue Watching</h2>
              <div className={styles.movieRowPosters}>
                {recentlyWatched.map((movie, i) => {
                  const isLast = i === recentlyWatched.length - 1;
                  return (
                    <div key={movie.id} ref={isLast ? recentRef : null}>
                      <MovieCard
                        movie={movie}
                        onClick={() => updateActiveMovie(movie)}
                      />
                    </div>
                  );
                })}
              </div>
            </section>
          )}


          {/* Categories */}
          {categories.map((cat) => (
            <section className={styles.movieRow} key={cat.category_id}>
              <h2 className={styles.movieRowTitle}>{cat.category}</h2>
              <div className={styles.movieRowPosters}>
                {cat.movies.map((movie, i) => {
                  const isLast = i === cat.movies.length - 1;
                  return (
                    <div
                      key={movie.id}
                      ref={
                        isLast
                          ? (el) => (categoryRefs.current[cat.category_id] = el)
                          : null
                      }
                    >
                      <MovieCard
                        movie={movie}
                        onClick={() => updateActiveMovie(movie)}
                      />
                    </div>
                  );
                })}
              </div>
            </section>
          ))}

          {/* Finished Movies */}
          {finished && finished.length > 0 && (
            <section className={styles.movieRow}>
              <h2 className={styles.movieRowTitle}>Watch Again</h2>
              <div className={styles.movieRowPosters}>
                {finished.map((movie, i) => {
                  const isLast = i === finished.length - 1;
                  return (
                    <div key={movie.id} ref={isLast ? finishedRef : null}>
                      <MovieCard
                        movie={movie}
                        onClick={() => updateActiveMovie(movie)}
                      />
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
