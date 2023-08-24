import React, { useContext } from 'react';
import '../App.css'
import { AppContext } from '../context/AppContext';
import DataAnime from './DataAnime';


const SearchPage = () => {

    const { inputTxt, handleInputChange, animeData} = useContext(AppContext);


    return (
        <div className='SearchBox'>
            <input type="text" id='inputTxt' name='inputTxt' placeholder='Search Anime' value={inputTxt} onChange={handleInputChange} />
            <div className='mainDiv'>
                {animeData.map((anime) => {
                    return (
                        <div>
                            <DataAnime anime={anime}/>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default SearchPage;