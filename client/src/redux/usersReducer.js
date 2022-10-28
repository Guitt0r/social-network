import {usersAPI} from "../api/api";

const SET_USERS_SUCCESS = 'usersPage/SET_USERS_SUCCESS'
const SET_USERS_FAILURE = 'usersPage/SET_USERS_FAILURE'

const initialState = {
    users: [],
    error: null
}
export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS_SUCCESS:
            return {
                ...state,
                users: action.users,
                error: null
            }
        case SET_USERS_FAILURE:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}

const setUsersSuccess = (users) => ({type: SET_USERS_SUCCESS, users})
const setUsersFailure = (error) => ({type: SET_USERS_FAILURE, error})

//get all users
export const getUsers = () => async (dispatch) => {
    try {
        const res = await usersAPI.getUsers()
        if (res.resultCode === 0)
            dispatch(setUsersSuccess(res.data))

    } catch (e) {
        dispatch(setUsersFailure(e.response.data.message))
    }
}

