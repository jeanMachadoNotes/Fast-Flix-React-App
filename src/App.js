import React, { useState } from "react";
import axios from "axios";

const API_KEY = "ed2d6fb9";

function App() {
  const [movie, setMovie] = useState(null);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const fetchMovie = async () => {
    if (!title.trim()) return;
  
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${API_KEY}`
      );
  
      if (response.data.Response === "False") {
        setError("Sorry, the movie was not found, try searching again.");
        setMovie(null);
      } else {
        setMovie(response.data);
        setError("");
      }
    } catch (err) {
      setError("Something went wrong!");
    }
  };
  


  return (
    <div className="wrapper">
      <div className="header">
        <h1>Flick Facts – Find Movie Info Fast</h1>
        <input type="text" placeholder="Enter movie title" value={title} onChange={(enteredTitle) => setTitle(enteredTitle.target.value)} />
        <button onClick={fetchMovie}>Search</button>        
      </div>
      <div className="movie-wrapper">
        {movie && (
          <div className="movie-details">
            <div className="movie-header">
              <h2>{movie.Title}</h2>
              <p>Released in {movie.Year}</p>
              <p>Directed by {movie.Director}</p>
              <p>Staring {movie.Actors}</p>
              <p className="movie-description">{movie.Plot}</p>
            </div>
            <div className="movie-poster">
              <img src={movie.Poster} alt={movie.Title}/>
            </div>
          </div>
        )}
      </div>
        <div className="error-message">
          <p>{error}</p>
        </div>
        <footer className="footer">
          <p>API-Powered Awesomeness ⚡ | Built with React | © 2025 <a href="https://www.jeanmachado.net" rel="noreferrer" target="_blank">JM</a> | <a rel="noreferrer" target="_blank" href="https://github.com/jeanMachadoNotes/Fast-Flix-React-App">GitHub</a></p>
        </footer>
    </div>
  );
}

export default App;
