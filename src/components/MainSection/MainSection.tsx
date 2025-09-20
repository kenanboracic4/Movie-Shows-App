import React, { useEffect, useState } from "react";
import "./MainSection.css";
import Search from "./Search";
import MovieCard from "./MovieCard";
import { SpinnerCircular } from "spinners-react";
import {useDebounce} from 'react-use';

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_KEY_SHOWS = import.meta.env.VITE_TMDB_API_KEY_SHOWS;


const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const MainSection = () => {
  interface NavItem {
    id: string;
    name: string;
    href?: string;
  }

  const navItems: NavItem[] = [
    { id: "movies", name: "Movies" },
    { id: "tv-shows", name: "TV Shows" },
  ];

  const [active, setActive] = useState<string>("movies");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [movieList, setMovieList] = useState<any[]>([]);
  const [tvShowList, setTvShowList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  
  useDebounce(()=> setDebouncedSearchTerm(searchTerm),500,[searchTerm]);


  const handleItemClick = (id: string) => {
    setActive(id);
    setSearchTerm("");
  };

  const fetchTvShows = async (query: string = "") => {
  setIsLoading(true);
  setErrorMessage("");

  try {
    const endpoint = query
      ? `${API_BASE_URL}/search/tv?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/tv/top_rated`;

    const response = await fetch(endpoint, API_OPTIONS);
    if (!response.ok) throw new Error("Failed to fetch TV shows");

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      setErrorMessage("No TV shows found. Please try another search.")
      setTvShowList([]);
      return;
    }

    setTvShowList(data.results);
  } catch {
    setErrorMessage("Failed to fetch TV shows. Please try again later.");
  } finally {
    setIsLoading(false);
  }
};


  const fetchMovies = async (query: string = "") => {
  setIsLoading(true);
  setErrorMessage("");
  try {
    const endpoint = query
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/movie/top_rated`;

    const response = await fetch(endpoint, API_OPTIONS);

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }
    

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      setErrorMessage("No movies found. Please try another search.");
      setMovieList([]);
      return;
    }

    setMovieList(data.results);
  } catch (error) {
    setErrorMessage("Failed to fetch movies. Please try again later.");
  } finally {
    setIsLoading(false);
  }
};

useEffect(() => {
  if (active === "movies") {
    fetchMovies(debouncedSearchTerm);
  } else if (active === "tv-shows") {
    fetchTvShows(debouncedSearchTerm);
  }
}, [debouncedSearchTerm, active]);

  return (
    <>
      <div className="main-section">
        <div className="main-nav">
          {navItems.map((item) => (
            <a
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={
                item.id === active ? "active-main-nav" : "main-nav-item"
              }
            >
              {item.name}
            </a>
          ))}
        </div>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <section className="content">
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "2rem",
            }}
          >
            <SpinnerCircular
              size={40}
              thickness={80}
              speed={80}
              color="#4f46e5"
              secondaryColor="#d1d5db"
            />
          </div>
        ) : errorMessage ? (
          <p className="error-message">{errorMessage}</p>
        ) : active === "movies" ? (
          <div className="movie-grid-container">
            <ul>
              {movieList.map(
                (movie) => (
                  
                  (
                    <MovieCard
                      key={movie.id}
                      title={movie.title}
                      rating={movie.vote_average}
                      imageUrl={movie.poster_path}
                      language={movie.original_language}
                      releaseDate={movie.release_date}
                    />
                  )
                )
              )}
            </ul>
          </div>
        ) : (
          <div className="movie-grid-container">
            <ul>
              {tvShowList.map(
                (show) => (
                  <MovieCard
                    key={show.id}
                    title={show.name}
                    rating={show.vote_average}
                    imageUrl={show.poster_path}
                    language={show.original_language}
                    releaseDate={show.first_air_date}
                  />
                )
              )}
            </ul>
            </div>
        )}
      </section>
    </>
  );
};

export default MainSection;
