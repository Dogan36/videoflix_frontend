function MovieCard({ movie, onClick }) {
    console.log(movie);
    return (
      <div className="movieCard" onClick={() => onClick(movie)}>
        <img src={movie.thumbnail} alt={movie.title} />
        <h4>{movie.title}</h4>
      </div>
    );
  }
  
  export default MovieCard;