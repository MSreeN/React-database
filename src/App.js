import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];
  ///////with this state we can tell whether we have movies or not
  const [movies, setMovies] = useState([]);
  ////To know if we are waiting or not we have to use next state
  //with the help of this loading state we can display a loading spinner when data is being fetched in the background
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();


  const movieFetchHandler = useCallback(async () => {
    // fetch("https://swapi.dev/api/films")
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     const movies = data.results.map((movie) => {
    //       return {
    //         id: movie.episode_id,
    //         title: movie.title,
    //         openingText: movie.opening_crawl,
    //         releaseDate: movie.release_date,
    //       };
    //     });
    //     setMovies(movies);
    //   });
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films");
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      const movies = data.results.map((data) => {
        return {
          id: data.episode_id,
          title: data.title,
          openingText: data.opening_crawl,
          releaseDate: data.release_date,
        };
      });
      console.log(response);
      // movies = [];
      setMovies(movies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  },[])
  useEffect(() => {
    movieFetchHandler();
    ///if i don't mention [] in the dependencies it will cause infinite loop.
  },[]);
  return (
    <React.Fragment>
      <section>
        <button onClick={movieFetchHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>No movies</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading....</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
