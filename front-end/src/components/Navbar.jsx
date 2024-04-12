import React from 'react'
import { Link } from 'react-router-dom'
import useAuthContext from '../context/AuthContext'

export default function Navbar() {
  const {user, logout} = useAuthContext()

  return (
    <nav className="my-3 mx-2 rounded-3xl sticky-top top-4 text-sm md:text-lg main-color-bg">
      <div className="container-fluid p-3 flex justify-center">
        <div className="flex gap-2 justify-between w-80">
          <div>
            <Link to={'/'}>Home</Link>
          </div>
          <div>
            <Link to={'/'}>Search</Link>
          </div>
          <div>
            <Link to={'/'}>+</Link>
          </div>
          <div>
            <Link to={`/${user.username}`}>Profile</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
