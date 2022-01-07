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

export const createSession = (credentials) => async dispatch => {
    const options = {
        method: 'POST',
        body: JSON.stringify(credentials)
     };
    const response = await csrfFetch('/api/session', options)

    if (response.ok) {
      const sessionUser = await response.json()
      dispatch(setSessionUser(sessionUser))
      return sessionUser
    }
    //else: fail to login
}

//delete sesstion



const initialState = { user: null }

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SESSION_USER:{
            return { user: action.sessionUser };
        }

        case REMOVE_SESSION_USER:
            return {...state, entries: [...state.entries, action.article]};
        default:
            return state;
    };
};

export default sessionReducer;
