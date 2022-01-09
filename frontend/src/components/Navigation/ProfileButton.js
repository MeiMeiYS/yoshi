import { useEffect, useState, useRef } from "react";
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "../../store/session";

const ProfileButton = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const dropDownMenu = useRef();
    const loginBtn = useRef();
    const signupBtn = useRef();
    const logoutBtn = useRef();

    const [ showUserMenu, setShowUserMenu ] = useState(false);

    const handleShowUserMenu = e => {
        setShowUserMenu(preState => !preState)
    }

    const handleLogout = e => {
        e.preventDefault();
        dispatch(logout());
        history.push('/');
    }

    useEffect(() => {
        //vvv if menu is closed, return
        if (!showUserMenu) return ;

        //vvv if menu is opened, attached event listener
        const closeMenu = e => {
            // if click outside of the dropdown menu, the menu will close
            if (dropDownMenu.current && !dropDownMenu.current.contains(e.target)) {
                setShowUserMenu(false);
            }
            // if click on login or sign up button in downdown menu, the menu will close
            if ( loginBtn?.current?.contains(e.target) ||
                signupBtn?.current?.contains(e.target) ||
                logoutBtn?.current?.contains(e.target) ){
                    console.log('ckdjkknf')
                    setShowUserMenu(false);
            }
        };
        document.addEventListener('click', closeMenu);

        //vvv clean up function to remove event listener
        return () => document.removeEventListener("click", closeMenu);
    }, [showUserMenu])

    return (
        <>
        <button type='button' className="profile-button" onClick={handleShowUserMenu}>
            <i className="fas fa-user"></i>
        </button>
        <div ref={dropDownMenu} className={`user-drop-down ${ showUserMenu && "user-drop-down-open" }`}>
            {sessionUser ?
                <>
                    <div id="user-dropdown-greeting">
                        <p>Hi! {sessionUser.username}</p>
                    </div>
                    <hr/>
                    <button ref={logoutBtn} type='button' onClick={handleLogout}>Logout</button>
                </> :
                <>
                    <div id='dropdown-search-bar'>
                        <input
                            placeholder='Search'>
                            {/* To Do: make is a controled input */}
                        </input>
                    </div>
                    <hr/>
                    <div>
                        <NavLink ref={loginBtn} to={`/login`}>Login</NavLink>
                    </div>
                    <div>
                        <NavLink ref={signupBtn} to={`/signup`}>Signup</NavLink>
                    </div>
                </>
            }
        </div>
        </>
    )
}

export default ProfileButton;
