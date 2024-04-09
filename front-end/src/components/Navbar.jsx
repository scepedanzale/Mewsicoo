import React from 'react'
import { Link } from 'react-router-dom'
import useAuthContext from '../context/AuthContext'

export default function Navbar() {
  const {user, logout} = useAuthContext()

  return (
    <nav className="main-color-border m-5 rounded-3xl sticky top-4">
      <div className="container-fluid p-3 flex justify-center gap-4">
        <div className="">
          <Link to={'/'}>Home</Link>
        </div>
        <div className="flex ">
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
