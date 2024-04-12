import React from 'react'
import { SET_POSTS, UPDATE_BIRTHDAY, UPDATE_EMAIL, UPDATE_INFO } from '../actions/actions';

export default function usersReducer(state = {}, action) {
    switch(action.type){
        case UPDATE_INFO:
            return {
                ...state,
                info: action.payload
            }
        case UPDATE_BIRTHDAY:
            return {
                ...state,
                birthDay: action.payload
            }
        case UPDATE_EMAIL:
            return {
                ...state,
                email: action.payload
            }
        case SET_POSTS:
            return {
                ...state,
                posts : action.payload
            }
    }
  return state;
}
