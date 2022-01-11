import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './PartyBrowser.css';

import { fetch12Parties } from '../../store/party';
import { getVideoGameImage } from '../../store/videogame';

const PartyBrowser = () => {
    const dispatch = useDispatch();
    const parties = useSelector(state => state.parties.allParties)
    console.log(parties)

    useEffect(() => {
        dispatch(fetch12Parties());
    }, [dispatch])


    return (
        <div className='party-browser'>
            { parties && parties.map(party => {
                let gameImgUrl;

                return (
                    <div key={party.id} className='party-container'>
                        <div className='game-img-container'>
                            <img className='party-game-image' src={party.Image.url}></img>
                        </div>
                        <h3>{party.name}</h3>
                        <div className='party-description'>
                            <p>{party.description}</p>
                        </div>
                        <div className='check-out-party-btn'>
                            <button type='button'>Check it out</button>
                        </div>

                    </div>
                )
            })
            }
        </div>
    )
}


export default PartyBrowser;
