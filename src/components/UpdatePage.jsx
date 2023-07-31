import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import '../App.css';

const UpdatePage = () => {
    const { accessToken, animeData, animeId } = useContext(AppContext);

    const initialFormState = {
        status: '',
        score: '',
        episodes: '',
        repeat: 0,
    };

    const [date, setDate] = useState(0);
    const [CompleteDate, setCompleteDate] = useState(0);

    const dateChange = (e) => {
        setDate(e.target.value);
        console.log(date);
    }
    const completeDateChange = (e) => {
        setCompleteDate(e.target.value);
        console.log(date);
    }


    const [formData, setFormData] = useState(initialFormState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getInfo();
    }, []);
    const getInfo = () => {
        setLoading(true);
        setError(null);

        const query = `
          mutation ($mediaId: Int) {
            SaveMediaListEntry(mediaId: $mediaId) {
              id
              status
              score
              progress
              repeat
              startedAt{
                year
                month
                day
              }
              completedAt {
                year
                month
                day
              }
            }
          }
        `;

        const variables = {
            mediaId: parseInt(animeId),
        };

        fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, variables }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const saveMediaListEntry = data?.data?.SaveMediaListEntry;
                console.log(saveMediaListEntry.startedAt.year);
                if (saveMediaListEntry.startedAt.year !== null) {
                    const formattedDate = `${saveMediaListEntry.startedAt.year}-${saveMediaListEntry.startedAt.month.toString().padStart(2, '0')}-${saveMediaListEntry.startedAt.day.toString().padStart(2, '0')}`;
                    setDate(formattedDate);
                }
                if(saveMediaListEntry.completedAt.year){
                    const formattedDate = `${saveMediaListEntry.completedAt.year}-${saveMediaListEntry.completedAt.month.toString().padStart(2, '0')}-${saveMediaListEntry.completedAt.day.toString().padStart(2, '0')}`;
                    setCompleteDate(formattedDate);
                }

                if (saveMediaListEntry) {
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        status: saveMediaListEntry.status || '',
                        score: saveMediaListEntry.score ? saveMediaListEntry.score : '',
                        episodes: saveMediaListEntry.progress ? saveMediaListEntry.progress : '',
                        repeat: saveMediaListEntry.repeat || 0,
                    }));

                }
            })
            .catch(error => {
                setError(error.message || 'An error occurred');
            })
            .finally(() => {
                setLoading(false);
            });
    };


    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    function submitHandler() {

        const arr = date.split("-");
        const arr1 = CompleteDate.split("-");
    
        const mutationQuery = `
            mutation ($mediaId: Int, $status: MediaListStatus, $progress: Int, $score: Float, $repeat: Int,$startedAt: FuzzyDateInput, $completedAt: FuzzyDateInput) {
                SaveMediaListEntry(mediaId: $mediaId, status: $status, progress: $progress, score: $score, repeat: $repeat,startedAt:$startedAt, completedAt: $completedAt) {
                    id
                    status
                    progress
                    score
                    repeat
                    startedAt{
                        year
                        month
                        day
                    }
                    completedAt {
                        year
                        month
                        day
                      }
                }
            }
        `;
    
        const updateVariables = {
            mediaId: parseInt(animeId),
            score: parseFloat(formData.score),
            progress: parseInt(formData.episodes),
            status: formData.status,
            repeat: parseInt(formData.repeat),
            startedAt: {
                year: parseInt(arr[0]),
                month: parseInt(arr[1]),
                day: parseInt(arr[2])
            },
            completedAt: {
                year: parseInt(arr1[0]),
                month: parseInt(arr1[1]),
                day: parseInt(arr1[2])
            }
        };

        console.log(updateVariables);
        console.log(typeof date);

        setLoading(true);
        setError(null);

        fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
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
                console.log("updated data", data);
            })
            .catch(error => {
                setError(error.message || 'An error occurred');
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div className="mainContainer">
            <div className="mainDiv2">
                <p>{animeData.length > 0 ? (animeData[0].title.english || animeData[0].title.romaji) : ""}</p>
                <img className="bannerImg" src={animeData.length > 0 ? animeData[0].bannerImage : ''} alt="" />
            </div>
            <div className="mainDiv3">
                <div className="selection">
                    <label htmlFor="status">Status</label>
                    <select
                        name="status"
                        id="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="CURRENT">Watching</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="REPEATING">Rewatching</option>
                        <option value="PAUSED">Paused</option>
                        <option value="DROPPED">Dropped</option>
                        <option value="PLANNING">Planning</option>
                    </select>
                </div>

                <label htmlFor="score">Score</label>
                <input
                    type="number"
                    name="score"
                    id="score"
                    value={formData.score}
                    onChange={handleChange}
                    step={0.5}
                />

                <label htmlFor="episodes">Episodes Progress</label>
                <input
                    type="number"
                    name="episodes"
                    id="episodes"
                    value={formData.episodes}
                    onChange={handleChange}
                />
                <label htmlFor="repeat">Total Rewatches</label>
                <input
                    type="number"
                    name="repeat"
                    id="repeat"
                    value={formData.repeat}
                    onChange={handleChange}
                />
                <label htmlFor="date">Start Date</label>
                <input
                    type="date"
                    name="date"
                    value={date}
                    onChange={dateChange}
                />
                <label htmlFor="date">Complete Date</label>
                <input
                    type="date"
                    name="CompleteDate"
                    value={CompleteDate}
                    onChange={completeDateChange}
                />
            </div>
            <div className="buttons">
                <button onClick={submitHandler} disabled={loading}>
                    {loading ? "Loading..." : "Submit"}
                </button>
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

export default UpdatePage;
