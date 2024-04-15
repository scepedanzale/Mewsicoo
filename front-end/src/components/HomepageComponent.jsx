import React, { useEffect, useState } from 'react'
import {server} from '../api/axios'
import SinglePostComponent from './posts/SinglePostComponent'
import { descendingOrderPost } from '../functions/functions'

export default function HomepageComponent() {

  const [postLoading, setPostLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(false)
  const [users, setUsers] = useState([])
  //const [posts, setPosts] = useState([])
  const posts = descendingOrderPost(users.filter((f)=>f.is_following))

  useEffect(()=>{
    setPostLoading(true)
    server.get('api/user')
    .then(response=> {
      setPostLoading(false)
      setUsers(response.data)
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
        <SinglePostComponent key={p.post.id} post={p.post} user={p.user}/>
      ))}
    </div>
  )
}
