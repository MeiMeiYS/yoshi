import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, useHistory  } from "react-router-dom";

import { restoreSession } from "../../store/session";
import { getAllVideoGames } from "../../store/videogame";
import { createParty, checkPartyNameAvailability } from "../../store/party";

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

    const [ partyNameIsValid, setPartyNameIsValid] = useState(false);
    const [ partyNameNotStartWithNum, setPartyNameNotStartWithNum] = useState(false);
    const [ partyNameIsOkToUse, setPartyNameIsOkToUse] = useState(true);
    const [ descriptionIsValid, setDescriptionIsValid ] = useState(false);
    const [ formIsvalid, setFormIsvalid ] = useState(false);

    const allVideoGames = useSelector(state => state.videoGames);
    const sessionUser = useSelector((state) => state.session.user);
    console.log('!!!!!!!!!!!!!!!!!',partyNameIsOkToUse);
    useEffect(()=> {
        setFormIsvalid(true);
        setPartyNameIsValid(true);
        setDescriptionIsValid(true);
        setPartyNameNotStartWithNum(true);
        setPartyNameIsOkToUse(true);

        const startWithNum = new RegExp('^[^0-9]');
        if ( !partyName || videoGameId === '' || space === 0 || !description ) setFormIsvalid(false);
        if ( partyName && (partyName.length < 3 || partyName.length > 60) ) {
            setFormIsvalid(false);
            setPartyNameIsValid(false);
        }
        if (partyName && !startWithNum.test(partyName)){
            setFormIsvalid(false);
            setPartyNameNotStartWithNum(false);
        }
        if ( description && (description.length < 10 || partyName.length > 5000) ) {
            setFormIsvalid(false);
            setDescriptionIsValid(false);
        }
        // console.log('validation', partyNameIsValid, descriptionIsValid, formIsvalid)
    }, [partyName, videoGameId, space, description])

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

        //check if this name is ok to use
        dispatch(checkPartyNameAvailability(partyName)).then(res => {
            if (!res){
                setPartyNameIsOkToUse(false);
                setFormIsvalid(false);
                return;
            }
        });

        const newPartyObj = {
            name: partyName,
            description,
            space,
            openStatus: true,
            gameId: videoGameId,
            ownerId: sessionUser.id,
            url
        }
        dispatch(createParty(newPartyObj));

        //redirect
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
                <p className="validation-error" hidden={partyNameIsValid}>Party name must be between 3 and 60 characters long.</p>
                <p className="validation-error" hidden={partyNameNotStartWithNum}>Party name cannot start with number.</p>
                <p className="validation-error" hidden={partyNameIsOkToUse}>This party name has already been taken.</p>
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
                    type='url'
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
                <p className="validation-error" hidden={descriptionIsValid}>Description must be more than characters long.</p>
                <div className="create-party-btn-group">
                    <button className='cancel-new-party' type="button" onClick={handleCancle} >Cancel</button>
                    <button className='submit-new-party' type="submit" disabled={!formIsvalid}>Submit</button>
                </div>
                <div className="link-container">
                </div>
            </form>
        </div>
    )
}

export default CreatePartyForm;
