import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import '../App.css'



const UpdatePage = () => {

    const { TOKEN, animeData, animeId } = useContext(AppContext)
    const [status, setStatus] = useState("");
    const [score, setScore] = useState("");
    const [episodes, setEpisodes] = useState("");
    const [repeat, setRepeat] = useState(0);    


    function changeHandlerStatus(e) {
        const { value } = e.target;
        setStatus(value);
    }

    function changeHandlerScore(e) {
        const { value } = e.target;
        setScore(value);
    }

    function changeHandlerEpisodes(e) {
        const { value } = e.target;
        setEpisodes(value);
    }

    function changeHandlerRepeat(e){
        setRepeat(e.target.value);
        console.log("updated value of repeat is : ",repeat)
    }

    const getInfo = () => {
        const query = `
      mutation ($mediaId: Int) {
        SaveMediaListEntry(mediaId: $mediaId) {
          id
          status
          score
          progress
          repeat
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
                setRepeat(data.data.SaveMediaListEntry.repeat)
            })
            .catch(error => {
                console.error(error);
            });
    };


    useEffect(() => {
        getInfo();
        console.log()
    }, [])

    function submitHandler() {
        const mutationQuery = `
    mutation ($mediaId: Int, $status: MediaListStatus,$progress:Int,$score:Float,$repeat:Int) {
      SaveMediaListEntry (mediaId: $mediaId, status: $status, progress:$progress,score:$score, repeat:$repeat) {
          id
          status
          progress
          score
          repeat

      }
  }
  `;

        const updateVariables = {
            mediaId: parseInt(animeId),
            score: parseInt(score),
            progress: parseInt(episodes),
            status: status,
            repeat : parseInt(repeat)
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
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }

    return (
        <div className="mainContainer">
            <div className='mainDiv2'>
                <p>{animeData.length > 0 ? (animeData[0].title.english = "" ? animeData[0].title.romaji : animeData[0].title.english) : ""}</p>
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
                    step={0.5}
                />

                <label htmlFor="episodes">Episodes</label>
                <input type="number"
                    name='episodes'
                    id='episodes'
                    value={episodes}
                    onChange={changeHandlerEpisodes}
                />
                <label htmlFor="repeat">Repeat</label>
                <input type="number"
                    name='repeat'
                    id='repeat'
                    value={repeat}
                    onChange={changeHandlerRepeat}
                />
            </div>
            <div className='buttons'>
                <button onClick={submitHandler} >Submit</button>
            </div>

        </div>

    );

}

export default UpdatePage;