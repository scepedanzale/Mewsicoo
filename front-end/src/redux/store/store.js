import { applyMiddleware, combineReducers, createStore } from "redux"
import { thunk } from "redux-thunk"
import musicReducer from "../reducers/musicReducer"
//import followsReducer from "../reducers/followsReducer"
import otherUserReducer from "../reducers/otherUserReducer"
import loggedUserReducer from "../reducers/loggedUserReducer"

const initialstate = {
    music : {
        trackPlaying : {}
    },
    loggedUser:{},
    otherUser:{},
}

const bigReducer = combineReducers({
    music : musicReducer,
    loggedUser : loggedUserReducer,
    otherUser : otherUserReducer
})

export const store = createStore(bigReducer, initialstate);