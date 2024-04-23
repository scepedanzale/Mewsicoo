import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthContext from '../context/AuthContext'
import { useSelector } from 'react-redux'
import { FaHouseChimney } from "react-icons/fa6";
import { FaPlusSquare, FaSearch, FaUserCircle } from 'react-icons/fa';

export default function Navbar() {
  const {user, logout} = useAuthContext()
  const  loggedUser = useSelector(state => state.loggedUser)

  const [currentPage, setCurrentPage] = useState('home');

  // Funzione per impostare la pagina corrente
  const setCurrentPageHandler = (page) => {
    setCurrentPage(page);
  };

  return (
    <nav className="mb-3 mx-2 rounded-xl sticky-bottom bottom-1 text-sm md:text-lg md:top-20  md:h-96 md:max-w-max">
      <div className="container-fluid p-3 flex justify-center md:max-w-max h-100">
        <div className="flex md:flex-col gap-2 justify-between items-center text-xl w-80 md:w-auto md:my-auto md:h-full">
          <div>
            <Link to={'/'}  onClick={() => setCurrentPageHandler('home')}  className={currentPage === 'home' ? 'text-gray-900' : ''} >
              <FaHouseChimney />
            </Link>
          </div>
          <div>
            <Link to={'/search/users'}  onClick={() => setCurrentPageHandler('search')}  className={currentPage === 'search' ? 'text-gray-900' : ''}>
              <FaSearch />
            </Link>
          </div>
          <div>
            <Link to={'/new/post'}  onClick={() => setCurrentPageHandler('newPost')}  className={currentPage === 'newPost' ? 'text-gray-900' : ''}>
              <FaPlusSquare />
            </Link>
          </div>
          <div>
            <Link to={`/profile/user/${loggedUser.id}`}  onClick={() => setCurrentPageHandler('profile')}  className={currentPage === 'profile' ? 'text-gray-900' : ''}>
              <FaUserCircle />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
