export const SET_TRACK_PLAYING = 'SET_TRACK_PLAYING';

export const UPDATE_INFO = 'UPDATE_INFO';
export const UPDATE_BIRTHDAY = 'UPDATE_BIRTHDAY';
export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const SET_POSTS = 'SET_POSTS';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST = 'UPDATE_POST';

export const SET_LOGGED_USER_FOLLOWERS = 'SET_LOGGED_USER_FOLLOWERS';
export const SET_LOGGED_USER_FOLLOWINGS = 'SET_LOGGED_USER_FOLLOWINGS';
export const SET_OTHER_USERS_FOLLOWERS = 'SET_OTHER_USERS_FOLLOWERS';
export const SET_OTHER_USERS_FOLLOWINGS = 'SET_OTHER_USERS_FOLLOWINGS';
export const ADD_FOLLOWER = 'ADD_FOLLOWER';
export const REMOVE_FOLLOWER = 'REMOVE_FOLLOWER';
export const ADD_FOLLOWING = 'ADD_FOLLOWING';
export const REMOVE_FOLLOWING = 'REMOVE_FOLLOWING';

/* MUSIC */

export const setTrackPlaying = (value) => {
    return ({type: SET_TRACK_PLAYING, payload: value})
}

/* LOGGED USER */

export const updateInfo = (data) => {
    return ({type: UPDATE_INFO, payload: data})
}
export const updateBirthDay = (birthDay) => {
    return ({type: UPDATE_BIRTHDAY, payload: birthDay})
}
export const updateEmail = (email) => {
    return ({type: UPDATE_EMAIL, payload: email})
}
export const setPosts = (data) => {
    return ({type: SET_POSTS, payload: data})
}
export const deletePost = (post) => {
    return ({type: DELETE_POST, payload: post})
}
export const updatePost = (text, id) => {
    return ({type: UPDATE_POST, payload: {text, id}})
}


/* FOLLOWS */

// follows logged user
export const setLoggedUserFollowers = (followers) => {
    return ({type: SET_LOGGED_USER_FOLLOWERS, payload: followers})
}
export const setLoggedUserFollowings = (followings) => {
    return ({type: SET_LOGGED_USER_FOLLOWINGS, payload: followings})
}
// follows other users
export const setOtherdUsersFollowers = (followers) => {
    return ({type: SET_OTHER_USERS_FOLLOWERS, payload: followers})
}
export const setOtherUserFollowings = (followings) => {
    return ({type: SET_OTHER_USERS_FOLLOWINGS, payload: followings})
}
// add follower
export const addFollower = (user) => {
    return ({type: ADD_FOLLOWER, payload: user})
}
// remove follower
export const removeFollower = (user) => {
    return ({type: REMOVE_FOLLOWER, payload: user})
}
// add following
export const addFollowing = (user) => {
    return ({type: ADD_FOLLOWING, payload: user})
}
// remove following
export const removeFollowing = (user) => {
    return ({type: REMOVE_FOLLOWING, payload: user})
}