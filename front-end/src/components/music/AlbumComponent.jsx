import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { urlAlbum } from '../../api/config'
import trackPlaceholder from '../../assets/track-placeholder.jpeg'
import { albumDuration, formattedDate } from '../../functions/functions'


export default function AlbumComponent() {
    const {id} = useParams()
    const [album, setAlbum] = useState({})

    useEffect(()=>{
        if(id){
            axios(urlAlbum+id)
            .then(response => {
                setAlbum(response.data)
                console.log(response.data)
            })
        }
    }, [id])
    

  return (
    <div className="container-fluid md:w-5/6 lg:w-2/3 xl:w-1/2 2xl:w-2/5">
        <div className='container-fluid post border-2 rounded-lg m-0 mb-4 p-2 h-100 justify-between items-center'>
            <div className="row">
                <div className="col-6">
                    <img src={`${album?.cover_big ? album.cover_big : {trackPlaceholder}}`} alt="" className={`rounded-md`}/>
                </div>
                <div className="col-6">
                    <div className='mb-3'>
                        <h1 className='text-2xl font-bold'>{album?.title}</h1>
                        <p className='text-gray-500'>{album?.artist?.name}</p>
                        <p>{formattedDate(album?.release_date)}</p>
                    </div>
                    <div className='text-gray-400 text-sm'>
                        <p>{album?.nb_tracks} brani</p>
                        <p>{albumDuration(album)}</p>
                    </div>
                </div>
            </div>

            {/* tracks */}
            <div className="container-fluid">
                {album?.tracks && album.tracks.data.map((t)=>(
                    <div className="row">
                        <div className="col">

                        </div>
                        <div className="col">
                            {t.title}
                        </div>
                        <div className="col"></div>
                    </div>

                ))}
            </div>
        </div>
    </div>
  )
}
