import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "../../store/session";

const ProfileButton = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [ showUserMenu, setShowUserMenu ] = useState(false);

    const handleShowUserMenu = e => {
        setShowUserMenu(preState => !preState)
    }

    const handleLogout = e => {
        dispatch(logout());
        history.push('/');
    }

    return (
        <>
        <button type='button' className="profile-button" onClick={handleShowUserMenu}>
            <i className="fas fa-user"></i>
        </button>
        <div className={`user-drop-down ${ !showUserMenu && "user-drop-down-open" }`}>
            {sessionUser ?
                <button type='button' onClick={handleLogout}>Logout</button> :
                <>
                    <div>
                        <NavLink to={`/login`}>Login</NavLink>
                    </div>
                    <div>
                        <NavLink to={`/signup`}>Signup</NavLink>
                    </div>
                </>
            }
        </div>
        </>
    )
}

export default ProfileButton;
