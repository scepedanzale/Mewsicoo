import React, { useEffect, useState } from 'react'
import useAuthContext from '../context/AuthContext'

export default function HomePage() {

  const {user} = useAuthContext([])

  return (
    <div>{user?.name}</div>
  )
}
