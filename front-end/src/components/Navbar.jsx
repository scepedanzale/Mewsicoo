import React from 'react'
import { Link } from 'react-router-dom'
import useAuthContext from '../context/AuthContext'

export default function Navbar() {
  const {user, logout} = useAuthContext()

  return (
    <nav className="my-3 mx-2 rounded-3xl sticky-bottom text-sm md:text-lg main-color-bg">
      <div className="container-fluid p-3 flex justify-center">
        <div className="flex gap-2 justify-between w-80">
          <div>
            <Link to={'/'}>Home</Link>
          </div>
          <div>
            <Link to={'/'}>Search</Link>
          </div>
          <div>
            <Link to={'/profile'}>Profile</Link>
          </div>
          <div>
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
    </nav>
  )
}
