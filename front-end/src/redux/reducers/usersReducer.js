import React from 'react'
import { ADD_FOLLOWER, ADD_FOLLOWING, REMOVE_FOLLOWER, REMOVE_FOLLOWING, SET_LOGGED_USER_FOLLOWERS, SET_LOGGED_USER_FOLLOWINGS, SET_OTHER_USERS_FOLLOWERS, SET_OTHER_USERS_FOLLOWINGS } from '../actions/actions'

export default function usersReducer(state = [], action) {
    switch(action.type){
        case SET_LOGGED_USER_FOLLOWERS:
            return{
                ...state,
                loggedUserFollowers: action.payload
            }
        case SET_LOGGED_USER_FOLLOWINGS:
            return{
                ...state,
                loggedUserFollowings: action.payload
            }
        case SET_OTHER_USERS_FOLLOWERS:
            return{
                ...state,
                otherUsersFollowers: action.payload
            }
        case SET_OTHER_USERS_FOLLOWINGS:
            return{
                ...state,
                otherUsersFollowings: action.payload
            }
        case ADD_FOLLOWER:
            return{
                ...state,
                otherUsersFollowers: [...state.otherUsersFollowers, action.payload]
            }
        case REMOVE_FOLLOWER:
            return{
                ...state,
                otherUsersFollowers: [...state.otherUsersFollowers.filter((f)=> f.username !== action.payload.username)]
            }
        case ADD_FOLLOWING:
            return{
                ...state,
                loggedUserFollowings: [...state.loggedUserFollowings, action.payload]
            }
        case REMOVE_FOLLOWING:
            return{
                ...state,
                loggedUserFollowings: [...state.loggedUserFollowings.filter((f)=> f.username !== action.payload.username)]
            }
        default:
            break;
    }
  return state
}
