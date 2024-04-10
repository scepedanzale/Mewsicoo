import React, { useEffect, useState } from 'react'
import SingleTrackComponent from '../music/SingleTrackComponent'
import { LuPin, LuHeart, LuMessageSquare } from "react-icons/lu";
import { Link } from 'react-router-dom';


export default function SinglePostComponent({post}) {
  const [date, setDate] = useState('')
  const nChars = 300

  useEffect(()=>{
    if(post?.created_at){
      const date = new Date(post.created_at)
      const formattedDate = date.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
      setDate(formattedDate);
    }
  }, [post])

  function truncateText(text) {
    if (text.length > nChars) {
        return text.slice(0, nChars);
    }
    return text;
  }

  return (
    <div className='row post border-2 rounded-lg m-0 mb-4 py-2 h-100'>
      <div className='h-100 col-12 col-sm-4 flex flex-col justify-center relative rounded-md'>
        <SingleTrackComponent track_id={post.track_id} post_id={post.id}/>
      </div>

      {/* text */}
      <div className='h-100 col-12 col-sm-6 my-2'>
        <div className='flex justify-between'>
          <p className='font-bold mb-2'>{post?.user?.username}</p>
          <p className='text-gray-400'>{date}</p>
        </div>
        <div className=''>
          <p className='text-gray-700 overflow-hidden max-w-full overflow-ellipsis'>
            {truncateText(post?.text)}
            {post?.text.length>nChars &&  
              <Link><span className='text-gray-400 font-semibold italic'> ...apri post</span></Link>
            }
          </p>
        </div>
      </div>
      
      {/* icons */}
      <div className="h-100 col-12 col-sm-1 col-md-2 my-1 p-0 flex flex-sm-column justify-between justify-content-xl-start gap-xl-3 items-center text-center">
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
