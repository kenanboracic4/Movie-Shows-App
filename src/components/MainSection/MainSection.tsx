import React, { useEffect } from "react";
import "./MainSection.css";
import Search from "./Search";
import MovieCard from "./MovieCard";
import { SpinnerCircular } from "spinners-react";
import { useDebounce } from 'react-use';
import { useNavigate, useParams } from 'react-router-dom';
import useSearchStore from './useSearchStore';

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYmFlZDUxMjMzZDQ4MjA4NjQzYzk0YjlmODJlODdjNiIsIm5iZiI6MTc1ODIxOTQwNi4zODYsInN1YiI6IjY4Y2M0YzhlNmYzNDBiMGMzMjVlOTAzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b467jp9sVMJc9KN7Al-GXh0OHrWmKjPxAiLU-4aSQjA";

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
    route: string;
  }

  const navItems: NavItem[] = [
    { id: "movies", name: "Movies", route: "movies" },
    { id: "tv-shows", name: "TV Shows", route: "tv-shows" },
  ];

  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>(); 


  const {
    searchTerm,
    activeTab,
    movieList,
    tvShowList,
    isLoading,
    errorMessage,
    setSearchTerm,
    setActiveTab,
    setMovieList,
    setTvShowList,
    setIsLoading,
    setErrorMessage
  } = useSearchStore();


  const [debouncedSearchTerm, setDebouncedSearchTerm] = React.useState(searchTerm);
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);


  useEffect(() => {
    if (category && category !== activeTab) {

      setActiveTab(category);
    } else if (!category) {

      navigate('/main/movies', { replace: true });
    }
  }, [category, activeTab, setActiveTab, navigate]);

  
  const handleItemClick = (id: string) => {
    const selectedItem = navItems.find(item => item.id === id);
    if (selectedItem) {
      
      navigate(`/main/${selectedItem.route}`);
      
    }
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
      console.log('TV Shows:', data.results);
      
      if (!data.results || data.results.length === 0) {
        setErrorMessage("No TV shows found. Please try another search.");
        setTvShowList([]);
        return;
      }

      setTvShowList(data.results.slice(0, 10));
    } catch {
      setErrorMessage("Failed to fetch TV shows. Please try again later.");
      setTvShowList([]);
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
      console.log('Movies:', data.results);
      
      if (!data.results || data.results.length === 0) {
        setErrorMessage("No movies found. Please try another search.");
        setMovieList([]);
        return;
      }

      setMovieList(data.results.slice(0, 10));
    } catch (error) {
      setErrorMessage("Failed to fetch movies. Please try again later.");
      setMovieList([]);
    }
  };

  
  useEffect(() => {
    if (activeTab === "movies") {
      fetchMovies(debouncedSearchTerm);
    } else if (activeTab === "tv-shows") {
      fetchTvShows(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, activeTab]);

  return (
    <>
      <div className="main-section">
        <div className="main-nav">
          {navItems.map((item) => (
            <a
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={
                item.id === activeTab ? "active-main-nav" : "main-nav-item"
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
        ) : activeTab === "movies" ? (
          <div className="movie-grid-container">
            <ul>
              {movieList.map((movie) => (
                <MovieCard
                  type={'movie'}
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  rating={movie.vote_average}
                  imageUrl={movie.poster_path}
                  language={movie.original_language}
                  releaseDate={movie.release_date}
                />
              ))}
            </ul>
          </div>
        ) : (
          <div className="movie-grid-container">
            <ul>
              {tvShowList.map((show) => (
                <MovieCard
                  type={'tv'}
                  id={show.id}
                  key={show.id}
                  title={show.name}
                  rating={show.vote_average}
                  imageUrl={show.poster_path}
                  language={show.original_language}
                  releaseDate={show.first_air_date}
                />
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
};

export default MainSection;