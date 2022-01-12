import { csrfFetch } from "./csrf";

const LOAD = 'parties/load';
const ADD_ONE = 'parties/addOne';
const UPDATE_ONE = 'parties/updateOne';
const REMOVE_ONE = 'parties/removeOne';

const load = allParties => ({
    type: LOAD,
    allParties
  });

const addOne = party => ({
  type: ADD_ONE,
  party
});

const updateOne = party => ({
  type: UPDATE_ONE,
  party
});

const removeOne = (partyId) => ({
  type: REMOVE_ONE,
  partyId
})

export const fetch12Parties = () => async dispatch => {
  const response = await fetch("/api/parties");
  if (response.ok) {
    const data = await response.json();
    dispatch(load(data.parties))
    return data.parties;
  }
}

export const fetchOneParty = (partyId) => async dispatch => {
  const response = await fetch(`/api/parties/${partyId}`);
  if (response.ok) {
    const data = await response.json();
    if (data) dispatch(addOne(data));
    return data;
  }
}

export const createParty = (requiredData) => async dispatch => {
    const response = await csrfFetch("/api/parties", {
        method: "POST",
        body: JSON.stringify(requiredData),
      });
    if (response.ok) {
      const party = await response.json();
      return party;
    }
}

export const updateParty = (partyId, requiredData) => async dispatch => {
  const response = await csrfFetch(`/api/parties/${partyId}`, {
      method: "PUT",
      body: JSON.stringify(requiredData),
    });
  if (response.ok) {
    const party = await response.json();
    dispatch(updateOne(party))
    return party;
  }
}

export const deleteParty = (partyId) => async dispatch => {
  const response = await csrfFetch(`/api/parties/${partyId}`, {
      method: "DELETE"
    });
  if (response.ok) {
    dispatch(removeOne(partyId));
  }
}

export const checkPartyNameAvailability = (partyId, partyName) => async dispatch => {
    const response = await fetch(`/api/parties/${partyName}`);
    if (response.ok) {
      const data = await response.json();
      if (data.id === parseInt(partyId, 10) || data === 'ok') return 'ok';
      else return 'notOk'
    }
}

const partyReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD:{
            newState = Object.assign({}, state);
            if (action.allParties){
              action.allParties.map(party => {
                newState[party.id] = party
              });
            };
            return newState;
        }
        case ADD_ONE:{
          newState = Object.assign({}, state);
          if (action.party && action.party.id){
            newState[action.party.id] = action.party
          }
            return newState;
        }

        case REMOVE_ONE:{
          newState = Object.assign({}, state);
          delete newState[action.partyId]
          return newState;
        }

        case UPDATE_ONE:{
          newState = Object.assign({}, state);
          if (action.party) newState[action.party.id] = action.party;
          return newState;
        }

        default:
            return state;
    };
};

export default partyReducer;
