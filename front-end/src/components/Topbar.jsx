import React from 'react'
import { BiBell, BiChat } from "react-icons/bi";import { HiOutlineChatAlt } from "react-icons/hi";
import { IoChatbubblesOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom'

export default function Topbar() {
  return (
    <nav className="mb-3 mx-2 rounded-xl sticky-top top-1 text-sm md:text-lg">
        <div className="container-fluid p-3 px-5 flex gap-2 justify-between items-center text-2xl">
          <div>
            <Link to={'/'}>Mewsikoo</Link>
          </div>
          <div className='flex items-center gap-3'>
            <button><BiBell /></button>
            <button><BiChat /></button>
          </div>
        </div>
    </nav>
  )
}
