import {profileAPI} from "../api/api";
import {toast} from "react-toastify";

const SET_PROFILE_DATA_SUCCESS = 'profilePage/SET_PROFILE_DATA_SUCCESS'

const initialState = {
    profile: null,
}
export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE_DATA_SUCCESS:
            return {
                ...state,
                profile: action.profile,
            }
        default:
            return state
    }
}

const setProfileDataSuccess = (profile) => ({type: SET_PROFILE_DATA_SUCCESS, profile})

//get profiles data
export const getProfile = (profileId) => async (dispatch) => {
    try {
        const res = await profileAPI.getProfile(profileId)
        if (res.resultCode === 0)
            dispatch(setProfileDataSuccess(res.data))

    } catch (e) {
        toast.error(e.response.data.message)
    }
}
//save changes in Profile
export const saveProfile = (profile) => async (dispatch) => {
    try {
        const res = await profileAPI.saveProfile(profile)
        if (res.resultCode === 0)
            dispatch(setProfileDataSuccess(res.data))
    } catch (e) {
        toast.error(e.response.data.message)
    }
}
//save profile's photo
export const savePhoto = (photo) => async (dispatch) => {
    try {
        const res = await profileAPI.savePhoto(photo)
        if (res.resultCode === 0)
            dispatch(setProfileDataSuccess(res.data))
    } catch (e) {
        toast.error(e.response.data.message)
    }
}
