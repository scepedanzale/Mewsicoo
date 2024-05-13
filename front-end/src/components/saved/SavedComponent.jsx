import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import SavedPostsComponent from './SavedPostsComponent'

export default function SavedComponent() {
    const {saved} = useParams()
    const location = useLocation()
    const {profileUser} = location.state

  return (
    <>
        <div className="container-fluid py-4 ">
            {saved === 'saved_posts' && 
            <>
                <h2 className='font-bold text-2xl mb-3'>Post salvati</h2>
                <SavedPostsComponent user={profileUser}/>
            </>
            }
        </div>
    </>
  )
}
