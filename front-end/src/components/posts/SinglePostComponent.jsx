import React, { useEffect, useState } from 'react'
import SingleTrackComponent from '../music/SingleTrackComponent'
import { LuPin, LuHeart, LuMessageSquare } from "react-icons/lu";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { apiKey, urlTrack } from '../../api/config';


export default function SinglePostComponent({post, user}) {
  const [date, setDate] = useState('')
  const [track, setTrack] = useState([])  // song
  const [isLoading, setIsLoading] = useState(false);

  // chiamata alla canzone
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
  
  /* formatting data */
  useEffect(()=>{
    if(post?.created_at){
      const date = new Date(post.created_at)
      const formattedDate = date.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
      setDate(formattedDate);
    }
  }, [post])
  
  /* cutting text */
  const nChars = 300
  function truncateText(text) {
    if (text.length > nChars) {
        return text.slice(0, nChars);
    }
    return text;
  }

  return (
    <div className='row post border-2 rounded-lg m-0 mb-4 py-2 h-100'>
      <div className='h-100 col-12 col-sm-4 col-lg-3 flex flex-col justify-center relative rounded-md'>
        <SingleTrackComponent track={track} isLoading={isLoading} post_id={post.id}/>
        {/* artist - album */}
        <div className="order-1 order-sm-2 text-center sm:text-sm md:text-base mt-sm-2 mb-2 text-gray-500">
          <Link to={'artist/'+track.artist?.id} className='hover:font-semibold'>{track.artist?.name} - </Link>
          <Link to={'album/'+track.album?.id} className='hover:font-semibold'>{track.album?.title}</Link>
        </div>
      </div>

      {/* text */}
      <div className='h-100 col-12 col-sm-6 col-lg-7 my-2'>
          <Link to={`/${user?.username}`} className='flex items-center gap-2 mb-2 max-w-max hover:text-gray-600'>
            <div className="profile_img overflow-hidden flex justify-center items-center rounded-full h-6 w-6 hover:w-7 hover:h-7">
              <img src={user?.profile_img} alt="profile image" className='object-cover h-full w-full'/>
            </div>
            <p className='font-semibold'>{user?.username}</p>
          </Link>
        <div className=''>
          <p className='text-gray-700 overflow-hidden max-w-full overflow-ellipsis'>
            {truncateText(post?.text)}
              {post?.text.length>nChars && '...'}
              <Link to={'/post/'+post.id} state={{post, user, date, track, isLoading}}>
                <span className='text-gray-400 font-semibold italic border-3 border-gray-300 ms-2 px-2 rounded-full hover:bg-gray-300 hover:text-white whitespace-nowrap max-w-max'>
                  apri post
                </span>
              </Link>
          </p>
          <p className='text-gray-400 text-sm mt-2'>{date}</p>
        </div>
      </div>
      
      {/* icons */}
      <div className="col-12 col-sm-1 col-md-2 my-1 p-0 flex flex-sm-column justify-between gap-xl-3 items-center text-center">
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
    </div>
  )
}
