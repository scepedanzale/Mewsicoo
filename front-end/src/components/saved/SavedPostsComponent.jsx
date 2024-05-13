import React from 'react'
import { useSelector } from 'react-redux'
import SinglePostComponent from '../posts/SinglePostComponent'

export default function SavedPostsComponent({user}) {
  const loggedUser = useSelector(state => state.loggedUser)

  console.log(user)

  return (
    user?.id == loggedUser?.id ? 
      loggedUser?.saved_posts?.length>0 ? loggedUser.saved_posts.map((p)=>(
          <SinglePostComponent key={p.id} post={p} user={p.user} className="shadow-lg"/>
      ))
      :
      <p>Non ci sono post salvati</p>
    :
      user?.saved_posts?.length>0 ? user.saved_posts.map((p)=>(
        <SinglePostComponent key={p.id} post={p} user={p.user} className="shadow-lg"/>
      ))
      :
      <p>Non ci sono post salvati</p>
  )
}
