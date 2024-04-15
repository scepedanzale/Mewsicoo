import React, { useEffect } from 'react'
import UserRowComponent from '../users/UserRowComponent'

export default function SearchUsers({users}) {

    useEffect(()=>{
        console.log(users)
    }, [users])

  return (
    users && users.map((u)=>(
        <UserRowComponent f={u}/>
    ))
  )
}
