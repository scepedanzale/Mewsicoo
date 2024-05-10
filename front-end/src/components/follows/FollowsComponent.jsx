import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { server } from '../../api/axios'
import { IoSearchOutline } from "react-icons/io5";
import FollowersComponent from './FollowersComponent'
import FollowingsComponent from './FollowingsComponent'
import useAuthContext from '../../context/AuthContext'
import { useSelector } from 'react-redux';

export default function FollowsComponent() {
    const navigate = useNavigate()
    const {id, follows} = useParams()
    const loggedUser = useSelector(state => state.loggedUser)

    const [profileUser, setProfileUser] = useState({})
    const {user} = useAuthContext()

    const [followers, setFollowers] = useState('')
    const [followings, setFollowings] = useState('')

    const [searchParam, setSearchParam] = useState('')

    /* chiamata user */
    useEffect(()=>{
        server(`api/user/${id}`)
        .then(response => {
            setProfileUser(response.data[0])
        })
    }, [id])
    
    /* ricerca followers - followings */
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
            }else{
                navigate(-1)
            }
        }else{
            setFollowers(profileUser.followers)
            setFollowings(profileUser.followings)
        }
    },[searchParam, profileUser])

    
  return (
    <>
            <div className="container-fluid box rounded-lg p-2">
                {/* search */}
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
                {/* buttons */}
                <div className="row p-2">
                    <div className="col-6 flex justify-center">
                        <Link to={`/user/${id}/follows/followers`} className={`btn btn-sm w-100 ${follows === 'followers' ? 'colored-btn' : 'empty-btn'}`}>Followers </Link>
                    </div>
                    <div className="col-6 flex justify-center">
                        <Link to={`/user/${id}/follows/followings`} className={`btn btn-sm w-100 ${follows === 'followings' ? 'colored-btn' : 'empty-btn'}`}>Followings </Link>
                    </div>
                </div>
            </div>
            <div className="container-fluid py-5 ">
                {follows === 'followers' && 
                <>
                    <h2 className='font-bold text-2xl mb-3'>
                        {profileUser.username === loggedUser.username ? 
                        <>I tuoi followers</>
                        : 
                        <>I followers di {profileUser.username}</>
                        }
                    </h2>
                                        
                    <FollowersComponent followers={followers}/>
                </>
                }
                {follows === 'followings' && 
                <>
                    <h2 className='font-bold text-2xl mb-3'>
                        {profileUser.username === loggedUser.username ? 
                        <>I tuoi seguiti</>
                        : 
                        <>I seguiti di {profileUser.username}</>
                        }
                    </h2>
                    <FollowingsComponent followings={followings}/>
                </>
                }
            </div>
    </>
  )
}