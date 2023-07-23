import React from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';


const DataAnime = ({anime}) => {

    const {titleClickHandler} = useContext(AppContext);
    const key = anime.id;

    return (
        <div className="anime-card">
            <div className='animeTitle' onClick={() => titleClickHandler(key)}>
                {anime.title.english !== null ? (
                    <h2>{anime.title.english}</h2>
                ) : (
                    <h2>{anime.title.romaji}</h2>
                )}
            </div>
            <div className='mainCard'>
                <img src={anime.coverImage.medium} alt="" />
                <div className='details'>
                    <div className='dates'>
                        <p>Start Date: {anime.startDate.year}-{anime.startDate.month}-{anime.startDate.day}</p>
                        <p>End Date: {anime.endDate.year}-{anime.endDate.month}-{anime.endDate.day}</p>
                    </div>
                    <div className='type'>
                        {anime.format !== 'MOVIE' ? (
                            <div>
                                <p>Format: {anime.format}</p>
                                <p>Number of Episodes: {anime.episodes}</p>
                            </div>
                        ) : (
                            <div>
                                <p>Format: {anime.format}</p>
                            </div>
                        )}
                    </div>
                    <div className='genre'>
                        <p>{anime.genres.join((', '))}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DataAnime;