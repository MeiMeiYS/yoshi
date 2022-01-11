import { csrfFetch } from "./csrf";

const LOAD = 'parties/load';
const LOAD_ONE = 'parties/loadOne';

const load = allParties => ({
    type: LOAD,
    allParties,
  });

  const loadOne = party => ({
    type: LOAD_ONE,
    party,
  });

export const fetch12Parties = () => async dispatch => {
  const response = await fetch("/api/parties");
  if (response.ok) {
    const data = await response.json();
    dispatch(load(data.parties))
    return data.parties;
  }
}

export const fetchOneParties = (partyId) => async dispatch => {
  const response = await fetch(`/api/parties/${partyId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(loadOne(data.party))
    return data.party;
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

export const checkPartyNameAvailability = (partyName) => async dispatch => {
    const response = await fetch(`/api/parties/${partyName}`);
    if (response.ok) {
      const data = await response.json();
      console.log('moment of truth', data)
      return data;
    }
    return false;
}

const partyReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD:{
            newState = Object.assign({}, state);
            if (action.allParties){
              const partyList = {}
              action.allParties.map(party => {
                partyList[party.id] = party
              });
                newState.allParties = partyList;
            };

            return newState;
        }
        case LOAD_ONE:{
            newState = Object.assign({}, state);
            if (action.party){
                newState.currentParty = action.party;
            };

            return newState;
        }

        default:
            return state;
    };
};

export default partyReducer;
