import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import SavedPostsComponent from './SavedPostsComponent'

export default function SavedComponent() {
    const {saved} = useParams()
    const location = useLocation()
    const {profileUser} = location.state

  return (
    <>
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
                <h2 className='font-bold text-white text-2xl mb-3'>Post salvati</h2>
                <SavedPostsComponent user={profileUser}/>
            </>
            }
        </div>
    </>
  )
}
