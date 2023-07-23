import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppContextProvider = ({ children }) => {


    const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjZiMzFlNjQ3N2M1ZDlmNzRlZTZjZTU1MTlkMTI4MTJiZjQ3YzMxZTY0MWU3YTU0YjYzMzlkYTQ0MTc3ZjNhZjg4OGZhZWRmZGJjNzUzYzJjIn0.eyJhdWQiOiIxMzYxNyIsImp0aSI6IjZiMzFlNjQ3N2M1ZDlmNzRlZTZjZTU1MTlkMTI4MTJiZjQ3YzMxZTY0MWU3YTU0YjYzMzlkYTQ0MTc3ZjNhZjg4OGZhZWRmZGJjNzUzYzJjIiwiaWF0IjoxNjkwMDU2MjQxLCJuYmYiOjE2OTAwNTYyNDEsImV4cCI6MTcyMTY3ODY0MSwic3ViIjoiNjA5ODA2MSIsInNjb3BlcyI6W119.nE9Gr_hIYASMQHf_i_DFXpbQ9odboOQ7go590ZhN2Yz3xYMOU2HTQ70Uue6GBQlog_kxYAsFL3h9I2k3Xuz3Br9vvCD7eekklSu6RxzMvwLenNj_h2SdiJiycj8DumJeCNKj6_wa_3LGxhm-5imb1r-J-oGHqfgDARbRmqE9Yk4HNoageABWeVfRbf-2p7ByOL1PljT9IP8f_WIDRiVeS5xh-Do0I6rKVPlmWrUvO_RPLNRp8sMLTex_VVgn4gZVAgeGUfGtrvt2CCJ2jF3W_3XM7RwBPL29ZNZdachPi2D3Tl4WuqJRpcuUYcF6Orrx8b0M5rlPP3N-b1AVuCSCLdY_JZw_QPWn-6C7bM8O64SD1GFsmCr2x7F8WaDPRI68ZuXvZnQG3PTfVeZ49lnvAd2oO5gl_-7qOMlSZY_YEyNPXm_alyqRkMXq6frWKCwgxFxxjNHuec_axubIvcz83W72HCEEqIYSfd6yeYZrSbyZEgOh3Xz5wQy-h10jS5A323MYEQauK4N0UaKbI-7syyySEt71g6d1Z7eUAKZKr5hhntWi1mo_soi8NOKfzKS5E8MByANCUTjfIMhCsfZieTC56PWW8N7covw_A18lbHm8-_8n4Dmt02lnhhQNq7XLj4NT6f4uAUEEkOKD3x3QLEiZyFlhVKbnTTFX1DZRQ_8';
    //inputTxt
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
        // console.log(inputTxt);
        fetchData();
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
