import { applyMiddleware, combineReducers, createStore } from "redux"
import { thunk } from "redux-thunk"
import musicReducer from "../reducers/musicReducer"

const initialstate = {
    music : {
        trackPlaying : {}
    }
}

const bigReducer = combineReducers({
    music : musicReducer
})

export const store = createStore(bigReducer, initialstate);