import React from 'react'
import { ADD_COMMENT, ADD_LIKE, DELETE_COMMENT, DELETE_LIKE, SET_COMMENTS, SET_LIKES } from '../actions/actions'

export default function postsReducer(state = {}, action) {
  switch(action.type){
    case SET_COMMENTS:
        return {
          ...state,
          comments: action.payload
        }
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload]
      }
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.payload.id)
      }
    case SET_LIKES:
        return {
          ...state,
          likes: action.payload
        }
    case ADD_LIKE:
      return {
        ...state,
        likes: [...state.likes, action.payload]
      }
    case DELETE_LIKE:
      return {
        ...state,
        likes: state.likes.filter(like => like.id !== action.payload.id)
      }

  }
    return state
}
