import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import '../App.css'



const UpdatePage = () => {

    const { TOKEN, animeData, animeId } = useContext(AppContext)


    const [status, setStatus] = useState("");
    const [score, setScore] = useState("");
    const [episodes, setEpisodes] = useState("");

    function changeHandlerStatus(e) {
        const { value } = e.target;
        setStatus(value);
        console.log(value);
    }

    function changeHandlerScore(e) {
        const { value } = e.target;
        setScore(value);
        console.log(value);

    }

    function changeHandlerEpisodes(e) {
        const { value } = e.target;
        setEpisodes(value);
        console.log(value);

    }

    const getInfo = () => {
        const query = `
      mutation ($mediaId: Int) {
        SaveMediaListEntry(mediaId: $mediaId) {
          id
          status
          score
          progress
        }
      }
    `;

        const variables = {
            mediaId: parseInt(animeId),
        };

        fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, variables }),
        })
            .then(response => response.json())
            .then(data => {
                setStatus(data.data.SaveMediaListEntry.status);
                setScore(data.data.SaveMediaListEntry.score);
                setEpisodes(data.data.SaveMediaListEntry.progress);
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
    };


    useEffect(() => {
        getInfo();
    }, [])

    function submitHandler() {
        const mutationQuery = `
    mutation ($mediaId: Int, $status: MediaListStatus,$progress:Int,$score:Float) {
      SaveMediaListEntry (mediaId: $mediaId, status: $status, progress:$progress,score:$score) {
          id
          status
          progress
          score
      }
  }
  `;

        const updateVariables = {
            mediaId: parseInt(animeId),
            score: parseInt(score),
            progress: parseInt(episodes),
            status: status
        }


        console.log(updateVariables);

        fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: mutationQuery,
                variables: updateVariables,
            }),
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response data here
                console.log(data);
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch request
                console.error('Error:', error);
            });

    }

    return (
        <div className="mainContainer">
            <div className='mainDiv2'>
                <img className='bannerImg' src={animeData.length > 0 ? animeData[0].bannerImage : ''} alt="" />
            </div>
            <div className='mainDiv3'>

                <div className='selection'>
                    <label htmlFor='status'>Status</label>
                    <select
                        name='status'
                        id='status'
                        value={status}
                        onChange={changeHandlerStatus}
                    >

                        <option value='CURRENT'>Watching</option>
                        <option value='COMPLETED'>Completed</option>
                        <option value='REWATCHING'>Rewatching</option>
                        <option value='PAUSED'>Paused</option>
                        <option value='DROPPED'>Dropped</option>

                    </select>
                </div>

                <label htmlFor="score">Score</label>
                <input type="number"
                    name='score'
                    id='score'
                    value={score}
                    onChange={changeHandlerScore}
                />

                <label htmlFor="episodes">Episodes</label>
                <input type="number"
                    name='episodes'
                    id='episodes'
                    value={episodes}
                    onChange={changeHandlerEpisodes}
                />
            </div>
            <button onClick={submitHandler} >Submit</button>
        </div>

    );

}

export default UpdatePage;