import React, { createContext, useState } from 'react';
const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const TOKEN = process.env.REACT_APP_CUSTOM123;
    const [inputTxt,setInputTxt] = useState('');
    const [animeData, setAnimeData] = useState([]);
    const [titleClick,setTitleClick] = useState(false);
    const [animeId, setAnimeId] = useState(0);

  
    const titleClickHandler = (key) => {
      setTitleClick(true);
      setAnimeId(key);
    }


    // Change Handler for inputTxt 
    const InputHandler = (e) => {
        const {value} = e.target;
        setInputTxt(value);
        setTimeout(() => {
          fetchData();
        }, 1500);
    }


    const SearchQuery = `
    query ($search: String) {
      Page {
        media (search: $search, type: ANIME) {
          id
          title {
            romaji
            english
            native
          }
          episodes
          genres
          season
          seasonYear
          genres
          status
          format
          startDate {
            year
            month
            day
          }
          endDate {
            year
            month
            day
          }
          coverImage{
            medium
          }
          bannerImage
        }
      }
    }
  `;

  const variables = {
    search: inputTxt,
  };


  async function fetchData() {
    try {
      let response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: SearchQuery, variables }), // Use 'query' instead of 'SearchQuery'
      });
      let data = await response.json();
      setAnimeData(data.data.Page.media);
    }
    catch (error) {
      console.log(error);
    }
  }


    //exporting values
  const value = {
    inputTxt,
    InputHandler,
    animeData,
    fetchData,
    TOKEN,
    titleClick,
    titleClickHandler,
    animeId
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
