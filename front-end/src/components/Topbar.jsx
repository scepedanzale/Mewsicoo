import React from 'react'
import { BiBell, BiChat } from "react-icons/bi";import { HiOutlineChatAlt } from "react-icons/hi";
import { IoChatbubblesOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom'

export default function Topbar() {
  return (
    <nav className="top-bar sticky-top top-0 text-sm md:text-lg">
        <div className="container-fluid p-3 px-5 flex gap-2 justify-between items-center text-2xl">
          <div>
            <Link to={'/'}>Mewsikoo</Link>
          </div>
          <div className='flex items-center gap-3'>
            <button className='top-nav-icon'><BiBell /></button>
            <button  className='top-nav-icon'><BiChat /></button>
          </div>
        </div>
    </nav>
  )
}
