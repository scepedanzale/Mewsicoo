import React, { useEffect, useState } from 'react'
import SinglePostComponent from './posts/SinglePostComponent'
import { descendingOrderPost } from '../functions/functions'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { server } from '../api/axios'
import InfiniteScroll from "react-infinite-scroll-component";

export default function HomepageComponent() {

  const [postLoading, setPostLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(false)
  
  const loggedUser = useSelector(state => state.loggedUser)
  const [posts, setPosts] = useState([])

  const offset= 0;
  const limit = 10;
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(2);

  // post utente loggato e followings
  useEffect(()=>{
    try{
      server(`/api/following-posts?offset=${offset}&limit=${limit}`)
      .then(response => {
        setPosts(response.data);
      })
    }catch(err){
      console.log(err)
    }
  }, [])

  window.addEventListener('DOMContentLoaded', ()=>{
    const div = document.querySelector('.outlet-div')
    
    div.addEventListener('scroll', ()=>{console.log('ciao')});
    console.log(div.offsetHeight)

  })
  
  return (
    <>
      {postLoading && <div className="loader mx-auto mb-5"></div>}
            
      {posts?.length>0 ? posts.map((p)=>(
        <SinglePostComponent key={p.id} post={p} user={p.user} className="shadow-lg"/>
      ))
        :
          <p>Non ci sono post da visualizzare...</p>
      }
    </>
  )
}
