import React from 'react'
import { useNavigate } from 'react-router-dom';


interface MovieCardProps {
    title: string;
    imageUrl: string;
    rating: number;
    releaseDate: string;
    language: string;
    id: number;
    type: 'movie' | 'tv';
    
}

const MovieCard = ({ title, rating, imageUrl, releaseDate, language, id, type}: MovieCardProps) => {

    const navigate = useNavigate();

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
            <div className="check-more" onClick={() => navigate(`/details/${type}/${id}`,
            )}>
            <p>Check More</p>
            <img id='arrow' src="/arrow.svg" alt="" />
            </div>
      </div>
  )
}

export default MovieCard