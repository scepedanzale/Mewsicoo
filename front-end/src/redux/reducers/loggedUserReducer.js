import React from 'react'
import { SET_LOGGED, UPDATE_NAME, UPDATE_USERNAME, UPDATE_PROFILE_IMG, UPDATE_EMAIL, UPDATE_BIRTHDAY, ADD_POST, UPDATE_POST, DELETE_POST, ADD_FOLLOWER, REMOVE_FOLLOWER, ADD_FOLLOWING, REMOVE_FOLLOWING, UPDATE_BIOGRAPHY, REMOVE_LIKE_FROM_POST, ADD_LIKE_TO_POST, REMOVE_SAVED_POST, ADD_SAVED_POST } from '../actions/actions';

export default function loggedUserReducer(state = {}, action) {
  switch (action.type) {
    case SET_LOGGED:
      return action.payload;

    case UPDATE_NAME:
      return {
        ...state,
        name: action.payload
      };

    case UPDATE_USERNAME:
      return {
        ...state,
        username: action.payload
      };

    case UPDATE_BIOGRAPHY:
      return {
        ...state,
        biography: action.payload
      };

    case UPDATE_PROFILE_IMG:
      return {
        ...state,
        profile_img: action.payload
      };

    case UPDATE_EMAIL:
      return {
        ...state,
        email: action.payload
      };

    case UPDATE_BIRTHDAY:
      return {
        ...state,
        birth_day: action.payload
      };

    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      };

    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map(post => post.id === action.payload.id ? action.payload : post)
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload.id)
      };

    case ADD_FOLLOWING:
      return {
        ...state,
        followings: [...state.followings, action.payload]
      };

    case REMOVE_FOLLOWING:
      return {
        ...state,
        followings: state.followings.filter(following => following.id !== action.payload.id)
      };
    case ADD_SAVED_POST:
      return {
        ...state,
        saved_posts: [...state.saved_posts, action.payload]
      };

    case REMOVE_SAVED_POST:
      return {
        ...state,
        saved_posts: state.saved_posts.filter(post => post.id !== action.payload.id)
      };

      /* case ADD_LIKE_TO_POST:
      return {
        ...state,
        followings: state.followings.map(following => {
          if (following?.user_id == action.payload.user_id) {
            return {
              ...following,
              posts: following.posts.map(post => {
                if (post.post_id == action.payload.post_id) {
                  return {
                    ...post,
                    likes: [...post.likes, action.payload]
                  };
                }
                return post;
              })
            };
          }
          return following;
        })
      };
    case REMOVE_LIKE_FROM_POST:
      return {
        ...state,
        followings: state.followings.map(following => {
          if (following?.user_id === action.payload.user_id) {
            return {
              ...following,
              posts: following.posts.map(post => {
                if (post.post_id === action.payload.post_id) {
                  return {
                    ...post,
                    likes: post.likes.filter(like => like.user_id !== action.payload.user_id)
                  };
                }
                return post;
              })
            };
          }
          return following;
        })
      };
 */
    default:
      return state;
  }
}