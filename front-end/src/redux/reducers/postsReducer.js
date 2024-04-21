import React from 'react'
import { ADD_COMMENT, DELETE_COMMENT, SET_COMMENTS } from '../actions/actions'

export default function postsReducer(state = [], action) {
  switch(action.type){
    case SET_COMMENTS:
        return action.payload
    case ADD_COMMENT:
        return [...state, action.payload]
    case DELETE_COMMENT:
        return state.filter(comment => comment.id !== action.payload.id);
  }
    return state
}
