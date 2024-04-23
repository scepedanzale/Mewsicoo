import React, { useEffect, useState } from 'react'
import useAuthContext from '../../context/AuthContext'
import { Link, useParams } from 'react-router-dom';
import SinglePostComponent from '../posts/SinglePostComponent';
import { LuSettings } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { server } from '../../api/axios';
import { descendingOrderPost } from '../../functions/functions';
import { ADD_FOLLOWER, ADD_FOLLOWING, REMOVE_FOLLOWER, REMOVE_FOLLOWING, SET_OTHER_USER } from '../../redux/actions/actions';

export default function ProfileComponent() {
    const dispatch = useDispatch();
    
    const {id} = useParams()

    const loggedUser = useSelector(state => state.loggedUser) // utente loggato
    const otherUser = useSelector(state => state.otherUser) // altro utente
    
    const [profileUser, setProfileUser] = useState({}) // utente di cui vedere il profilo
    
    const [orderPosts, setOrderPosts] = useState([])

    useEffect(()=>{
        if(id != loggedUser.id){
            server(`api/user/${id}`)
            .then(response => {
                dispatch({type: SET_OTHER_USER, payload: response.data[0]})
                console.log(response.data)
            })
        }
    }, [id])

    useEffect(()=>{
        if(id == loggedUser.id){ // se username è uguale a utente loggato
            setProfileUser(loggedUser);   // setto utente loggato
        }else{
            setProfileUser(otherUser); 
        }
    }, [id, otherUser, loggedUser])
    
    const unfollow = () => {
        server('api/user/unfollow/'+profileUser.id)
        dispatch({type: REMOVE_FOLLOWING, payload: profileUser})    // rimuovo un seguito a me
        dispatch({type: REMOVE_FOLLOWER, payload: loggedUser})  // rimuovo un follower altro utente
    }
    const follow = () => {
        server('api/user/follow/'+profileUser.id)
        dispatch({type: ADD_FOLLOWING, payload: profileUser})  // aggiungo a me un seguito
        dispatch({type: ADD_FOLLOWER, payload: loggedUser})  //aggiungo un follower altro utente
    }
    
    useEffect(()=>{
        console.log(profileUser)
        console.log(loggedUser)
        console.log(otherUser)
        console.log(id)
    }, [profileUser, id, loggedUser, otherUser])


    // ordine discentente posts
    useEffect(()=>{
        if(profileUser?.posts){
            const orderPosts = descendingOrderPost(profileUser)
            setOrderPosts(orderPosts)
        }
    },[profileUser])


    return (
        profileUser?.name &&
        <div className="container-fluid h-100 md:w-5/6 lg:w-2/3 xl:w-1/2 2xl:w-2/5">
            <div className="container-fluid box shadow-lg order-1 order-sm-2 border-2 p-3 rounded-md">
                
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
                        <>
                            <Link to={'/account/edit'} className='main-color-btn text-white btn btn-sm mt-3 w-2/3'>modifica </Link>
                            <Link to={'/account/settings'} className='absolute top-0 right-2 max-w-max text-gray-500 text-2xl md:text-3xl hover:text-gray-700'>
                                <LuSettings />
                            </Link>
                        </>
                            :
                            <>
                                {profileUser?.followers?.some(f => f.username === loggedUser.username) ?
                                   <button className='btn btn-sm bg-gray-400 hover:bg-gray-500 text-white mt-3 w-2/3' onClick={unfollow}>
                                        unfollow
                                    </button>
                                    : 
                                    <button className='btn btn-sm main-color-btn mt-3 w-2/3' onClick={follow}>
                                        follow
                                    </button>
                                }
                            </>
                        }
                    </div>
                </div>

                {/* biography */}
                <div className="row mt-4">
                    <p className='text-sm md:text-base'>
                        {profileUser?.biography}
                    </p>
                    <p className='text-sm md:text-base mt-3 font-semibold'>Post: {profileUser?.posts?.length}</p>
                </div>

                {/* follow e saved*/}
                <div className="row my-2 mt-4">
                    <div className="col-4 flex justify-center">
                        <Link to={`/user/${profileUser.id}/follows/followers`} className='main-color-btn text-white btn btn-sm w-100 flex flex-col sm:flex-row justify-center sm:gap-1'>
                            <span className='font-bold'>{profileUser?.followers?.length}</span> followers 
                        </Link>
                    </div>
                    <div className="col-4 flex justify-center">
                        <Link to={`/user/${profileUser.id}/follows/followings`} className='main-color-btn text-white btn btn-sm w-100 flex flex-col sm:flex-row justify-center sm:gap-1'>
                            <span className='font-bold'>{profileUser?.followings?.length}</span> seguiti 
                        </Link>
                    </div>
                    <div className="col-4 flex justify-center">
                        <Link to={`/user/${profileUser.id}/saved/saved_posts`} state={{profileUser}} className='main-color-btn text-white btn btn-sm w-100 flex flex-col sm:flex-row justify-center sm:gap-1'>
                            <span className='font-bold'>{profileUser?.saved_posts?.length}</span> salvati 
                        </Link>
                    </div>
                </div>
            </div>

            {/* post */}
            <div className="container-fluid order-2 p-0 mt-3">
                {orderPosts ? orderPosts.map((p)=>(
                    <SinglePostComponent key={p.id} post={p} user={profileUser}/>
                ))
                :
                <p className='text-center mt-36 text-xl text-gray-500'>Non ci sono post</p>
                }
            </div>
        </div>
  )
}
