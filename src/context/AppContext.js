import React, { createContext, useState } from 'react';
import { useEffect } from 'react';

const AppContext = createContext();

const SEARCH_ANIME_QUERY = `
  query ($search: String, $type: MediaType) {
    Page {
      media (search: $search, type: $type) {
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
        coverImage {
          medium
        }
        bannerImage
      }
    }
  }
`;

const AppContextProvider = ({ children }) => {
  const accessToken = process.env.REACT_APP_CUSTOM123;
  const [inputTxt, setInputTxt] = useState('');
  const [animeData, setAnimeData] = useState([]);
  const [titleClick, setTitleClick] = useState(false);
  const [animeId, setAnimeId] = useState(0);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputTxt(value);
  };

  useEffect(() => {
    setTimeout(() => {
      console.log(inputTxt)
      fetchData(inputTxt);
    }, 1500);
  },[inputTxt])

  const titleClickHandler = (key) => {
    setTitleClick(true);
    setAnimeId(key);
  };

  async function fetchData(input) {
    try {
      const variables = {
        search: input,
        type: "ANIME",
      };
      const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: SEARCH_ANIME_QUERY, variables }),
      });
      const data = await response.json();
      setAnimeData(data.data.Page.media);
    } catch (error) {
      console.log(error);
    }
  }

  //exporting values
  const value = {
    inputTxt,
    handleInputChange,
    animeData,
    accessToken,
    titleClick,
    titleClickHandler,
    animeId,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
