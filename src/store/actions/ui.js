import {UI_START_LOADING , UI_STOP_LOADING} from "./actionTypes";
/************
 * This Const Call The Reducer To START Loading The Spinner When We DO SomeThing
 */
export  const uiStartLoading = () =>{
    return {
        type: UI_START_LOADING
    };
};
/************
 * This Const Call The Reducer To STOP Loading The Spinner When We DO SomeThing
 */
export  const uiStopLoading = ()=>{
    return {

        type: UI_STOP_LOADING
    };
};