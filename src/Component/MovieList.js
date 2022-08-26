import React, { Fragment } from "react";

export default function MovieList(props) {
  const FavouriteComponent = props.favouriteComponent;
  return (
    <Fragment>
      {props.movies.map((movie, index) => (
        <div key={index} className="d-flex image-container justify-content m-3">
          <img src={movie.Poster} alt="movie"></img>
          <div
            onClick={() => props.handleFavorClick(movie)}
            className="overlay d-flex align-items-center justify-content-center"
          >
            <FavouriteComponent />
          </div>
        </div>
      ))}
    </Fragment>
  );
}
