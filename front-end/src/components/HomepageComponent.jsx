import React, { useEffect, useState } from 'react'
import SinglePostComponent from './posts/SinglePostComponent'
import { descendingOrderPost } from '../functions/functions'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { server } from '../api/axios'

export default function HomepageComponent() {

  const [postLoading, setPostLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(false)
  
  const loggedUser = useSelector(state => state.loggedUser)
  const [followings, setFollowings] = useState([])
  const users = [loggedUser, ...followings]
  const posts = descendingOrderPost(users)

  useEffect(()=>{
    console.log(loggedUser)
    console.log(posts)
    console.log(users)    // inserire i miei post
  }, [loggedUser, users, posts])

  useEffect(()=>{
    try{
      server('/api/user')
      .then(response => {
        setFollowings(response.data.filter(f => f.is_following))
        console.log(response.data)
      })
    }catch(err){
      console.log(err)
    }
  },[])

  useEffect(()=>{
    console.log(followings)
  }, [followings])
 
  
  return (
    <div className='container mx-auto p-3 md:w-5/6 lg:w-2/3 xl:w-1/2 2xl:w-2/5'>
      {postLoading && 
        <div className="loader mx-auto mb-5"></div>
      }
      {postLoading && 
        <div className="loader mx-auto mb-5"></div>
      }
      {posts.length>0 ? posts.map((p)=>(
        <SinglePostComponent key={p.post.id} post={p.post} user={p.user} className="shadow-lg"/>
      ))
        :
          <p>Non ci sono post da visualizzare...</p>
      }
    </div>
  )
}
