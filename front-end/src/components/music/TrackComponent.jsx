import React from 'react'
import SingleTrackComponent from './SingleTrackComponent'
import { formatSeconds } from '../../functions/functions';
import { Link } from 'react-router-dom';

export default function TrackComponent({track}) {
  return (
    <div className="row box py-2 mb-3 items-center rounded-lg">
        <div className="col-4 col-sm-3 col-md-2">
            <SingleTrackComponent track={track}/>
        </div>
        <div className="col-6 col-sm-7 col-md-8 text-center">
            <p className='truncate text-base md:text-lg'>{track?.title}</p>
            <p className='truncate text-sm sm:text-base'>
              <Link to={'/artist/'+track?.artist?.id} className='text-gray-400 hover:text-gray-500'>
                {track?.artist?.name}
              </Link>
            </p>
        </div>
        <div className="col-2 p-0 flex items-center text-center">
            <span className='hidden sm:block text-sm text-gray-500'>{formatSeconds(track?.duration)}</span>
        </div>
    </div>
  )
}
