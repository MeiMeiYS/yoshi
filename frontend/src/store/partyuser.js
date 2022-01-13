import { csrfFetch } from "./csrf";

const LOAD_PARTY_USERS = "partyUsers/loadPartyUsers";
const ADD_ONE_PARTY_USER = "partyUsers/addOnePartyUser";
const REMOVE_ONE_PARTY_USER = "partyUsers/removeOnePartyUser";


const loadPartyUsers = (partyId, users) => ({
  type: LOAD_PARTY_USERS,
  partyId,
  users,
});

const addOnePartyUser = (partyId, user) => ({
  type: ADD_ONE_PARTY_USER,
  partyId,
  user,
});

const removeOnePartyUser = (partyId, userId) => ({
  type: REMOVE_ONE_PARTY_USER,
  partyId,
  userId,
});

export const fetchAllPartyUsers = (partyId) => async (dispatch) => {
  const response = await fetch(`/api/partyUsers/${partyId}`, {
    method: "GET",
  });
  if (response.ok) {
    const users = await response.json();
    dispatch(loadPartyUsers(partyId, users));
  }
};

export const acceptPartyUser = (userId, partyId) => async (dispatch) => {
  const response = await csrfFetch(`/api/partyUsers`, {
    method: "POST",
    body: JSON.stringify({ userId, partyId }),
  });
  if (response.ok) {
    const user = await response.json();
    dispatch(addOnePartyUser(partyId, user));
  }
};

export const deletePartyUser = (userId, partyId) => async (dispatch) => {
  const response = await csrfFetch(`/api/partyUsers`, {
    method: "DELETE",
    body: JSON.stringify({ userId, partyId }),
  });
  if (response.ok) {
    const userIdNum = parseInt(userId, 10);
    const data = await response.json();
    dispatch(removeOnePartyUser(partyId, userIdNum));
  }
};

const partyuserReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {

    case LOAD_PARTY_USERS: {
      newState = Object.assign({}, state);
      if (action.users && action.partyId) {
        const userList = {}
        action.users.forEach(user => {
          userList[user.id] = user;
        })
        newState[action.partyId] = userList;
      }
      return newState;
    }

    case ADD_ONE_PARTY_USER: {
      newState = Object.assign({}, state);
      if (action.user && action.partyId) {
        newState[action.partyId] = {...newState[action.partyId], [action.user.id]: action.user};
      }
      return newState;
    }

    case REMOVE_ONE_PARTY_USER: {
      newState = Object.assign({}, state);
      if (action.userId && action.partyId && newState[action.partyId]) {
        delete newState[action.partyId][action.userId];
      }
      return newState;
    }

    default:
      return state;
  }
};

export default partyuserReducer;
