import {postAPI} from "../api/api";
import {toast} from "react-toastify";

const SET_POSTS_SUCCESS = 'post/SET_POSTS_SUCCESS'
const ADD_POST_SUCCESS = 'post/ADD_POST_SUCCESS'
const CHANGE_POST_SUCCESS = 'post/CHANGE_POST_SUCCESS'
const DELETE_POST_SUCCESS = 'post/DELETE_POST_SUCCESS'
const initialState = {
    posts: [],
}
export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.posts,
            }
        case ADD_POST_SUCCESS:
            return {
                ...state,
                posts: [...state.posts, action.newPost]
            }
        case CHANGE_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post._id === action.post._id) {
                        return {...post, ...action.post}
                    }
                    return post
                })
            }
        case DELETE_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.post._id)
            }
        default:
            return state
    }
}

const setPostsSuccess = (posts) => ({type: SET_POSTS_SUCCESS, posts})
const addPostSuccess = (newPost) => ({type: ADD_POST_SUCCESS, newPost})
const changePostSuccess = (post) => ({type: CHANGE_POST_SUCCESS, post})
const deletePostSuccess = (post) => ({type: DELETE_POST_SUCCESS, post})

//get all posts
export const getUsersPosts = (userId) => async (dispatch) => {
    try {
        const res = await postAPI.getUsersPosts(userId)
        if (res.resultCode === 0)
            dispatch(setPostsSuccess(res.data))

    } catch (e) {
        //TODO:make logic for catch errors
    }
}
export const createPost = (text) => async (dispatch) => {
    try {
        const res = await postAPI.create(text)
        if (res.resultCode === 0)
            dispatch(addPostSuccess(res.data))

    } catch (e) {
        //TODO:make logic for catch errors
    }
}
export const updatePost = (postId, text) => async (dispatch) => {
    try {
        const res = await postAPI.update(postId, text)
        if (res.resultCode === 0)
            dispatch(changePostSuccess(res.data))

    } catch (e) {
        //TODO:make logic for catch errors
    }
}
export const deletePost = (postId) => async (dispatch) => {
    try {
        const res = await postAPI.delete(postId)
        if (res.resultCode === 0) {
            dispatch(deletePostSuccess(res.data))
            toast.success('Post has been deleted')
        }
    } catch (e) {
        console.log(e)
        //TODO:make logic for catch errors
    }
}
export const likePost = (postId) => async (dispatch) => {
    try {
        const res = await postAPI.like(postId)
        if (res.resultCode === 0)
            dispatch(changePostSuccess(res.data))

    } catch (e) {
        toast.error(e.response.data.message)
    }
}

