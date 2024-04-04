import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-gray-300 my-auto">
      <div className="container-fluid p-4 flex">
        <div className="basis-1/2">
          <Link to={'/'}>Navbar</Link>
        </div>
        <div className="basis-1/2 flex justify-end">
          <div className="ml-2">
            <Link to={'/login'}>Login</Link>
          </div>
          <div className="ml-2">
          <Link to={'/registerpage'}>Register</Link>
          </div>
          
        </div>
      </div>
    </nav>
  )
}
