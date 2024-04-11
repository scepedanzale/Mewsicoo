import React, { useEffect } from 'react'
import UserRowComponent from '../users/UserRowComponent'

export default function FollowingsComponent({followings}) {
    
  return (
    followings ? followings.map((f)=>(
        <UserRowComponent f={f}/>
    ))
    :
    <p>Non ci sono followings</p>
  )
}
