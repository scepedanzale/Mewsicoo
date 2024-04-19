import React from 'react'
import UserRowComponent from '../users/UserRowComponent'

export default function FollowingsComponent({followings}) {
    
  return (
    followings?.length>0 ? followings.map((f)=>(
        <UserRowComponent user={f}/>
    ))
    :
    <p>Non ci sono followings</p>
  )
}
