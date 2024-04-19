import React from 'react'
import { ADD_FOLLOWER, REMOVE_FOLLOWER, SET_OTHER_USER } from '../actions/actions';


export default function otherUserReducer(state = {}, action) {
    switch(action.type){
        case SET_OTHER_USER:
            return action.payload;

        case ADD_FOLLOWER:
            return {
                ...state,
                followers: [...state.followers, action.payload]
            };

        case REMOVE_FOLLOWER:
            return {
                ...state,
                followers: state.followers.filter(follower => follower.id !== action.payload.id)
            };

    }
  return state;
}