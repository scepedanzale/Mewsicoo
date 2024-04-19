import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { server } from '../../api/axios'
import { IoSearchOutline } from "react-icons/io5";
import FollowersComponent from './FollowersComponent'
import FollowingsComponent from './FollowingsComponent'
import useAuthContext from '../../context/AuthContext'
import { useSelector } from 'react-redux';

export default function FollowsComponent() {
    const {id, follows} = useParams()
    const loggedUser = useSelector(state => state.loggedUser)

    const [profileUser, setProfileUser] = useState({})
    const {user} = useAuthContext()

    const [followers, setFollowers] = useState('')
    const [followings, setFollowings] = useState('')

    const [searchParam, setSearchParam] = useState('')

    useEffect(()=>{
        server(`api/user/${id}`)
        .then(response => {
            setProfileUser(response.data[0])
        })
    }, [id])
    

    useEffect(()=>{
        if(searchParam){
            if(follows === 'followers'){
                const filteredFollowers = profileUser.followers.filter(user => {
                    return user.username.includes(searchParam) || user.name.includes(searchParam);
                });
                setFollowers(filteredFollowers);
            }else if(follows === 'followings'){
                const filteredFollowings = profileUser.followings.filter(user => {
                    return user.username.includes(searchParam) || user.name.includes(searchParam);
                });
                setFollowings(filteredFollowings);
            }
        }else{
            setFollowers(profileUser.followers)
            setFollowings(profileUser.followings)
        }
    },[searchParam, profileUser])

    
  return (
    <>
        <div className="container-fluid md:w-5/6 lg:w-2/3 xl:w-1/2 2xl:w-2/5">
            <div className="container-fluid box rounded-lg p-2">
                <div className="row">
                    <form action="" className='flex items-center gap-3 relative'>
                        <input 
                        type="text"
                        id="search"
                        name="search"
                        placeholder='Cerca...'
                        value={searchParam}
                        onChange={(e)=> setSearchParam(e.target.value)}
                        className='form-control my-3 rounded-full'
                        autofocus
                        />
                        <button type='button' className='btn absolute right-5 text-2xl text-gray-500 hover:text-gray-600'>
                            <IoSearchOutline/>
                        </button>
                    </form>
                </div>
                <div className="row p-2">
                    <div className="col-6 flex justify-center">
                        <Link to={`/user/${id}/followers`} className='main-color-btn text-white btn btn-sm w-100'>
                            {/*  <span className='font-bold'>{user?.followers.length}</span> */} Followers 
                        </Link>
                    </div>
                    <div className="col-6 flex justify-center">
                        <Link to={`/user/${id}/followings`} className='main-color-btn text-white btn btn-sm w-100'>
                            {/* <span className='font-bold'>{user?.followings.length}</span> */} Followings 
                        </Link>
                    </div>
                </div>
            </div>
            <div className="container-fluid py-5 ">
                {follows === 'followers' && 
                <>
                    {profileUser.username === loggedUser.username ?
                    <h1 className='font-bold text-white text-2xl mb-3'>I tuoi followers</h1>
                    :
                    <h1 className='font-bold text-white text-2xl mb-3'>I followers di {profileUser.username}</h1>
                    }
                    <FollowersComponent followers={followers}/>
                </>
                }
                {follows === 'followings' && 
                <>
                    {profileUser.username === loggedUser.username ?
                    <h1 className='font-bold text-white text-2xl mb-3'>I tuoi seguiti</h1>
                    :
                    <h1 className='font-bold text-white text-2xl mb-3'>I seguiti di {profileUser.username}</h1>
                    }
                    <FollowingsComponent followings={followings}/>
                </>
                }
            </div>
         </div>
    </>
  )
}
