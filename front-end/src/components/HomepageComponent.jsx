import React, { useEffect, useState } from 'react'
import {server} from '../api/axios'
import SinglePostComponent from './posts/SinglePostComponent'

export default function HomepageComponent() {

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
    <div className='container mx-auto p-3 md:w-5/6 lg:w-2/3 xl:w-1/2 2xl:w-2/5'>
        {postLoading && 
       <div className="loader mx-auto mb-5"></div>
      }

        {posts && posts.map((p)=>(
            <SinglePostComponent key={p.id} post={p} user={p.user}/>
        ))}
    </div>
  )
}
