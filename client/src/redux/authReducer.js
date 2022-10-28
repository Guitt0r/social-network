import {authAPI} from "../api/api";
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
                ...action.payload,
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
            dispatch(setUserDataSuccess(res.data, true))
    } catch (e) {
        toast.error(e.response.data.message)
    }
}
//register new user
export const register = (data) => async (dispatch) => {
    try {
        const {email, username, password} = data
        const res = await authAPI.register(email, username, password)
        if (res.resultCode === 0)
            dispatch(getUserData())
    } catch (e) {
        toast.error(e.response.data.message)
    }
}
//login
export const login = (data) => async (dispatch) => {
    try {
        const {email, password} = data
        const res = await authAPI.login(email, password)
        if (res.resultCode === 0)
            dispatch(getUserData())
    } catch (e) {
        toast.error(e.response.data.message)
    }
}
//logout
export const logout = () => async (dispatch) => {
    try {
        const res = await authAPI.logout()
        if (res.resultCode === 0)
            dispatch(setUserDataSuccess({}, false))
    } catch (e) {
        toast.error(e.response.data.message)
    }

}
