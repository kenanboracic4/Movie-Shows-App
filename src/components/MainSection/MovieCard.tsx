import React from 'react'

interface MovieCardProps {
    title: string;
    imageUrl: string;
    rating: number;
    releaseDate: string;
    language: string;
    
}

const MovieCard = ({ title, rating, imageUrl, releaseDate, language }: MovieCardProps) => {
  return (
    <div className="movie-card">
        <img src={imageUrl ?  `https://image.tmdb.org/t/p/w500${imageUrl}` : '/No-Poster.png'} alt="" />

        <div className="movie-info">
            <h3 className='movie-title'>{title}</h3>
            
            <div className="movie-specs">
                <img src="/star.svg" alt="" />
                <p>{rating.toFixed(1)}</p>
                <span>|</span>
                <p> {language.toUpperCase()}</p>
                <span>|</span>
                <p>{releaseDate.split("-")[0]}</p>
            </div>
            
            </div>
      </div>
  )
}

export default MovieCard