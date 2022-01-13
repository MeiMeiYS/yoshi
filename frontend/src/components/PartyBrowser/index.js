import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './PartyBrowser.css';
import { fetch12Parties } from '../../store/party';
import { fetchAllPartyUsers } from "../../store/partyuser";
import PartyCard from './PartyCard';


const PartyBrowser = () => {
    const dispatch = useDispatch();
    const partiesList = useSelector((state) => state.parties);

    useEffect(() => {
        dispatch(fetch12Parties());
        window.scrollTo(0, 0);
    }, [dispatch])


    const parties = [];
    // turn data back to array
    for (const party in partiesList) {
        parties.push(partiesList[party])
      }




    return (
        <div className='party-browser'>
            { parties && parties.map(party => {

                return (
                    <PartyCard key={party.name} party={party}/>
                )
            })
            }
        </div>
    )
}


export default PartyBrowser;
