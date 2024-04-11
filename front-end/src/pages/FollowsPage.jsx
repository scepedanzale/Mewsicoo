import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { server } from '../api/axios'
import FollowersComponent from '../components/follows/FollowersComponent'
import FollowingsComponent from '../components/follows/FollowingsComponent'
import useAuthContext from '../context/AuthContext'

export default function FollowsPage() {
    const {username} = useParams()
    const {follows} = useParams()

    const [followers, setFollowers] = useState('')
    const [followings, setFollowings] = useState('')

    const [profileUser, setProfileUser] = useState({})
    const {user} = useAuthContext()

    useEffect(()=>{
        if(follows === 'followers'){
            setFollowings()
            setFollowers(follows)
        }else if(follows === 'followings'){
            setFollowers()
            setFollowings(follows)
        }
    }, [follows])

    useEffect(()=>{
        server(`api/user/${username}`)
        .then(response => {
            setProfileUser(response.data[0])
        })
    }, [username])
    
    useEffect(()=>{
        console.log(profileUser)
    }, [profileUser])

    
  return (
    <>
        <div className="container-fluid md:w-5/6 lg:w-2/3 xl:w-1/2 2xl:w-2/5">
            <div className="row px-2">
                <div className="col-6 flex justify-center">
                    <Link to={`/${username}/followers`} className='main-color-btn text-white btn btn-sm w-100'>
                        {/*  <span className='font-bold'>{user?.followers.length}</span> */} Followers 
                    </Link>
                </div>
                <div className="col-6 flex justify-center">
                    <Link to={`/${username}/followings`} className='main-color-btn text-white btn btn-sm w-100'>
                        {/* <span className='font-bold'>{user?.followings.length}</span> */} Followings 
                    </Link>
                </div>
            </div>
            <div className="container-fluid py-5 ">
                {followers === 'followers' && 
                <>
                    {profileUser.username === user.username ?
                    <h1 className='font-bold text-2xl mb-3'>I tuoi followers</h1>
                    :
                    <h1 className='font-bold text-2xl mb-3'>I followers di {profileUser.username}</h1>
                    }
                    <FollowersComponent followers={profileUser?.followers}/>
                </>
                }
                {followings === 'followings' && 
                <>
                    {profileUser.username === user.username ?
                    <h1 className='font-bold text-2xl mb-3'>I tuoi seguiti</h1>
                    :
                    <h1 className='font-bold text-2xl mb-3'>I seguiti di {profileUser.username}</h1>
                    }
                    <FollowingsComponent followings={profileUser?.followings}/>
                </>
                }
            </div>
         </div>
    </>
  )
}
