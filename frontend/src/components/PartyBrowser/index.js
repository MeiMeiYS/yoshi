import { useDispatch } from 'react-redux';
import './PartyBrowser.css';

const PartyBrowser = () => {
    const dispatch = useDispatch();


    return (
        <div className='party-browser'>
            <h1 style={{color: 'white'}}>Browser</h1>
        </div>
    )
}


export default PartyBrowser;
