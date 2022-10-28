import {getUserData} from "./authReducer";
import {toast} from "react-toastify";

const SET_INITIALIZE_SUCCESS = 'auth/SET_INITIALIZE_SUCCESS'

const initialState = {
    isInitialize: false,
}
export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZE_SUCCESS:
            return {
                ...state,
                isInitialize: true
            }
        default:
            return state
    }
}
//set isInitialize to true, if success
const setInitializeSuccess = () => ({type: SET_INITIALIZE_SUCCESS})

//wait for browser get user data(isAuth etc.), then initialize app
export const initializeApp = () => async (dispatch) => {
    try {
        await dispatch(getUserData())
        dispatch(setInitializeSuccess())
    } catch (e) {
        toast.error(e.response.data.message)
    }
}
