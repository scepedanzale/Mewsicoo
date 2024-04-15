import React from 'react'
import { DELETE_POST, SET_POSTS, UPDATE_BIRTHDAY, UPDATE_EMAIL, UPDATE_INFO, UPDATE_POST } from '../actions/actions';

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
        case UPDATE_POST:
            const postIndex = state.posts.findIndex(post => post.id === action.payload.id);

            if (postIndex !== -1) {
                const updatedPosts = [...state.posts];

                updatedPosts[postIndex] = {
                    ...updatedPosts[postIndex],
                    text: action.payload.text
                };

                return {
                    ...state,
                    posts: updatedPosts
                }
            }
        case DELETE_POST:
            return{
                ...state,
                posts: [...state.posts.filter((f)=> f.id !== action.payload.id)]
            }
    }
  return state;
}
