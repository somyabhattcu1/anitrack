import React from 'react';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';


const DataAnime = ({ anime }) => {

    const { titleClickHandler } = useContext(AppContext);
    const key = anime.id;

    return (
        <div className="anime-card">
            <div className='animeTitle' onClick={() => titleClickHandler(key)}>
                {anime.title.english !== null ? (
                    <p className='titlediv'>{anime.title.english}</p>
                ) : (
                    <p className='titlediv'>{anime.title.romaji}</p>
                )}
            </div>
            <div className='mainCard' onClick={() => titleClickHandler(key)}>
                    <img src={anime.coverImage.medium} alt="" />
                <div className='details'>
                        <p>Start Date: {anime.startDate.year}-{anime.startDate.month}-{anime.startDate.day}</p>
                        {anime.format !== 'MOVIE' ? (
                            <div>
                                <p>Format: {anime.format}</p>
                                <p>Number of Episodes: {anime.episodes}</p>
                            </div>
                        ) : (
                            <div>
                                <p>Number of Episodes: NA</p>
                                <p>Format: {anime.format}</p>
                            </div>
                        )}
                    <p>{anime.status}</p>
                        <p>{anime.genres.join((', '))}</p>
                </div>
            </div>
        </div>
    );
}

export default DataAnime;