import React, { useEffect } from 'react'
import { server } from '../../api/axios'
import UserRowComponent from '../users/UserRowComponent';

export default function FollowersComponent({followers}) {
    
  return (
    followers ? followers.map((f)=>(
        <UserRowComponent key={f.id} f={f}/>
    ))
    :
    <p>Non ci sono followers</p>
  )
}
