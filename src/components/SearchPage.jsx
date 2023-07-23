import React, { useContext } from 'react';
import '../App.css'
import { AppContext } from '../context/AppContext';
import DataAnime from './DataAnime';

const SearchPage = () => {

    const { inputTxt, InputHandler, animeData, fetchData, titleClickHandler } = useContext(AppContext);


    return (
        <div className='SearchBox'>
            <input type="text" id='inputTxt' name='inputTxt' placeholder='Search Anime' value={inputTxt} onChange={InputHandler} />
            <div className='mainDiv'>
                {animeData.map((anime) => {
                    return (
                        <DataAnime anime={anime}/>
                    );
                })}
            </div>
        </div>
    );
}

export default SearchPage;