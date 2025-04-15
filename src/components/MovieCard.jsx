import styles from './MovieCard.module.css';

function MovieCard({ movie, onClick }) {
    
    return (
      <div className={styles.movieCard} onClick={onClick}>
        <img src={movie.thumbnail} alt={movie.title} />
        <h4>{movie.title}</h4>
      </div>
    );
  }
  
  export default MovieCard;