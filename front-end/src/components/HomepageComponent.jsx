import React, { useEffect, useState } from 'react'
import {server} from '../api/axios'
import SinglePostComponent from './posts/SinglePostComponent'

export default function HomepageComponent() {

  const [postLoading, setPostLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(false)
  const [users, setUsers] = useState([])

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
      {users && users.map((u)=>(
        u.is_following &&
        u.posts.map((p)=>(
            <SinglePostComponent key={p.id} post={p} user={u}/>
        ))
      ))}
    </div>
  )
}
