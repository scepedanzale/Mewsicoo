import React, { useEffect, useState } from 'react'
import useAuthContext from '../context/AuthContext'
import {server} from '../api/axios'
import axios from 'axios'
import { apiKey, urlTrack } from '../api/config'
import SingleTrackComponent from '../components/SingleTrackComponent'

export default function HomePage() {

  const {user} = useAuthContext([])
  const [posts, setPosts] = useState([])
  

  useEffect(()=>{
    server.get('api/post')
    .then(response=> setPosts(response.data))
  }, [])

  return (
    <div className='container mx-auto m-10 px-10 md:px-40 grid grid-cols-1'>
        {posts && posts.map((p)=>(
          <div className='border-2 rounded-lg flex grid grid-cols-3 mb-5 p-3 gap-3'>
            <SingleTrackComponent track_id={p.track_id} post_id={p.id}/>
            <div className='col-span-3 sm:col-span-2'>
              <p className='font-bold mb-2'>{p.user.username}</p>
              <p className='text-gray-700'>{p.text}</p>
            </div>
          </div>
        ))}
    </div>
  )
}
