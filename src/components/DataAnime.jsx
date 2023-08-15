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
                            <div className=''>
                                <p>Format: {anime.format}</p>
                                {anime.episodes? <p>Episodes : {anime.episodes}</p> : <p>Episodes : NA</p>}
                            </div>
                        ) : (
                            <div>
                                <p>Format: {anime.format}</p>
                            </div>
                        )}
                    <p>Status: {anime.status}</p>
                        <p>{anime.genres.join((', '))}</p>
                </div>
            </div>
        </div>
    );
}

export default DataAnime;