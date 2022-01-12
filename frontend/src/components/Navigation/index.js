import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import './Navigation.css';
import favicon from '../../images/favicon.png';
import logo from '../../images/yoshi-logo2.png';
import { restoreSession } from '../../store/session';

import ProfileButton from './ProfileButton';

const Navigation = () => {
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(restoreSession());
    }, [dispatch]);


    return (
        <nav className='top-nav-bar'>
            <div className='top-brand-logo'>
                <NavLink className='logo' exact to={`/`}>
                    <img crossOrigin="anonymous" className='top-nav-favicon' src={favicon}></img>
                    {/* <img className='top-nav-logo' src={logo}></img> */}
                    Yoshi
                </NavLink>
            </div>
            <div className='top-search-bar'>
                <input
                    placeholder='Search'>
                    {/* To Do: make is a controled input */}
                </input>
                <button><i className="fas fa-search"></i></button>
            </div>
            <div className='top-user-section'>
                {sessionUser && <span>Hi! {sessionUser.username}</span>}
                {sessionUser ? null :
                    <>
                        <div className='top-nav-btn top-nav-login-btn'>
                            <NavLink exact to={`/login`}>Login</NavLink>
                        </div>
                        <div className='top-nav-btn top-nav-signup-btn'>
                            <NavLink exact to={`/signup`}>Signup</NavLink>
                        </div>
                    </>
                }
                <ProfileButton sessionUser={sessionUser}/>
            </div>

        </nav>
    )
}

export default Navigation;
