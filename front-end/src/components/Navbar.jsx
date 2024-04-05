import React from 'react'
import { Link } from 'react-router-dom'
import useAuthContext from '../context/AuthContext'

export default function Navbar() {
  const {user, logout} = useAuthContext()

  return (
    <nav className="bg-gray-300 my-auto">
      <div className="container-fluid p-4 flex">
        <div className="basis-1/2">
          <Link to={'/'}>Home</Link>
        </div>
        <div className="basis-1/2 flex justify-end">
          {user ? 
          <div className="ml-2">
            <button onClick={logout}>Logout</button>
          </div>
          :
          <>
            <div className="ml-2">
              <Link to={'/login'}>Login</Link>
            </div>
            <div className="ml-2">
            <Link to={'/register'}>Register</Link>
            </div>
          </>
          }
        </div>
      </div>
    </nav>
  )
}
