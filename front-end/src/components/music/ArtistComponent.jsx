import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { urlArtist } from '../../api/config'
import trackPlaceholder from '../../assets/track-placeholder.jpeg'
import SingleAlbumComponent from './SingleAlbumComponent'

export default function ArtistComponent() {

    const {id} = useParams()
    const [artist, setArtist] = useState({})
    const [tracklist, setTracklist] = useState([])

    const arrayAlbum = []

    useEffect(()=>{
        if(id){
            axios(urlArtist+id)
            .then(response => setArtist(response.data))
        }
    }, [id])
    
    useEffect(()=>{
        if(artist?.tracklist){
            axios(artist.tracklist)
            .then(response => setTracklist(response.data.data))
        }
    }, [artist])

  return (
    <div className="container-fluid md:w-5/6 lg:w-2/3 xl:w-1/2 2xl:w-2/5">
        <div className='container-fluid post m-0 mb-4 p-2 h-100 justify-between items-center'>
            <div className="row mb-3 py-2 box justify-center border-2 rounded-lg">
                <div className="col-12 col-md-6 col-lg-4 flex justify-center">
                    <img src={`${artist?.picture_big ? artist.picture_big : {trackPlaceholder}}`} alt="" className={`rounded-md`}/>
                </div>
                <div className="col m-3">
                    <div className='mb-3'>
                        <h1 className='text-2xl font-bold'>{artist?.name}</h1>
                    </div>

                </div>
            </div>
                        
            {/* tracks */}
            <div className="container-fluid p-0">
                <h2 className='font-bold text-3xl mb-2'>Discografia</h2>
                { tracklist?.length>0 &&
                    tracklist.map(t => (
                        !arrayAlbum.includes(t.album.id) && arrayAlbum.push(t.album.id) &&
                        <SingleAlbumComponent result={t}/>
                    ))
                }
            </div>
        </div>
    </div>
  )
}
