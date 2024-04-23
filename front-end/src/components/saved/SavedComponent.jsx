import React, { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import SavedPostsComponent from './SavedPostsComponent'

export default function SavedComponent() {
    const {id, saved} = useParams()
    const location = useLocation()
    const {profileUser} = location.state

    useEffect(()=>{
        console.log(profileUser)
    },[profileUser])

  return (
    <div className="container-fluid h-100 md:w-5/6 lg:w-2/3 xl:w-1/2 2xl:w-2/5">
        {/* <div className="container-fluid box rounded-lg p-2">
            <div className="row p-2">
                <div className="col flex justify-center">
                    <Link to={`/user/${id}/saved/saved_posts`} className='main-color-btn text-white btn btn-sm w-100'>
                         Posts 
                    </Link>
                </div>
            </div>
        </div> */}
        <div className="container-fluid py-4 ">
                {saved === 'saved_posts' && 
                <>
                    <h1 className='font-bold text-white text-2xl mb-3'>Post salvati</h1>
                    <SavedPostsComponent user={profileUser}/>
                </>
                }
            </div>
    </div>
  )
}
