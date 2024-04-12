import { applyMiddleware, combineReducers, createStore } from "redux"
import { thunk } from "redux-thunk"
import musicReducer from "../reducers/musicReducer"
import followsReducer from "../reducers/followsReducer"
import usersReducer from "../reducers/usersReducer"

const initialstate = {
    music : {
        trackPlaying : {}
    },
    loggedUser:{
        info : {},
        birthDay : '',
        email : '',
        posts : []
    },
    follows : {
        loggedUserFollowers : [],
        loggedUserFollowings : [],

        otherUsersFollowers : [],
        otherUsersFollowings : []
    }
}

const bigReducer = combineReducers({
    music : musicReducer,
    loggedUser : usersReducer,
    follows : followsReducer
})

export const store = createStore(bigReducer, initialstate);