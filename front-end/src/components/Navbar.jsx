import React from 'react'
import { Link } from 'react-router-dom'
import useAuthContext from '../context/AuthContext'
import { useSelector } from 'react-redux'
import { FaHouseChimney } from "react-icons/fa6";
import { FaPlusSquare, FaSearch, FaUserCircle } from 'react-icons/fa';

export default function Navbar() {
  const {user, logout} = useAuthContext()
  const  loggedUser = useSelector(state => state.loggedUser)

  return (
    <nav className="mb-3 mx-2 rounded-xl sticky-bottom bottom-1 text-sm md:text-lg md:top-20 md:h-96 md:max-w-max">
      <div className="container-fluid p-3 flex justify-center md:max-w-max h-100">
        <div className="flex md:flex-col gap-2 justify-between items-center text-xl w-80 md:w-auto md:my-auto md:h-52">
          <div>
            <Link to={'/'}><FaHouseChimney /></Link>
          </div>
          <div>
            <Link to={'/search/users'}><FaSearch /></Link>
          </div>
          <div>
            <Link to={'/new/post'}><FaPlusSquare /></Link>
          </div>
          <div>
            <Link to={`/profile/user/${loggedUser.id}`}><FaUserCircle /></Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
