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
                {/* <div className='imgdiv'> */}
                    <img src={anime.coverImage.medium} alt="" />
                {/* </div> */}
                <div className='details'>
                    <div className='dates'>
                        <p>Start Date: {anime.startDate.year}-{anime.startDate.month}-{anime.startDate.day}</p>
                        {/* <p>End Date: {anime.endDate.year}-{anime.endDate.month}-{anime.endDate.day}</p> */}
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