import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./detailsPage.css";
import { SpinnerCircular } from "spinners-react/lib/esm/SpinnerCircular";

interface Details {
  title: string;
  imageUrl: string;
  rating: number;
  releaseDate: string;
  language: string;
  description: string;
  backdropUrl: string;
  genres?: string[];
  status: string;
  languages?: string[];
  budget?: number;
  tagline?: string;
  productionCompanies?: string[];
  type?: string;
  firstAirDate?: string;
}
const DetailPage = () => {
  const API_KEY =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYmFlZDUxMjMzZDQ4MjA4NjQzYzk0YjlmODJlODdjNiIsIm5iZiI6MTc1ODIxOTQwNi4zODYsInN1YiI6IjY4Y2M0YzhlNmYzNDBiMGMzMjVlOTAzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b467jp9sVMJc9KN7Al-GXh0OHrWmKjPxAiLU-4aSQjA";
  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };
  const { id, type } = useParams<{ id: string; type: "movie" | "tv" }>();
  console.log(type);
  console.log(id);
  const [movie, setMovie] = useState<Details | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const fetchDetails = async () => {
    if (!id) return;
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}?language=en-US`,
        API_OPTIONS
      );
      const data = await response.json();
      console.log(data);
      setMovie({
        title: data.title,
        imageUrl: data.poster_path,
        rating: data.vote_average,
        releaseDate: type === "movie" ? data.release_date : undefined,
        firstAirDate: type === "tv" ? data.first_air_date : undefined,
        language: data.original_language,
        description: data.overview,
        backdropUrl: data.backdrop_path,
        genres: data.genres ? data.genres.map((genre) => genre.name) : [],
        status: data.status,
        languages: data.spoken_languages
          ? data.spoken_languages.map((lang) => lang.english_name)
          : [],
        budget: Math.round(data.budget / 1000000),
        tagline: data.tagline,
        productionCompanies: data.production_companies
          ? data.production_companies.map((company) => company.name)
          : [],
      });
      console.log(data.first_air_date.split("-").join("/"));
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  return (
    <div className="detail-page">
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
      ) : (
        <div className="movie-detail-card">
          <div className="title-container">
            <h3>{movie.title}</h3>
            <div className="rate-container">
              <img src="/star.svg" alt="" />
              <span>{movie.rating.toFixed(1)}/10</span>
            </div>
          </div>
          <div className="images-container">
            <div className="right-image">
              <img
                id="backdrop-img"
                src={`https://image.tmdb.org/t/p/w500${movie?.backdropUrl.toString()}`}
                alt={movie?.title}
              />
            </div>
            <div className="left-image">
              <img
                id="hero-img"
                src={`https://image.tmdb.org/t/p/w500${movie?.imageUrl.toString()}`}
                alt={movie?.title}
              />
            </div>
          </div>

          <div className="movie-info">
            <div className="info-row">
              <span className="label">Genres</span>
              <div className="genres">
                {movie?.genres?.map((genre, index) => (
                  <span key={index} className="genre">
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            <div className="info-row">
              <span className="label">Overview</span>
              <span className="value">
                {movie?.description || "No description available."}
              </span>
            </div>

            {type === "movie" ? (
              <div className="info-row">
                <span className="label">Release date</span>
                <span className="value">
                  {movie?.releaseDate.split("-").reverse().join(" /") ||
                    "Unknown"}
                </span>
              </div>
            ) : (
              <div className="info-row">
                <span className="label">First Air date</span>
                <span className="value">
                  {movie?.firstAirDate.split("-").reverse().join("/") ||
                    "Unknown"}
                </span>
              </div>
            )}

            <div className="info-row">
              <span className="label">Status</span>
              <span className="value">
                {movie?.status.toString() || "Unknown"}
              </span>
            </div>

            <div className="info-row">
              <span className="label">Language</span>
              <div className="languages">
                {movie?.languages?.map((lang, index) => (
                  <span key={index} className="language">
                    {lang} •
                  </span>
                ))}
              </div>
            </div>

            {movie?.budget !== undefined || (
              <div className="info-row">
                <span className="label">Budget</span>
                <span className="value">${movie.budget} million</span>
              </div>
            )}
            <div className="info-row">
              <span className="label">Tagline</span>
              <span className="value">
                {movie?.tagline || "No tagline available."}
              </span>
            </div>

            <div className="info-row">
              <span className="label">Production Companies</span>
              <div className="production-companies">
                {movie?.productionCompanies?.map((company, index) => (
                  <span key={index} className="production-company">
                    {company} •
                  </span>
                ))}
              </div>
            </div>
            <div onClick={() => window.history.back()} className="goBack">
              Go Back
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
