import { applyMiddleware, combineReducers, createStore } from "redux"
import { thunk } from "redux-thunk"
import musicReducer from "../reducers/musicReducer"
//import followsReducer from "../reducers/followsReducer"
import otherUserReducer from "../reducers/otherUserReducer"
import loggedUserReducer from "../reducers/loggedUserReducer"
import postsReducer from "../reducers/postsReducer"

const initialstate = {
    music : {
        trackPlaying : {}
    },
    loggedUser:{},
    otherUser:{},
    comments: []
}

const bigReducer = combineReducers({
    music : musicReducer,
    loggedUser : loggedUserReducer,
    otherUser : otherUserReducer,
    comments: postsReducer
})

export const store = createStore(bigReducer, initialstate);