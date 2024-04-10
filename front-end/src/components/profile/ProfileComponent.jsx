import React from 'react'
import useAuthContext from '../../context/AuthContext'
import { Link } from 'react-router-dom';
import SinglePostComponent from '../posts/SinglePostComponent';
import { LuSettings } from "react-icons/lu";

export default function ProfileComponent() {
    const {user} = useAuthContext();
    console.log(user)

    return (
        user?.name &&
        <div className="container-fluid  md:px-32 lg:px-52 ">
            <div className="container-fluid order-1 order-sm-2 border-2 p-3 rounded-md">
                
                {/* info */}
                <div className="row relative flex justify-center items-center">
                    <div className="max-w-max">
                        <div className="profile_img overflow-hidden flex justify-center items-center rounded-full h-36 w-36 sm:h-48 sm:w-48">
                            <img src={user?.profile_img} alt="profile image" className='object-cover h-full w-full'/>
                        </div>
                    </div>
                    <div className="col md:text-lg">
                        <p className='font-bold text-gray-400'>{user?.username}</p>
                        <p>{user?.name}</p>
                        <Link to={'/profile'} className='main-color-btn text-white btn btn-sm mt-3'>modifica </Link>
                    </div>
                    <Link className='absolute top-0 right-0 max-w-max text-gray-500 text-2xl md:text-3xl'>
                        <LuSettings />
                    </Link>
                </div>

                {/* biography */}
                <div className="row mt-4">
                    <p className='text-sm md:text-base'>
                        {user?.biography}
                    </p>
                </div>

                {/* follow */}
                <div className="row my-2 mt-4">
                    <div className="col-4 flex justify-center">
                        <Link to={'/profile'} className='main-color-btn text-white btn btn-sm w-100'>
                            <span className='font-bold'>{user?.followers.length}</span> followers 
                        </Link>
                    </div>
                    <div className="col-4 flex justify-center">
                        <Link to={'/profile'} className='main-color-btn text-white btn btn-sm w-100'>
                            <span className='font-bold'>{user?.followings.length}</span> seguiti 
                        </Link>
                    </div>
                    <div className="col-4 flex justify-center">
                        <Link to={'/profile'} className='main-color-btn text-white btn btn-sm w-100'>salvati </Link>
                    </div>
                </div>
            </div>

            {/* post */}
            {user?.posts.length>0 &&
            <div className="container-fluid order-2 p-0 mt-3">
                {user?.posts && user.posts.map((p)=>(
                    <SinglePostComponent key={p.id} post={p}/>
                ))}
            </div>
            }
        </div>
  )
}
