import React, { useEffect, useState } from "react";
import MovieList from "./Component/MovieList";
import "./App.css";
import MovieHeading from "./Component/MovieHeading";
import SearchBox from "./Component/SearchBox";
import AddFavorite from "./Component/AddFavorite";
import RemoveFavor from "./Component/RemoveFavor";
function App() {
  const [favor, setFavor] = useState([]);
  const [movies, setMovies] = useState([]);
  const [searchValue, setsearchValue] = useState("avengers");

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=bd62e1e`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(localStorage.getItem("save-movie-list"));
    setFavor(movieFavourites);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("save-movie-list", JSON.stringify(items));
  };

  const AddFavorMovie = (movie) => {
    const newFavorList = [...favor, movie];
    setFavor(newFavorList);
    saveToLocalStorage(newFavorList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favor.filter(
      (item) => item.imdbID !== movie.imdbID
    );
    setFavor(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items center mt-4 mb-4">
        <MovieHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setsearchValue={setsearchValue} />
      </div>
      <div className="row">
        <MovieList
          movies={movies}
          handleFavorClick={AddFavorMovie}
          favouriteComponent={AddFavorite}
        />
      </div>
      <div className="row d-flex align-items center mt-4 mb-4">
        <MovieHeading heading="Favourites" />
      </div>
      <div className="row">
        <MovieList
          movies={favor}
          handleFavorClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavor}
        />
      </div>
    </div>
  );
}

export default App;
