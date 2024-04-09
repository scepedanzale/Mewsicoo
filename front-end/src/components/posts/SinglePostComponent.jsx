import React from 'react'
import SingleTrackComponent from '../SingleTrackComponent'

export default function SinglePostComponent({post}) {
  return (
        <div className='border-2 rounded-lg flex grid grid-cols-3 mb-5 p-3 gap-3'>
            <SingleTrackComponent track_id={post.track_id} post_id={post.id}/>
            <div className='col-span-3 sm:col-span-2'>
              <p className='font-bold mb-2'>{post.user.username}</p>
              <p className='text-gray-700'>{post.text}</p>
            </div>
        </div>
  )
}
