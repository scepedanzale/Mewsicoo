export const SET_TRACK_PLAYING = 'SET_TRACK_PLAYING';

export const SET_LOGGED_USER_FOLLOWERS = 'SET_LOGGED_USER_FOLLOWERS';
export const SET_LOGGED_USER_FOLLOWINGS = 'SET_LOGGED_USER_FOLLOWINGS';
export const SET_OTHER_USERS_FOLLOWERS = 'SET_OTHER_USERS_FOLLOWERS';
export const SET_OTHER_USERS_FOLLOWINGS = 'SET_OTHER_USERS_FOLLOWINGS';

export const ADD_FOLLOWER = 'ADD_FOLLOWER';
export const REMOVE_FOLLOWER = 'REMOVE_FOLLOWER';
export const ADD_FOLLOWING = 'ADD_FOLLOWING';
export const REMOVE_FOLLOWING = 'REMOVE_FOLLOWING';


export const setTrackPlaying = (value) => {
    return ({type: SET_TRACK_PLAYING, payload: value})
}

/* follows logged user */
export const setLoggedUserFollowers = (followers) => {
    return ({type: SET_LOGGED_USER_FOLLOWERS, payload: followers})
}
export const setLoggedUserFollowings = (followings) => {
    return ({type: SET_LOGGED_USER_FOLLOWINGS, payload: followings})
}
/* follows other users */
export const setOtherdUsersFollowers = (followers) => {
    return ({type: SET_OTHER_USERS_FOLLOWERS, payload: followers})
}
export const setOtherUserFollowings = (followings) => {
    return ({type: SET_OTHER_USERS_FOLLOWINGS, payload: followings})
}



export const addFollower = (user) => {
    return ({type: ADD_FOLLOWER, payload: user})
}
export const removeFollower = (user) => {
    return ({type: REMOVE_FOLLOWER, payload: user})
}
export const addFollowing = (user) => {
    return ({type: ADD_FOLLOWING, payload: user})
}
export const removeFollowing = (user) => {
    return ({type: REMOVE_FOLLOWING, payload: user})
}