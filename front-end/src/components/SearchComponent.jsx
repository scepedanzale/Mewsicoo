import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { IoSearchOutline } from "react-icons/io5";
import { server } from '../api/axios';
import UserRowComponent from '../components/users/UserRowComponent';
import SearchUsers from './searches/SearchUsers';
import axios from 'axios';
import { apiKey, urlSearch } from '../api/config';

export default function SearchComponent() {

    const {element} = useParams()

    const [searchParam, setSearchParam] = useState('')

    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState('')
    const [tracks, setTracks] = useState('')
    const [albums, setAlbums] = useState('')
    const [artists, setArtists] = useState('')

    useEffect(()=>{
        if(element === 'users'){
            server('/api/user?query='+searchParam)
            .then(response => {
                setUsers(response.data)
                //console.log(response.data)
            })
            .catch(e => console.error(e))
        }else if(element === 'posts'){
            axios(urlSearch+searchParam)
            .then(response => {
                console.log(response.data)
            })
            .catch(e => console.error(e))
        }else if(element === 'tracks'){
            axios(urlSearch+searchParam, {
                headers: {
                  'Authorization' : 'Bearer ' + apiKey
                }
              })
            .then(response => {
                console.log(response.data)
            })
            .catch(e => console.error(e))
        }
    },[searchParam])
    



  return (
    <div className="container-fluid md:w-5/6 lg:w-2/3 xl:w-1/2 2xl:w-2/5">
        <div className="row">
            <form action="" className='flex items-center gap-3 relative'>
                <input 
                type="text"
                id="search"
                name="search"
                placeholder='Cerca...'
                value={searchParam}
                onChange={(e)=> setSearchParam(e.target.value)}
                className='form-control my-3 rounded-full'
                autofocus
                 />
                 <button className='btn absolute right-5 text-2xl text-gray-500 hover:text-gray-600'>
                    <IoSearchOutline/>
                 </button>
            </form>
        </div>
        <div className="row px-2 justify-between">
            <div className="col-2 flex justify-center">
                <Link to='/search/users' className={` text-white btn btn-sm w-100 ${element === 'users' ? 'active' : 'main-color-btn'}`}>
                    {/*  <span className='font-bold'>{user?.followers.length}</span> */} Users 
                </Link>
            </div>
            <div className="col-2 flex justify-center">
                <Link to='/search/posts' className={` text-white btn btn-sm w-100 ${element === 'posts' ? 'active' : 'main-color-btn'}`}>
                    {/* <span className='font-bold'>{user?.followings.length}</span> */} Posts 
                </Link>
            </div>
            <div className="col-2 flex justify-center">
                <Link to='/search/tracks' className={` text-white btn btn-sm w-100 ${element === 'tracks' ? 'active' : 'main-color-btn'}`}>
                    {/*  <span className='font-bold'>{user?.followers.length}</span> */} Tracks 
                </Link>
            </div>
            <div className="col-2 flex justify-center">
                <Link to='/search/albums' className={` text-white btn btn-sm w-100 ${element === 'albums' ? 'active' : 'main-color-btn'}`}>
                    {/* <span className='font-bold'>{user?.followings.length}</span> */} Albums 
                </Link>
            </div>
            <div className="col-2 flex justify-center">
                <Link to='/search/artists' className={` text-white btn btn-sm w-100 ${element === 'artists' ? 'active' : 'main-color-btn'}`}>
                    {/* <span className='font-bold'>{user?.followings.length}</span> */} Artists 
                </Link>
            </div>
        </div>
        <div className="container-fluid py-5 ">
                {element === 'users' ?
                    searchParam ?
                    users.length > 0 ? <SearchUsers users={users} /> : <p>Nessun utente trovato</p>
                    :
                    <p>Cerca un utente</p>
                :
                ''
                }
                {element === 'posts' && 
                <p>posts</p>
                }
                {element === 'tracks' && 
                <p>tracks</p>
                }
                {element === 'albums' && 
                <p>albums</p>
                }
                {element === 'artists' && 
                <p>artists</p>
                }
            </div>
    </div>
  )
}
