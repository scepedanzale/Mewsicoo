import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className="container-fluid mt-10 h-100 md:w-5/6 lg:w-2/3 xl:w-1/2 2xl:w-2/5">
      <h1 className='font-bold text-3xl'>PAGE NOT FOUND</h1>
      <p className='text-xl'>Error 404</p>
      <button onClick={()=>navigate(-1)} className='btn main-color-btn mt-3'>back</button>
    </div>
  )
}
