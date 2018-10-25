import {SET_TRACK  } from "../actions/actionTypes";
const initialState = {
    tracks: [],
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TRACK:
            return {
                ...state,
                tracks: action.tracks
            };
        default:
            return state;
    }
};
export default reducer;



