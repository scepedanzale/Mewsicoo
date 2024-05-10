import React from 'react'
import trackPlaceholder from '../../assets/track-placeholder.jpeg'
import { Link } from 'react-router-dom';

export default function SingleAlbumComponent({result}) {

  return (
    result &&
    <div className="row box shadow-lg py-2 mb-3 items-center rounded-lg">
      <div className="col-4 col-sm-3 col-md-2">
        <img src={`${result?.album?.cover_big ? result?.album?.cover_big : {trackPlaceholder}}`} alt="" className={`cover rounded-md`}/>
      </div>
      <div className="col-6 col-sm-7 col-md-8 text-center">
        <p className='truncate text-base md:text-lg'>
          <Link to={'/album/'+result?.album?.id} className='hover:text-gray-800'>{result?.album?.title}</Link>
        </p>
      </div>
    </div>
  )
}
