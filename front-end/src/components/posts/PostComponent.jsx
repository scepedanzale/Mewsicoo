import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { server } from '../../api/axios';
import { Link } from 'react-router-dom';
import { LuPin, LuHeart, LuMessageSquare, LuPencil } from "react-icons/lu";
import { BsThreeDotsVertical, BsTrash } from "react-icons/bs";
import SingleTrackComponent from '../music/SingleTrackComponent';
import { useSelector } from 'react-redux';
import { Collapse } from 'react-bootstrap';

export default function PostComponent() {

    const location = useLocation();
    const loggedUser = useSelector(state => state.loggedUser.info)
    const {post, user, track, date, isLoading} = location.state;
    const [biography, setBiography] = useState(loggedUser.biography)
    const [open, setOpen] = useState(false);

    useEffect(()=>{
        console.log(post)
        console.log(date)
    }, [post, date])


  return (
    <div className="container-fluid md:w-5/6 lg:w-2/3 xl:w-1/2 2xl:w-2/5">
        <div className="container-fluid order-1 order-sm-2 border-2 p-3 rounded-md">
            {post &&
            <>
                {/* track */}
                <div className="row">
                    <div className="col">
                        <SingleTrackComponent track={track} isLoading={isLoading} post_id={post.id}/>
                    </div>
                    <div className="col-7 p-0 relative">
                        {/* post settings */}
                        {user.username === loggedUser.username &&
                        <>
                            <div type="button"
                            onClick={() => setOpen(!open)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                            className='top-0 right-3 text-xl md:text-2xl flex justify-end text-gray-500 hover:text-gray-700'>
                                <BsThreeDotsVertical />
                            </div>
                            <Collapse in={open}>
                                <div id="example-collapse-text" className='sticky bg-white flex justify-end p-2'>
                                    <ul>
                                        <li>
                                            <Link className='flex items-center gap-2'><LuPencil />Modifica</Link>
                                        </li>
                                        <li>
                                            <Link className='flex items-center gap-2 text-red-700'><BsTrash />Elimina</Link>
                                        </li>
                                    </ul>
                                </div>
                            </Collapse>
                        </>
                        }
                        <p className='font-bold text-lg sm:text-xl md:text-2xl'>{track.title}</p>
                        <div className='mt-1 text-sm sm:text-base md:text-xl'>
                            <p className='truncate'>{track.artist.name}</p>
                            <p className='truncate'>{track.album.title}</p>
                        </div>
                    </div>
                </div>
                {/* user e text*/}
                <div className="row my-3">
                    <Link to={`/${user?.username}`} className='flex items-center gap-2 mb-2 max-w-max hover:text-gray-600'>
                        <div className="profile_img overflow-hidden flex justify-center items-center rounded-full h-6 w-6 hover:w-7 hover:h-7">
                        <img src={user?.profile_img} alt="profile image" className='object-cover h-full w-full'/>
                        </div>
                        <p className='font-semibold'>{user?.username}</p>
                    </Link>
                    <div className=''>
                    <p className='text-gray-700 overflow-hidden max-w-full overflow-ellipsis'>
                        {post?.text}
                    </p>
                    <p className='text-gray-400 text-sm mt-2'>{date}</p>
                    </div>
                </div>

                {/* icons */}
                <div className="row p-0 flex justify-between gap-xl-3 items-center text-center">
                    <div className="col-4">
                    <button className='btn text-2xl hover:text-red-800'><LuHeart /></button>
                    </div>
                    <div className="col-4">
                    <button className='btn text-2xl hover:text-yellow-500'><LuMessageSquare /></button>
                    </div>
                    <div className="col-4">
                    <button className='btn text-2xl hover:text-sky-600'><LuPin /></button>
                </div>
            </div>
            </>
            }
        </div>
    </div>
  )
}
