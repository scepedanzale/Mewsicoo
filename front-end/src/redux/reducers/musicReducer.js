import React from 'react'
import {SET_TRACK_PLAYING} from '../actions/actions';

export default function musicReducer(state={}, action) {
  switch(action.type){
    case SET_TRACK_PLAYING:
        return{
            ...state,
            trackPlaying: action.payload
        }
  }
  return state;
}
