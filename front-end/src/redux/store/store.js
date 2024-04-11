import { applyMiddleware, combineReducers, createStore } from "redux"
import { thunk } from "redux-thunk"
import musicReducer from "../reducers/musicReducer"
import usersReducer from "../reducers/usersReducer"

const initialstate = {
    music : {
        trackPlaying : {}
    },
    users : {
        loggedUserFollowers : [],
        loggedUserFollowings : [],

        otherUsersFollowers : [],
        otherUsersFollowings : []
    }
}

const bigReducer = combineReducers({
    music : musicReducer,
    users : usersReducer
})

export const store = createStore(bigReducer, initialstate);