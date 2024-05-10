import React from 'react'
import { Link } from 'react-router-dom'
import { server } from '../../api/axios'
import { useDispatch, useSelector } from 'react-redux';
import { ADD_FOLLOWING, REMOVE_FOLLOWING } from '../../redux/actions/actions';

export default function UserRowComponent({user}) {
    const dispatch = useDispatch();
    
    const loggedUser = useSelector(state => state.loggedUser)

    const unfollow = () => {
        server('api/user/unfollow/'+user.id)
        dispatch({type: REMOVE_FOLLOWING, payload: user})    // rimuovo un seguito a me
    }

    const follow = () => {
        server('api/user/follow/'+user.id)
        dispatch({type: ADD_FOLLOWING, payload: user})  // aggiungo a me un seguito
    }

  return (
      <div className='box user-row row post shadow-lg border-2 rounded-lg m-0 mb-4 p-2 h-100 justify-between items-center'>
            <Link to={`/profile/user/${user?.id}`} className='col-9 flex items-center p-0'>
                <div className="col-5 col-sm-3 p-0">
                    <div className="profile_img overflow-hidden flex justify-center items-center rounded-full h-16 w-16 sm:h-20 sm:w-20">
                        <img src={user?.profile_img} alt="profile image" className='object-cover h-full w-full'/>
                    </div>
                </div>
                <div className="col-7 p-0 px-2">
                    <p className='truncate font-bold'>{user?.username}</p>
                    <p className='truncate text-sm'>{user?.name}</p>
                </div>
            </Link>
            <div className="col-3 p-0 text-end">
                {user?.username !== loggedUser?.username ?
                    loggedUser?.followings.some(f => f.username === user?.username) ?
                        <button className='btn btn-sm empty-btn mt-3 w-2/3' onClick={unfollow}>
                            unfollow
                        </button>
                        : 
                        <button className='btn btn-sm colored-btn mt-3 w-2/3' onClick={follow}>
                            follow
                        </button>
                :
                ''
                }
            </div>
      </div>
  )
}