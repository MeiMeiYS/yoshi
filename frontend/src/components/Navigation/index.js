import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import './Navigation.css';
import { restoreSession } from '../../store/session';

import ProfileButton from './ProfileButton';

const Navigation = () => {
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);
    // console.log('This is sessionUser:',sessionUser)

    useEffect(() => {
        dispatch(restoreSession());
    }, [dispatch]);


    return (
        <nav className='top-nav-bar'>
            {sessionUser ? <h1>Hi! {sessionUser.username}</h1> : <h1>Hi! Stranger</h1>}
            <NavLink exact to={`/`}>Home</NavLink>
            <NavLink to={`/login`}>Login</NavLink>
            <NavLink to={`/signup`}>Signup</NavLink>
            <ProfileButton sessionUser={sessionUser}/>

        </nav>
    )
}

export default Navigation;
