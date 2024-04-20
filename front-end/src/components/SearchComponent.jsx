import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { IoSearchOutline } from "react-icons/io5";
import axios from 'axios';
import { server } from '../api/axios';
import { apiKey, urlSearch } from '../api/config';
import UserRowComponent from '../components/users/UserRowComponent';
import SinglePostComponent from './posts/SinglePostComponent';
import TrackComponent from './music/TrackComponent';

export default function SearchComponent() {

    const {element} = useParams()

    const [searchParam, setSearchParam] = useState('')

    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState('')
    const [tracks, setTracks] = useState('')


    useEffect(()=>{
        search()
    },[searchParam])

    const search = () => {
        searchUser()
        searchTrack()
    }
    const searchUser = () => {
        server('/api/user?query='+searchParam)
            .then(response => {
                setUsers(response.data)
                //console.log(response.data)
            })
            .catch(e => console.error(e))
    }
    const searchTrack = () => {
        axios(urlSearch+searchParam, {
                headers: {
                  'Authorization' : 'Bearer ' + apiKey
                }
              })
            .then(response => {
                setTracks(response.data.data)
            })
            .catch(e => console.error(e))
    }
    
    useEffect(()=>{
        searchPost()
    }, [tracks])

    const searchPost = () => {
        const idArray = []
        if(tracks){
            console.log(tracks)
            tracks.map((track)=>{
                idArray.push(track.id)
            })
            console.log(idArray)
            server('/api/post')
            .then(response => {
                console.log(response.data)
                const postsWithTracks = response.data.filter(post => {
                    return idArray.some(id => post.track_id === id);
                });
                console.log(postsWithTracks);
                setPosts(postsWithTracks)
            })
            .catch(error => {
                console.error('Errore nella ricerca dei post:', error);
            });
        }
    }


  return (
    <div className="container-fluid md:w-5/6 lg:w-2/3 xl:w-1/2 2xl:w-2/5">
        <div className="container-fluid shadow-lg box rounded-lg p-2">
            <div className="row">
                <form onSubmit={(e) => { e.preventDefault(); search(); }} className='flex items-center gap-3 relative'>
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
                    <button 
                    type='button' 
                    onClick={(e) => { e.preventDefault(); search(); }}
                    className='btn absolute right-5 text-2xl text-gray-500 hover:text-gray-600'>
                        <IoSearchOutline/>
                    </button>
                </form>
            </div>
            <div className="row p-2 justify-between">
                <div className="col flex justify-center">
                    <Link to='/search/users' className={` text-white btn btn-sm w-100 ${element === 'users' ? 'active' : 'main-color-btn'}`}>
                        Users 
                    </Link>
                </div>
                <div className="col flex justify-center">
                    <Link to='/search/posts' className={` text-white btn btn-sm w-100 ${element === 'posts' ? 'active' : 'main-color-btn'}`}>
                        Posts 
                    </Link>
                </div>
                <div className="col flex justify-center">
                    <Link to='/search/tracks' className={` text-white btn btn-sm w-100 ${element === 'tracks' ? 'active' : 'main-color-btn'}`}>
                        Songs 
                    </Link>
                </div>
            </div>
        </div>
        <div className="container-fluid py-5 ">
                {element === 'users' ?
                    searchParam ?
                    users.length > 0 ? 
                        users.map((user)=>(
                            <UserRowComponent user={user}/>
                        ))
                        : 
                        <p className='text-white'>Nessun utente trovato</p>
                    :
                    <p className='text-white'>Cerca un utente</p>
                :
                ''
                }
                {element === 'posts' ?
                    searchParam ?
                    posts.length > 0 ? 
                        posts.map((p)=>(
                            <SinglePostComponent key={p.id} post={p} user={p.user}/>
                        ))
                    : <p className='text-white'>Nessun post trovato</p>
                    :
                    <p className='text-white'>Cerca un post</p>
                :
                ''
                }
                {element === 'tracks' ?
                    searchParam ?
                    tracks.length > 0 ? 
                        tracks.map((t)=>(
                            <div className='shadow-lg'>
                                <TrackComponent track={t}/>
                            </div>
                        ))
                        : 
                        <p className='text-white'>Nessuna canzone trovata</p>
                    :
                    <p className='text-white'>Cerca una canzone</p>
                :
                ''
                }
            </div>
    </div>
  )
}