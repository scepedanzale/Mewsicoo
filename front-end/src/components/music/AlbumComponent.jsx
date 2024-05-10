import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { urlAlbum } from '../../api/config'
import trackPlaceholder from '../../assets/track-placeholder.jpeg'
import { albumDuration, formattedDate } from '../../functions/functions'
import TrackComponent from './TrackComponent'

export default function AlbumComponent() {
    const {id} = useParams()
    const [album, setAlbum] = useState({})

    /* chiamata album */
    useEffect(()=>{
        if(id){
            axios(urlAlbum+id)
            .then(response => {
                setAlbum(response.data)
            })
        }
    }, [id])

  return (
    <>
        <div className='container-fluid post m-0 mb-4 p-2 h-100 justify-between items-center'>
            <div className="row mb-3 py-2 box shadow-lg justify-center border-2 rounded-lg">
                <div className="col-12 col-md-6 col-lg-4 flex justify-center">
                    <img src={`${album?.cover_big ? album.cover_big : {trackPlaceholder}}`} alt="" className={`rounded-md`}/>
                </div>
                <div className="col m-3">
                    <div className='mb-3'>
                        <h1 className='text-2xl font-bold'>{album?.title}</h1>
                        <p className='text-gray-500 text-xl'><Link to={'/artist/'+album?.artist?.id}>{album?.artist?.name}</Link></p>
                        <p className='date'>{formattedDate(album?.release_date)}</p>
                    </div>
                    <div className='text-gray-400 text-sm border-t-2 pt-1'>
                        <p>{album?.nb_tracks} brani</p>
                        <p>{albumDuration(album.duration)}</p>
                    </div>
                </div>
            </div>

            {/* tracks */}
            <div className="container-fluid p-0">
                {album?.tracks && album.tracks.data.map((track)=>(
                    <div className='w-100 shadow-lg'>
                        <TrackComponent track={track}/>
                    </div>
                ))}
            </div>
        </div>
    </>
  )
}
