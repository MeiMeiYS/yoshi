const SET_VIDEO_GAMES = 'videoGames/setVideoGames';

export const setVideoGames = (allGames) => {
    return {
        type: SET_VIDEO_GAMES,
        allGames
    };
};

export const getAllVideoGames = () => async dispatch => {
    const response = await fetch(`/api/videogames`);

    if (response.ok) {
      const data = await response.json();
      dispatch(setVideoGames(data.games));
      return;
    }
    //else: fail to login
}

const videoGameReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case SET_VIDEO_GAMES:{
            newState = Object.assign({}, state);
            if (action.allGames){
                const gameListObj = {};
                action.allGames.forEach(game => {
                    gameListObj[game.id] = game;
                });

                // make it go back in array in id order
                const length = action.allGames.length;
                const gameList = [];
                for (let i = 1; i <= length; i++){
                    gameList.push(gameListObj[i])
                }
                newState.gameList = gameList;
            }
            return newState;
        }

        default:
            return state;
    };
};

export default videoGameReducer;
