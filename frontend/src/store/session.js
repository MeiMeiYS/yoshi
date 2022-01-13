/*This file will contain all the actions specific to the
session user's information and the session user's Redux reducer. */
import { csrfFetch } from "./csrf";

const SET_SESSION_USER = 'session/setSessionUser';
const REMOVE_SESSION_USER = 'session/removeSessionUser';
const ADD_ONE_TO_MY_REQUESTS = 'request/addOneToMyRequests';
const REMOVE_ONE_FROM_MY_REQUESTS = 'request/removeOneFromMyRequests';
const LOAD_MY_REQUESTS = 'request/loadMyRequests';
const ADD_TO_MY_PARTIES = 'myParties/addToMyParties';
const ADD_TO_REQUESTS_FOR_ME = 'myParties/addToRequestsForMe';
const LOAD_PARTIES_I_BELONGS = 'partiesIBelongs/loadPartiesIBelongs';
const ADD_TO_PARTIES_I_BELONGS = 'partiesIBelongs/addToPartiesIBelongs';
const REMOVE_FROM_PARTIES_I_BELONGS = 'partiesIBelongs/removeFromPartiesIBelongs';
const REMOVE_ONE_FROM_REQUESTS_FOR_ME = 'myParties/removeOneFromRequestsForMe';


//------------------------------------------

export const loadPartiesIBelongs = (parties) => {
    return {
        type: LOAD_PARTIES_I_BELONGS,
        parties
    };
};

export const removeFromPartiesIBelongs = (partyId) => {
    return {
        type: REMOVE_FROM_PARTIES_I_BELONGS,
        partyId
    };
};

//------------------------------------------

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

//------------------------------------------

const addOneToMyRequests = (party) => ({
    type: ADD_ONE_TO_MY_REQUESTS,
    party
})

const removeOneFromMyRequests = (partyId) => ({
    type: REMOVE_ONE_FROM_MY_REQUESTS,
    partyId
})

const loadMyRequests = (parties) => ({
    type: LOAD_MY_REQUESTS,
    parties
})

//------------------------------------------

const addToMyParties = (parties) => ({
    type: ADD_TO_MY_PARTIES,
    parties
})

const addToRequestsForMe = (users) => ({
    type: ADD_TO_REQUESTS_FOR_ME,
    users
})

const removeOneFromRequestsForMe = (userId) => ({
    type: REMOVE_ONE_FROM_REQUESTS_FOR_ME,
    userId
})

//------------------------------------------

export const fetchAllPartiesIBelonges = (userId) => async (dispatch) => {
    const response = await fetch(`/api/partyUsers/${userId}/user`, {
      method: "GET",
    });
    if (response.ok) {
      const parties = await response.json();
      dispatch(loadPartiesIBelongs(parties));
    }
  };

//------------------------------------------

export const fetchMyParties = (userId) => async dispatch => {
    const response = await fetch(`/api/parties/${userId}/myParties`);
    if (response.ok) {
        const parties = await response.json();
        dispatch(addToMyParties(parties));
    }
}

export const fetchRequestsForMyParty = (partyId) => async dispatch => {
    const response = await fetch(`/api/requests/${partyId}/party`);
    if (response.ok) {
        const users = await response.json();
        dispatch(addToRequestsForMe(users));
    }
}


//------------------------------------------

export const fetchPartyRequests = (userId) => async dispatch => {
    const response = await fetch(`/api/requests/${userId}/user`);
    if (response.ok) {
        const parties = await response.json();
        dispatch(loadMyRequests(parties));
    }
}

export const sendPartyRequest = (userId, partyId) => async dispatch => {
    const response = await csrfFetch(`/api/requests`, {
        method: "POST",
        body: JSON.stringify({userId, partyId}),
        });
    if (response.ok) {
        const party = await response.json();
        dispatch(addOneToMyRequests(party));
    }
}

export const deletePartyRequest = (userId, partyId) => async dispatch => {
    const response = await csrfFetch(`/api/requests/${userId}/user`, {
        method: "DELETE",
        body: JSON.stringify({userId, partyId}),
        });
    if (response.ok) {
        const partyid = await response.json();
        dispatch(removeOneFromMyRequests(partyId));
    }
}

//------------------------------------------

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

//------------------------------------------

const initialState = { user: null }

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_SESSION_USER:{
            newState = Object.assign({}, state);
            newState.user = action.sessionUser;
            return newState;
        }
        case REMOVE_SESSION_USER:{
            // newState = Object.assign({}, state);
            // newState.user = null;
            return {};
        }
        case ADD_ONE_TO_MY_REQUESTS:{
            newState = Object.assign({}, state);
            if (action.party) {
              newState.myRequests = {...newState.myRequests, [action.party.id]: action.party};
            }
            return newState;
          }
          case REMOVE_ONE_FROM_MY_REQUESTS:{
            newState = Object.assign({}, state);
            if (action.partyId) {
              delete newState.myRequests[action.partyId]
            }
            return newState;
          }
          case LOAD_MY_REQUESTS: {
              newState = Object.assign({}, state);
              if (action.parties) {
                  const parties = {};
                  action.parties.forEach(party => {
                      parties[party.id] = party;
                  })
                  newState.myRequests = parties;
              }
              return newState;
          }
          case ADD_TO_MY_PARTIES: {
            newState = Object.assign({}, state);
            if (action.parties) {
                const parties = {};
                action.parties.forEach(party => {
                    parties[party.id] = party;
                })
                newState.myParties = parties;
            }
            return newState;
          }
          case ADD_TO_REQUESTS_FOR_ME: {
            newState = Object.assign({}, state);
            if (action.users) {
                const users = {};
                action.users.forEach(user => {
                    users[user.id] = user;
                })
                newState.requestsForMe = users;
            }
            return newState;
          }

          case LOAD_PARTIES_I_BELONGS: {
            newState = Object.assign({}, state);
            if (action.parties) {
                const parties = {};
                action.parties.forEach(party => {
                    parties[party.id] = party;
                })
                newState.partiesIBelongs = parties;
            }
            return newState;
          }

          case REMOVE_FROM_PARTIES_I_BELONGS: {
            newState = Object.assign({}, state);
            if (action.partyId) {
                delete newState.partiesIBelongs[action.partyId]
            }
            return newState;
          }
          case REMOVE_ONE_FROM_REQUESTS_FOR_ME: {
            newState = Object.assign({}, state);
            if (action.userId) {
                delete newState.requestsForMe[action.userId];
            }
            return newState;
          }

        default:
            return state;
    };
};

export default sessionReducer;
