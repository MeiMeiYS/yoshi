import { csrfFetch } from "./csrf";

const LOAD = 'parties/load';
const ADD_ONE = 'parties/addOne';

const load = allParties => ({
    type: LOAD,
    allParties,
  });

  const addOne = party => ({
    type: ADD_ONE,
    party,
  });

export const createParty = (requiredData) => async dispatch => {
    const response = await csrfFetch("/api/parties", {
        method: "POST",
        body: JSON.stringify(requiredData),
      });
    if (response.ok) {
      const party = await response.json();
      dispatch(addOne(party))
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
                console.log('there is action.body here')
                newState.party = action.allParties;
            };

            return newState;
        }
        case ADD_ONE:{
            newState = Object.assign({}, state);
            if (action.party){
                console.log('there is action.body here')
                newState.party = action.party;
            };

            return newState;
        }

        default:
            return state;
    };
};

export default partyReducer;
