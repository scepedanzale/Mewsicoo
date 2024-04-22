import React from 'react'
import { Link, useParams } from 'react-router-dom'
import SavedPostsComponent from './SavedPostsComponent'

export default function SavedComponent() {
    const {id, saved} = useParams()
  return (
    <div className="container-fluid h-100 md:w-5/6 lg:w-2/3 xl:w-1/2 2xl:w-2/5">
        <div className="container-fluid box rounded-lg p-2">
            <div className="row p-2">
                <div className="col-6 flex justify-center">
                    <Link to={`/user/${id}/saved/saved_posts`} className='main-color-btn text-white btn btn-sm w-100'>
                        {/*  <span className='font-bold'>{user?.followers.length}</span> */} Posts 
                    </Link>
                </div>
            </div>
        </div>
        <div className="container-fluid py-5 ">
                {saved === 'saved_posts' && 
                <>
                    <h1 className='font-bold text-white text-2xl mb-3'>Post salvati</h1>
                    <SavedPostsComponent/>
                </>
                }
            </div>
    </div>
  )
}
