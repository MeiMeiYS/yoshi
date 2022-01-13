import { NavLink } from 'react-router-dom';
import './Banner.css';

const Banner = () => {


    return (
        <div className='banner'>
            <img crossOrigin="anonymous" src='https://images.unsplash.com/photo-1534488972407-5a4aa1e47d83?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1123&q=80'></img>
            <div>
                <h1 className="slogan" style={{color: 'white'}}>Find your gaming partners on <NavLink className='logo' exact to='/signup'>Yoshi</NavLink></h1>
            </div>
        </div>
    )
}


export default Banner;
