import {authAPI} from "../api/authAPI";
import {toast} from "react-toastify";

const SET_USER_DATA_SUCCESS = 'auth/SET_USER_DATA_SUCCESS'

const initialState = {
    id: null,
    email: null,
    username: null,
    isAuth: false
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA_SUCCESS:
            return {
                ...state,
                id: action.payload._id,
                email: action.payload.email,
                username: action.payload.username,
                isAuth: action.isAuth,
            }
        default:
            return state
    }
}
const setUserDataSuccess = (payload, isAuth) => ({type: SET_USER_DATA_SUCCESS, payload, isAuth})

//check if user authorized,if yes get his data and set it to state
export const getUserData = () => async (dispatch) => {
    try {
        const res = await authAPI.me()
        //if user is auth,set data
        if (res.resultCode === 0)
            dispatch(setUserDataSuccess(res.user, true))
    } catch (e) {
        toast.error(e.response.data.message)
    }
}
//register new user
export const register = (data) => async (dispatch) => {
    try {
        const {email, username, password} = data
        await authAPI.register(email, username, password)
        dispatch(getUserData())
    } catch (e) {
        toast.error(e.response.data.message)
    }
}
//login
export const login = (data) => async (dispatch) => {
    try {
        const {email, password} = data
        await authAPI.login(email, password)
        dispatch(getUserData())
    } catch (e) {
        toast.error(e.response.data.message)
    }
}
//logout
export const logout = () => async (dispatch) => {
    try {
        await authAPI.logout()
        dispatch(setUserDataSuccess({id: null, email: null, username: null}, false))
    } catch (e) {
        toast.error(e.response.data.message)
    }

}
