import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LuPencil, LuSend } from "react-icons/lu";
import { PiChatBold, PiChatFill, PiHeartBold, PiHeartFill, PiPushPinBold, PiPushPinFill } from "react-icons/pi";
import { BsThreeDotsVertical, BsTrash } from "react-icons/bs";
import { server } from '../../api/axios';
import { Collapse } from 'react-bootstrap';
import SingleTrackComponent from '../music/SingleTrackComponent';
import { ADD_COMMENT, ADD_SAVED_POST, DELETE_COMMENT, DELETE_POST, REMOVE_SAVED_POST, SET_COMMENTS } from '../../redux/actions/actions';
import useAuthContext from '../../context/AuthContext';
import { IoSearchOutline } from 'react-icons/io5';
import { formattedDate } from '../../functions/functions';

export default function PostComponent() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {csrf} = useAuthContext()
    const location = useLocation();
    const {post, user, track, date, isLoading} = location.state;
    const loggedUser = useSelector(state => state.loggedUser)
    
    const [open, setOpen] = useState(false);

    const [commentText, setCommentText] = useState('')
    const comments = useSelector(state => state.comments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)))
    const [like, setLike] = useState(false)
    const [savedPost, setSavedPost] = useState(false)

    useEffect(()=>{
        console.log(post)
        console.log(date)
    }, [post, date])

    const handleDeletePost = () => {
        server.delete('/api/post/'+post.id)
        dispatch({type: DELETE_POST, payload: post})
        navigate(-1)
    }

   /* like */

  const likePost = async () => {
    await csrf()
    try{
      if (like) {
        const response = await server.post('/api/like/delete', {post_id: post.id})
        if(response){
          setLike(!like)
        }
      }else{
        const response = await server.post('/api/like', {post_id: post.id})
        if(response){
          setLike(!like)
        }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    post?.likes?.forEach(like => {
      if(like.user_id == loggedUser.id){
        setLike(true)
      }
    })
  }, [post])


  /* comments */

  const handleSubmit = async () => {
    await csrf()
    try{
        const response = await server.post('/api/comment', {post_id: post.id, comment: commentText})
        if(response.status === 200){
            dispatch({type: ADD_COMMENT, payload: {...response.data, user: loggedUser}})
            console.log(response)
            setCommentText('')
        }
    }catch(err){
        console.log(err)
    }
  }

  const handleDeleteComment = async (c) => {
    try{
        const response = await server.delete('/api/comment/'+c.id)
        dispatch({type: DELETE_COMMENT, payload: c})
    }catch(err){
        console.log(err)
    }
  }

  useEffect(()=>{
    if (post.comments) {
        dispatch({ type: SET_COMMENTS, payload: post.comments });
    }
    else{
        dispatch({ type: SET_COMMENTS, payload: [] });
    }
  }, [post])

  useEffect(()=>{
    console.log(comments)
    console.log(post.comments)
  }, [comments, post])

  /* save post */

  const savePost = async () => {
    await csrf()
    try{
      if (savedPost) {
        const response = await server.post('/api/saved_post/delete', {post_id: post.id})
        if(response){
          setSavedPost(!savedPost)
          dispatch({type: REMOVE_SAVED_POST, payload: post})
        }
      }else{
        const response = await server.post('/api/saved_post', {post_id: post.id})
        if(response){
          setSavedPost(!savedPost)
          dispatch({type: ADD_SAVED_POST, payload: {...post, user: user}})
        }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    loggedUser?.saved_posts?.forEach(p => {
      if(p.id == post.id){
        setSavedPost(true)
      }
    })
  }, [post, loggedUser])


  return (
    <div className="container-fluid h-100 md:w-5/6 lg:w-2/3 xl:w-1/2 2xl:w-2/5">
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
                    <Link to={`/profile/user/${user?.id}`} className='flex items-center gap-2 mb-2 max-w-max hover:text-gray-400'>
                        <div className="profile_img overflow-hidden flex justify-center items-center rounded-full h-6 w-6">
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
                    {/* like */}
                    {user?.id != loggedUser?.id &&
                    <div className="col flex flex-col items-center justify-center">
                        {like ?
                        <button className='btn text-2xl hover:text-gray-700 text-red-800' onClick={likePost}>
                        <PiHeartFill />
                        </button>
                        :
                        <button className='btn text-2xl hover:text-red-800' onClick={likePost}>
                        <PiHeartBold />
                        </button>            
                        }
                        <p>{post?.likes?.length}</p>
                    </div>
                    }
                    <div className="col flex flex-col items-center justify-center">
                            {comments?.some(c => c.user.id == loggedUser.id) ?
                            <button className='btn text-2xl text-yellow-500 hover:text-gray-500'>
                                <PiChatFill />
                            </button>
                            :
                            <button className='btn text-2xl hover:text-yellow-500'>
                                <PiChatBold />
                            </button>
                            }
                            <p>{comments?.length}</p>
                    </div>
                    <div className="col flex flex-col items-center justify-center">
                        {loggedUser?.saved_posts?.some(p => p.id == post.id) ?
                            <button className='btn text-2xl hover:text-gray-800 text-sky-600' onClick={savePost}><PiPushPinFill /></button>
                            :
                            <button className='btn text-2xl hover:text-sky-600' onClick={savePost}><PiPushPinBold /></button>
                        }
                    </div>
                </div>
            </>
            }
        </div>

        {/* comments */}
        <div className="container-fluid shadow-lg box rounded-lg my-3 p-2">
            <div className="row">
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className='flex items-center gap-3 relative'>
                    <input 
                        type="text"
                        id="search"
                        name="search"
                        placeholder='Scrivi un commento...'
                        value={commentText}
                        onChange={(e)=> setCommentText(e.target.value)}
                        className='form-control my-3 rounded-full'
                        autofocus
                    />
                    <button 
                        type='button' 
                        onClick={(e) => { e.preventDefault(); handleSubmit(); }}
                        className='btn absolute right-5 text-2xl text-gray-500 hover:text-gray-600'>
                            <LuSend />
                    </button>
                </form>
            </div>
            <div className="container-fluid">
                {comments?.length>0 ?
                comments.map((c) => (
                    <div key={c.id} className="row my-2 rounded-md p-2 bg-gray-100 items-center">
                        <div className='col'>
                            <Link to={`/profile/user/${c.user?.id}`} className='flex items-center gap-2 mb-2 max-w-max hover:text-gray-400'>
                                <div className="profile_img overflow-hidden flex justify-center items-center rounded-full h-6 w-6">
                                <img src={c.user?.profile_img} alt="profile image" className='object-cover h-full w-full'/>
                                </div>
                                <p className='font-semibold text-sm'>{c.user?.username}</p>
                            </Link>
                            <p>{c.comment}</p>
                            <p className="col text-gray-400 text-sm">{formattedDate(c.created_at)}</p>
                        </div>
                        <div className="col-2">
                            {c.user_id == loggedUser.id &&
                            <>
                                <button data-bs-toggle="modal" data-bs-target="#delete_comment_modal" className='text-lg hover:text-red-700'>
                                    <BsTrash />
                                </button>
                                <div class="modal fade" id="delete_comment_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content p-3">
                                            <div class="text-end">
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="text-center">
                                                <h1 class="modal-title fs-5 mb-4" id="exampleModalLabel">Vuoi eliminare questo commento?</h1>
                                                <button type="button" class="btn btn-secondary w-25 mr-3" data-bs-dismiss="modal">Annulla</button>
                                                <button type="button" class="btn bg-red-700 hover:bg-red-800 text-white w-25" data-bs-dismiss="modal" aria-label="Close" onClick={()=>handleDeleteComment(c)}>Elimina</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                            }
                        </div>
                    </div>
                ))
                :
                <p>Non ci sono commenti</p>
                }
            </div>
        </div>
    </div>
  )
}


