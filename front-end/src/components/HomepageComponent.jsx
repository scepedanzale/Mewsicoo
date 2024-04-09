import React, { useEffect, useState } from 'react'
import useAuthContext from '../context/AuthContext'
import {server} from '../api/axios'
import axios from 'axios'
import { apiKey, urlTrack } from '../api/config'
import SingleTrackComponent from './music/SingleTrackComponent'
import SinglePostComponent from './posts/SinglePostComponent'

export default function HomepageComponent() {
  const {user} = useAuthContext([])
  const [posts, setPosts] = useState([])

  useEffect(()=>{
    server.get('api/post')
    .then(response=> setPosts(response.data))
  }, [])

  return (
    <div className='container mx-auto m-10 px-10 md:px-40 grid grid-cols-1'>
        {posts && posts.map((p)=>(
            <SinglePostComponent post={p}/>
        ))}
    </div>
  )
}
