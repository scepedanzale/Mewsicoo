import React, { useEffect, useState } from 'react'
import SingleTrackComponent from '../music/SingleTrackComponent'
import { PiChatBold, PiChatFill, PiHeartBold, PiHeartFill, PiPushPinBold, PiPushPinFill } from "react-icons/pi";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { apiKey, urlTrack } from '../../api/config';
import { formattedDate, truncateText } from '../../functions/functions';
import useAuthContext from '../../context/AuthContext';
import { server } from '../../api/axios';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_SAVED_POST, REMOVE_SAVED_POST } from '../../redux/actions/actions';


export default function SinglePostComponent({post, user}) {
  const dispatch = useDispatch()
  const {csrf} = useAuthContext()
  const loggedUser = useSelector(state => state.loggedUser)

  // max n chars
  const nChars = 280

  const date = formattedDate(post?.created_at)
  const [track, setTrack] = useState([])  // song
  const [isLoading, setIsLoading] = useState(false);

  const [like, setLike] = useState(false)
  const [savedPost, setSavedPost] = useState(false)

  // chiamata canzone
  useEffect(()=>{
    setIsLoading(true);
    axios(urlTrack + post.track_id, {
      headers: {
        'Authorization' : 'Bearer ' + apiKey
      }
    })
    .then(response => {
      if(response.status === 200){
        setTrack(response.data)
        setIsLoading(false);
      }
    })
    .catch(e => {
      console.error(e)
      setIsLoading(false);
    })
}, [post.track_id])

  
   /* ----------------------------------- LIKES  */
   
   /*   aggiungere o rimuovere like db   */
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

  /*    cambia icona se ho messo like   */
  useEffect(()=>{
    post?.likes?.forEach(like => {
      if(like.user_id == loggedUser.id){
        setLike(true)
      }
    })
  }, [post])



   /* ----------------------------------- SAVE  */
  
  /*   aggiungere o rimuovere salvataggio post db e stato    */
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

  /*    cambia icona se ho salvato il post   */
  useEffect(()=>{
    loggedUser?.saved_posts?.forEach(p => {
      if(p.id == post.id){
        setSavedPost(true)
      }
    })
  }, [post, loggedUser])


  return (
    <div className='box row post shadow-lg m-0 mb-4 py-2 h-100'>
      {/* track */}
      {track && (
        <div className='h-100 col-12 col-sm-4 col-lg-3 flex flex-col justify-center relative rounded-md'>
          <SingleTrackComponent track={track} isLoading={isLoading} post_id={post.id}/>
          {/* artist - album */}
          <div className="order-1 order-sm-2 flex flex-col justify-center text-center sm:text-sm md:text-base mt-sm-2 mb-2 text-gray-500">
            <Link to={'/artist/'+track.artist?.id} className='hover:font-semibold fs-5'>{track.artist?.name}</Link>
            <Link to={'/album/'+track.album?.id} className='hover:font-semibold text-gray-400 text-truncate block '>{track.album?.title}</Link>
          </div>
        </div>
      )}

      <div className='h-100 col-12 col-sm-6 col-lg-7 my-2'>
        {/* user */}
          <Link to={`/profile/user/${user?.id}`} className='flex items-center gap-2 mb-2 max-w-max hover:text-gray-400'>
            <div className="profile_img overflow-hidden flex justify-center items-center rounded-full h-6 w-6">
              <img src={user?.profile_img} alt="profile image" className='object-cover h-full w-full'/>
            </div>
            <p className='font-semibold'>{user?.username}</p>
          </Link>
          
        {/* text */}
        <div className=''>
          <p className='text-gray-700 overflow-hidden max-w-full overflow-ellipsis'>
            {truncateText(post?.text, nChars)}
              {post?.text.length>300 &&
               <span className=' font-semibold italic hover:text-gray-800 whitespace-nowrap max-w-max'>
                 ...
                <Link to={'/post/'+post.id} state={{post, user, date, track, isLoading}}>
                    leggi
                </Link>
              </span>
               }
          </p>
          {/* date */}
          <p className='date text-sm mt-2'>{date}</p>
        </div>
      </div>
      
      {/* icons */}
      <div className="col-12 col-sm-2 col-md-2 my-1 p-0 flex flex-sm-column justify-between gap-xl-3 items-center text-center">
        {/* like */}
          {user?.id != loggedUser?.id &&
          <div className="col flex flex-col items-center justify-center">
            <button className='btn post-icon like-icon' onClick={likePost}>
            {like ?<PiHeartFill />:<PiHeartBold />}
            </button>
          </div>
          }

        {/* comments */}
        <div className="col flex items-center justify-center">
            <Link to={'/post/'+post.id} state={{id: post.id, user, date, track, isLoading}} className='post-icon comment-icon'>
                {post?.comments?.some(c => c.user_id == loggedUser.id) ?<PiChatFill />:<PiChatBold />}
            </Link>
        </div>

        {/* save */}
        <div className="col flex items-center justify-center">
              <button className='btn post-icon pin-icon' onClick={savePost}>
                {loggedUser?.saved_posts?.some(p => p.id == post.id) ?<PiPushPinFill />:<PiPushPinBold />}
              </button>
        </div>
       </div>
    </div>
  )
}