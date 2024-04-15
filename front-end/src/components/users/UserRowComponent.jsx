import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { server } from '../../api/axios'
import { useDispatch } from 'react-redux';
import { addFollower, addFollowing, removeFollower, removeFollowing } from '../../redux/actions/actions';
import useAuthContext from '../../context/AuthContext';

export default function UserRowComponent({f}) {
    const dispatch = useDispatch();
    
    const {user} = useAuthContext();

    const [isFollowing, setIsFollowing] = useState(null)

    useEffect(()=>{
        server('api/user/is_following/'+f.id)
        .then(response => {
            setIsFollowing(response.data.is_following)
        })
        .catch(e => console.error(e))
    }, [f])

    const unfollow = () => {
        server('api/user/unfollow/'+f.id)
        setIsFollowing(false)
        dispatch(removeFollower(user))
        dispatch(removeFollowing(f))
    }

    const follow = () => {
        server('api/user/follow/'+f.id)
        setIsFollowing(true)
        dispatch(addFollower(user))
        dispatch(addFollowing(f))
    }

/*     useEffect(()=>{
        console.log(f)
    }, [f]) */

  return (
      <div className='row post border-2 rounded-lg m-0 mb-4 p-2 h-100 justify-between items-center'>
            <Link to={`/${f.username}`} className='col-9 flex items-center p-0'>
                <div className="col-5 col-sm-3 p-0">
                    <div className="profile_img overflow-hidden flex justify-center items-center rounded-full h-16 w-16 sm:h-20 sm:w-20">
                        <img src={f.profile_img} alt="profile image" className='object-cover h-full w-full'/>
                    </div>
                </div>
                <div className="col-7 p-0 px-2">
                    <p className='truncate font-bold'>{f.username}</p>
                    <p className='truncate text-sm'>{f.name}</p>
                </div>
            </Link>
            <div className="col-3 p-0 text-end">
                {f.username !== user.username ?
                isFollowing ? 
                    <button className='btn btn-sm bg-gray-400 hover:bg-gray-500 text-white w-100' onClick={unfollow}>unfollow</button>
                    : 
                    <button className='btn btn-sm main-color-btn w-100' onClick={follow}>follow</button>
                :
                ''
                }
            </div>
      </div>
  )
}
