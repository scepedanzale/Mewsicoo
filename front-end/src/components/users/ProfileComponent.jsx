import React, { useEffect, useState } from 'react'
import useAuthContext from '../../context/AuthContext'
import { Link, useParams } from 'react-router-dom';
import SinglePostComponent from '../posts/SinglePostComponent';
import { LuSettings } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { server } from '../../api/axios';
import { addFollower, addFollowing, removeFollower, removeFollowing, setOtherUserFollowings, setOtherdUsersFollowers } from '../../redux/actions/actions';

export default function ProfileComponent() {
    const dispatch = useDispatch();
    
    const {username} = useParams()
    const {user} = useAuthContext();
    const loggedUser = useSelector(state => state.loggedUser.info)
    const loggedUserPosts = useSelector(state => state.loggedUser.posts)

    const [profileUser, setProfileUser] = useState({})

    const followers = useSelector(state => username === user.username ? state.follows.loggedUserFollowers : state.follows.otherUsersFollowers)
    const followings = useSelector(state => username === user.username ? state.follows.loggedUserFollowings : state.follows.otherUsersFollowings)

    useEffect(()=>{
        if(username === user.username){
            setProfileUser(prevState => ({
                ...loggedUser,
                posts: loggedUserPosts
            }));
        }else{
            server(`api/user/${username}`)
            .then(response => {
                setProfileUser(response.data[0])
                dispatch(setOtherdUsersFollowers(response.data[0].followers))
                dispatch(setOtherUserFollowings(response.data[0].followings))
            })
        }
    }, [username])
    
    const unfollow = () => {
        server('api/user/unfollow/'+profileUser.id)
        dispatch(removeFollower(user))
        dispatch(removeFollowing(profileUser))
    }
    const follow = () => {
        server('api/user/follow/'+profileUser.id)
        dispatch(addFollower(user))
        dispatch(addFollowing(profileUser))
    }
    
    useEffect(()=>{
        console.log(loggedUser)
        console.log(loggedUserPosts)
        console.log(profileUser)
        console.log(user)
        console.log(followers)
        console.log(followings)
    }, [followers, followings, profileUser, loggedUser, user, loggedUserPosts])


    return (
        profileUser?.name &&
        <div className="container-fluid md:w-5/6 lg:w-2/3 xl:w-1/2 2xl:w-2/5">
            <div className="container-fluid order-1 order-sm-2 border-2 p-3 rounded-md">
                
                {/* info */}
               <div className="row relative flex justify-center items-center">
                    <div className="max-w-max">
                        <div className="profile_img overflow-hidden flex justify-center items-center rounded-full h-24 w-24 sm:h-48 sm:w-48">
                            <img src={profileUser?.profile_img} alt="profile image" className='object-cover h-full w-full'/>
                        </div>
                    </div>
                    <div className="col md:text-lg">
                        <p className='font-bold text-gray-400'>{profileUser?.username}</p>
                        <p>{profileUser?.name}</p>
                        {profileUser?.username === loggedUser.username ?
                            <Link to={'/account/edit'} className='main-color-btn text-white btn btn-sm mt-3 w-1/3'>modifica </Link>
                            :
                            <>
                                {followers?.some(f => f.username === loggedUser.username) ?
                                   <button className='btn btn-sm bg-gray-400 hover:bg-gray-500 text-white mt-3 w-2/3' onClick={unfollow}>
                                        rimuovi
                                    </button>
                                    : 
                                    <button className='btn btn-sm main-color-btn mt-3 w-2/3' onClick={follow}>
                                        segui
                                    </button>
                                }
                            </>
                        }
                    </div>
                    <Link className='absolute top-0 right-0 max-w-max text-gray-500 text-2xl md:text-3xl'>
                        <LuSettings />
                    </Link>
                </div>

                {/* biography */}
                <div className="row mt-4">
                    <p className='text-sm md:text-base'>
                        {profileUser?.biography}
                    </p>
                </div>

                {/* follow */}
                <div className="row my-2 mt-4">
                    <div className="col-4 flex justify-center">
                        <Link to={`/${profileUser.username}/followers`} className='main-color-btn text-white btn btn-sm w-100'>
                            <span className='font-bold'>{followers?.length}</span> followers 
                        </Link>
                    </div>
                    <div className="col-4 flex justify-center">
                        <Link to={`/${profileUser.username}/followings`} className='main-color-btn text-white btn btn-sm w-100'>
                            <span className='font-bold'>{followings?.length}</span> seguiti 
                        </Link>
                    </div>
                    <div className="col-4 flex justify-center">
                        <Link to={'/profile'} className='main-color-btn text-white btn btn-sm w-100'>salvati </Link>
                    </div>
                </div>
            </div>

            {/* post */}
            {user.posts.length>0 &&
            <div className="container-fluid order-2 p-0 mt-3">
                {profileUser?.posts && profileUser.posts.map((p)=>(
                    <SinglePostComponent key={p.id} post={p}/>
                ))}
            </div>
            }
        </div>
  )
}
