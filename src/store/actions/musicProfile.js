import {SET_TRACK} from "./actionTypes";
import {uiStartLoading, uiStopLoading, authGetToken } from './index';
import axios from 'axios';



/******
 * Try Auto From Inputs
 */
/************
 * Get Tracks Data From The Server
 */
export const getTracks = () => {
    return dispatch => {
        dispatch(authGetToken())
            .catch(() => {
                alert("No valid token found!");
                dispatch(uiStopLoading());
            })
            .then(access_token => {
                 console.log(access_token)
        axios.get('https://webservice.musiqar.com/api/tracks/', {
            headers: {
                'content-type': 'application/json', "Authorization": `Bearer ${access_token}`
            }
        })
            .then(res => {
                dispatch(uiStartLoading());
                const response = JSON.parse(res.request._response);
                dispatch(uiStopLoading());

                 dispatch(setTrack(response.list.data));


                console.log(response.list.data[4].id)

            })
            .catch((err) => {
                dispatch(uiStopLoading());
                alert("Check Your Connection")
            })
            });
    };
};


/********
 * Set Tracks in Our Redux Store
 */
export const setTrack = tracks => {
    return {
        type: SET_TRACK,
        tracks: tracks
    };
};



