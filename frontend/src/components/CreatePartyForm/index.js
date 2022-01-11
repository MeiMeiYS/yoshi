import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, useHistory  } from "react-router-dom";

import { restoreSession } from "../../store/session";
import { getAllVideoGames } from "../../store/videogame";

import './CreatePartyForm.css'

const CreatePartyForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [ isLoading, setIsLoading ] = useState(true);
    const [ partyName, setPartyName ] = useState('');
    const [ videoGameId, setVideoGameId ] = useState('');
    const [ space, setSpace ] = useState(0);
    const [ url, setUrl] = useState('');
    const [ description, setDescription ] = useState('');

    const allVideoGames = useSelector(state => state.videoGames);
    const sessionUser = useSelector((state) => state.session.user);

    //fetch all videogames
    useEffect(()=> {
        dispatch(restoreSession());
        dispatch(getAllVideoGames());
    }, [dispatch])

    useEffect(()=> {
        if (Object.keys(allVideoGames).length) setIsLoading(false)
    }, [allVideoGames])

    if (!isLoading && !sessionUser){
        return <Redirect to="/" />;
    }

    const handleCancle =e => {
        e.preventDefault();
        history.push('/');
    }

    const handleSubmit = e => {
        e.preventDefault();
        const newPartyObj = {
            name: partyName,
            description,
            space,
            openStatus: true,
            gameId: videoGameId,
            ownerId: sessionUser.id,
            url
        }
        console.log(newPartyObj)
        alert(newPartyObj)
    }

    return (
        <div className="create-new-party-block">
            <form className="new-party-form" onSubmit={handleSubmit}>
                <h1>Host a Party</h1>
                <i className="fas fa-gamepad"></i>
                <input
                    type='text'
                    placeholder="Give your party a name"
                    value={partyName}
                    onChange={(e) => setPartyName(e.target.value)}
                    required
                ></input>
                <select
                    value={videoGameId}
                    onChange={(e) => setVideoGameId(e.target.value)}
                >
                    <option value={''} disabled>--Choose a Video Game--</option>
                    { allVideoGames.gameList ? allVideoGames.gameList.map(game => {
                        return <option key={game.id} value={game.id}>{game.name}</option>
                    }) : null }

                </select>
                <select
                    value={space}
                    onChange={(e) => setSpace(e.target.value)}
                >
                    <option value={0} disabled>--Choose Party Space--</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                </select>
                <input
                    type='text'
                    placeholder="Enter an image URL for your party here (optional)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                >
                </input>
                <textarea
                    type='text'
                    placeholder="Party description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
                <ul className="party-form-errors">
                {/* {errors.map((error, i) => (
                    <li key={i}>{error}</li>
                ))} */}
                </ul>
                <div className="create-party-btn-group">
                    <button className='cancel-new-party' type="button" onClick={handleCancle} >Cancel</button>
                    <button className='submit-new-party' type="submit">Submit</button>
                </div>
                <div className="link-container">
                </div>
            </form>
        </div>
    )
}

export default CreatePartyForm;
