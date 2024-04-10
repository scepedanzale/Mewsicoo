import React, { useEffect, useState } from 'react'
import useAuthContext from '../context/AuthContext'
import {server} from '../api/axios'
import SinglePostComponent from './posts/SinglePostComponent'

export default function HomepageComponent() {
  const {user} = useAuthContext([])
  const [posts, setPosts] = useState([])
  const [postLoading, setPostLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(false)

  useEffect(()=>{
    setPostLoading(true)
    server.get('api/post')
    .then(response=> {
      setPostLoading(false)
      setPosts(response.data)
    })
    .catch(e => {
      console.error(e)
      setErrorMsg(true)
      setPostLoading(false)
    })
  }, [])
  
  

  return (
    <div className='container mx-auto m-3 md:px-32 lg:px-52 text-sm md:text-md lg:text-lg'>
        {postLoading && 
       <div className="loader mx-auto mb-5"></div>
      }

        {posts && posts.map((p)=>(
            <SinglePostComponent key={p.id} post={p}/>
        ))}
    </div>
  )
}
