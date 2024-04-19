import React from 'react'
import UserRowComponent from '../users/UserRowComponent';

export default function FollowersComponent({followers}) {
    
  return (
    followers?.length>0 ? followers.map((f)=>(
        <UserRowComponent key={f.id} user={f}/>
    ))
    :
    <p>Non ci sono followers</p>
  )
}
