import {usersAPI} from "../api/usersAPI";
import {setPostsSuccess} from "./postReducer";
import {toast} from "react-toastify";

const SET_USERS_SUCCESS = 'users/SET_USERS_SUCCESS'
const TOGGLE_FOLLOW_USER_SUCCESS = 'users/TOGGLE_FOLLOW_USER_SUCCESS'
const SET_USER_PROFILE_SUCCESS = 'users/SET_USER_PROFILE_SUCCESS'

const initialState = {
    users: [],
    userProfile: null
}
export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS_SUCCESS:
            return {
                ...state,
                users: action.users,
            }
        case SET_USER_PROFILE_SUCCESS:
            return {
                ...state,
                userProfile: action.userProfile
            }
        case TOGGLE_FOLLOW_USER_SUCCESS:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user._id === action.user._id)
                        return {...user, ...action.user}
                    return user
                })
            }
        default:
            return state
    }
}

export const setUsersSuccess = (users) => ({type: SET_USERS_SUCCESS, users})
export const setUserProfileSuccess = (userProfile) => ({type: SET_USER_PROFILE_SUCCESS, userProfile})
export const toggleFollowUserSuccess = (user) => ({type: TOGGLE_FOLLOW_USER_SUCCESS, user})

//get all users
export const getUsers = () => async (dispatch) => {
    try {
        const res = await usersAPI.getUsers()
        dispatch(setUsersSuccess(res.users))

    } catch (e) {
        //TODO:make logic
    }
}
export const getUserProfile = (userId) => async (dispatch) => {
    try {
        const res = await usersAPI.getOneUser(userId)
        dispatch(setUserProfileSuccess(res.user))
        dispatch(setPostsSuccess(res.posts))
    } catch (e) {
        //TODO:make logic
    }
}
export const saveUserProfile = (profile) => async (dispatch) => {
    try {
        const res = await usersAPI.saveProfile(profile)
        dispatch(setUserProfileSuccess(res.user))

    } catch (e) {
        //TODO:make logic
    }
}
export const saveUserPhoto = (photo) => async (dispatch) => {
    try {
        const res = await usersAPI.savePhoto(photo)
        dispatch(setUserProfileSuccess(res.user))

    } catch (e) {
        //TODO:make logic
    }
}
export const toggleFollowUser = (userId) => async (dispatch) => {
    try {
        const res = await usersAPI.follow(userId)
        dispatch(toggleFollowUserSuccess(res.user))
    } catch (e) {
        toast.error(e.response.data.message)
    }
}

