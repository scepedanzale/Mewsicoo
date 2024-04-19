import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LuPin, LuHeart, LuMessageSquare, LuPencil } from "react-icons/lu";
import { BsThreeDotsVertical, BsTrash } from "react-icons/bs";
import { server } from '../../api/axios';
import { Collapse } from 'react-bootstrap';
import SingleTrackComponent from '../music/SingleTrackComponent';
import { DELETE_POST } from '../../redux/actions/actions';

export default function PostComponent() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const {post, user, track, date, isLoading} = location.state;
    const loggedUser = useSelector(state => state.loggedUser)
    
    const [open, setOpen] = useState(false);

    useEffect(()=>{
        console.log(post.text)
        console.log(date)
    }, [post, date])

    const handleDeletePost = () => {
        server.delete('/api/post/'+post.id)
        dispatch({type: DELETE_POST, payload: post})
        navigate(-1)
    }


  return (
    <div className="container-fluid md:w-5/6 lg:w-2/3 xl:w-1/2 2xl:w-2/5">
        <div className="container-fluid box order-1 order-sm-2 border-2 p-3 rounded-md">
            {post &&
            <>
                {/* track */}
                <div className="row">
                    <div className="col">
                        <SingleTrackComponent track={track} isLoading={isLoading} post_id={post.id}/>
                    </div>
                    <div className="col-7 p-0 relative">
                        {/* post settings */}
                        {user?.username === loggedUser?.username &&
                        <>
                            <div className='flex justify-end'>
                                <div type="button"
                                onClick={() => setOpen(!open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={open}
                                className='max-w-max top-0 right-3 text-xl md:text-2xl flex justify-end text-gray-500 hover:text-gray-700'>
                                    <BsThreeDotsVertical />
                                </div>
                                <Collapse in={open}>
                                    <div id="example-collapse-text" className='fixed absolute right-5 mt-2 bg-white border-2 rounded-lg flex justify-end'>
                                        <ul>
                                            <li className='hover:bg-gray-100 p-2'>
                                                <Link to={'/edit/post/'+post.id} state={{post}} className='flex items-center gap-2'><LuPencil />Modifica</Link>
                                            </li>
                                            <li className='hover:bg-gray-100 p-2' type="button" data-bs-toggle="modal" data-bs-target="#delete_post_modal">
                                                <button className='flex items-center gap-2 text-red-700'><BsTrash />Elimina</button>
                                            </li>
                                                <div class="modal fade" id="delete_post_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div class="modal-dialog">
                                                        <div class="modal-content p-3">
                                                            <div class="text-end">
                                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div class="text-center">
                                                                <h1 class="modal-title fs-5 mb-4" id="exampleModalLabel">Vuoi eliminare questo post?</h1>
                                                                <button type="button" class="btn btn-secondary w-25 mr-3" data-bs-dismiss="modal">Annulla</button>
                                                                <button type="button" class="btn bg-red-700 hover:bg-red-800 text-white w-25" data-bs-dismiss="modal" aria-label="Close" onClick={handleDeletePost}>Elimina</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                        </ul>
                                    </div>
                                </Collapse>

                            </div>
                        </>
                        }
                        <p className='font-bold text-lg sm:text-xl md:text-2xl'>{track?.title}</p>
                        <div className='mt-1 text-sm sm:text-base md:text-xl'>
                            <p className='truncate'><Link to={'/artist/'+track?.artist?.id}>{track?.artist?.name}</Link></p>
                            <p className='truncate'><Link to={'/artist/'+track?.album?.id}>{track?.album?.title}</Link></p>
                        </div>
                    </div>
                </div>
                {/* user e text*/}
                <div className="row my-3">
                    <Link to={`/profile/user/${user?.id}`} className='flex items-center gap-2 mb-2 max-w-max hover:text-gray-600'>
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
                <div className="row p-0 flex justify-between items-center text-center">
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


