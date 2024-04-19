import React from 'react'
import { Link } from 'react-router-dom'
import useAuthContext from '../context/AuthContext'
import { useSelector } from 'react-redux'

export default function Navbar() {
  const {user, logout} = useAuthContext()
  const  loggedUser = useSelector(state => state.loggedUser)

  return (
    <nav className="mb-3 mx-2 rounded-b-xl sticky-top text-sm md:text-lg">
      <div className="container-fluid p-3 flex justify-center">
        <div className="flex gap-2 justify-between w-80">
          <div>
            <Link to={'/'}>Home</Link>
          </div>
          <div>
            <Link to={'/search/users'}>Search</Link>
          </div>
          <div>
            <Link to={'/new/post'}>+</Link>
          </div>
          <div>
            <Link to={`/profile/user/${loggedUser.id}`}>Profile</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
