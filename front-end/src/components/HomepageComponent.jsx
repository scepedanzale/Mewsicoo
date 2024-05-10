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
  /* const posts = descendingOrderPost(followings) */
  const [posts, setPosts] = useState([])

  /* elenco post degli utenti che seguo + i miei */    //  problema: chiamo TUTTI gli utenti e pesa troppo
  /* useEffect(()=>{
    try{
      server('/api/user')
      .then(response => {
        console.log(response)
        setFollowings(response.data.filter(f => f.is_following || f.id === loggedUser.id))
      })
    }catch(err){
      console.log(err)
    }
  }, []) */

  /* useEffect(()=>{    // problema: non aggiorna in tempo reale likes ecc perchè non fa chiamate a db aggiornato
    if(loggedUser){
      const users = [loggedUser, ...loggedUser.followings];
      setFollowings(users);
    }
  }, [loggedUser]) */


  // chiamata all'utente loggato per avere i post dei followings aggiornati
  useEffect(()=>{
    try{
      server('/api/following-posts/')
      .then(response => {
        console.log(response)
        setPosts(response.data);
      })
    }catch(err){
      console.log(err)
    }
  }, [])
/*   useEffect(()=>{
    try{
      server('/api/user/'+loggedUser.id)
      .then(response => {
        console.log(response.data[0].followings)
        const users = [loggedUser, ...response.data[0].followings];
        setFollowings(users);
      })
    }catch(err){
      console.log(err)
    }
  }, []) */
  
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
