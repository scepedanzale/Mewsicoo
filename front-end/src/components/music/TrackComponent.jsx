import React from 'react'
import { LuPin, LuHeart, LuMessageSquare } from "react-icons/lu";
import SingleTrackComponent from './SingleTrackComponent'
import { albumDuration } from '../../functions/functions';
import { Link } from 'react-router-dom';

export default function TrackComponent({track}) {
  return (
    <div className="row bg-gray-100 mb-3 items-center rounded-lg">

        <div className="col-4 col-sm-3 col-md-2">
            <SingleTrackComponent track={track}/>
        </div>
        <div className="col-6 col-sm-7 col-md-8 text-center">
            <p className='truncate text-base md:text-lg'>{track.title}</p>
            <Link to={'/artist/'+track.artist.id}><p className='truncate text-sm sm:text-base text-gray-500'>{track.artist.name}</p></Link>
        </div>
        <div className="col-2 p-0 flex items-center text-center">
            <span className='hidden sm:block text-sm text-gray-500'>{albumDuration(track.duration)}</span>
            
            <button className='btn text-xl hover:text-sky-600'><LuPin /></button>
        </div>
    </div>
  )
}
