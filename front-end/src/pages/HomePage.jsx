import React, { useEffect, useState } from 'react'
import axios from '../api/axios'

export default function HomePage() {

  const [result, setResult] = useState([])

  useEffect(()=>{
    axios('api/user')
    .then(response => setResult(response.data))

  }, [])

  return (
    <div>{result && result.map((u)=>(
      <p>{u.name}</p>
    ))}</div>
  )
}
