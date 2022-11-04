import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk from "redux-thunk";
import {appReducer} from "./appReducer";
import {authReducer} from "./authReducer";
import {usersReducer} from "./usersReducer";
import {postReducer} from "./postReducer";

const reducers = combineReducers({
    app: appReducer,
    auth: authReducer,
    post: postReducer,
    user: usersReducer,
})

export const store = legacy_createStore(reducers, applyMiddleware(thunk))