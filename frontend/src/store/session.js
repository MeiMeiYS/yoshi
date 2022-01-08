/*This file will contain all the actions specific to the
session user's information and the session user's Redux reducer. */
import { csrfFetch } from "./csrf";

const SET_SESSION_USER = 'session/setSessionUser';
const REMOVE_SESSION_USER = 'session/removeSessionUser'

export const setSessionUser = (sessionUser) => {
    return {
        type: SET_SESSION_USER,
        sessionUser
    };
};

export const removeSessionUser = () => {
    return {
        type: REMOVE_SESSION_USER
    };
};

export const login = (credentials) => async dispatch => {
    const { credential, password } = credentials;
    const options = {
        method: 'POST',
        body: JSON.stringify({ credential, password })
     };
    const response = await csrfFetch('/api/session', options)

    if (response.ok) {
      const data = await response.json()
      dispatch(setSessionUser(data.user))
      return data.user
    }
    //else: fail to login
}

export const restoreSession = () => async dispatch => {

    const response = await csrfFetch('/api/session')

    const data = await response.json()
    dispatch(setSessionUser(data.user))
    return data.user;
}

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(removeSessionUser());
    return response;
};

export const signup = (user) => async (dispatch) => {
    const { username, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const data = await response.json();
    dispatch(setSessionUser(data.user));
    return data.user;
};

const initialState = { user: null }

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_SESSION_USER:{
            newState = Object.assign({}, state);
            newState.user = action.sessionUser;
            console.log('I am new State:', newState)
            return newState;
        }

        case REMOVE_SESSION_USER:{
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        }

        default:
            return state;
    };
};

export default sessionReducer;
