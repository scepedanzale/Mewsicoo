export const SET_TRACK_PLAYING = 'SET_TRACK_PLAYING';


export const setTrackPlaying = (value) => {
    return ({type: SET_TRACK_PLAYING, payload: value})
}