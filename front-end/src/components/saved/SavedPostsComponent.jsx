import React from 'react'
import { useSelector } from 'react-redux'
import SinglePostComponent from '../posts/SinglePostComponent'

export default function SavedPostsComponent() {

    const loggedUser = useSelector(state => state.loggedUser)

  return (
    loggedUser?.saved_posts && loggedUser.saved_posts.map((p)=>(
      <>
        {console.log(loggedUser)}
        <SinglePostComponent key={p.id} post={p} user={p.user} className="shadow-lg"/>
      </>
    ))
  )
}
