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

    /* chiamata artista */
    useEffect(()=>{
        if(id){
            axios(urlArtist+id)
            .then(response => setArtist(response.data))
        }
    }, [id])
    
    /* chiamata tracklist */
    useEffect(()=>{
        if(artist?.tracklist){
            axios(artist.tracklist)
            .then(response => setTracklist(response.data.data))
        }
    }, [artist])

  return (
    <>
        <div className='container-fluid post m-0 mb-4 p-2 h-100 justify-between items-center'>
            <div className="row mb-3 py-2 box shadow-lg justify-center border-2 rounded-lg">
                <div className="col-12 col-md-6 col-lg-4 p-0 max-w-max flex justify-center shadow-lg">
                    <img src={`${artist?.picture_big ? artist.picture_big : {trackPlaceholder}}`} alt="" className='rounded-md'/>
                </div>
                <div className="col m-3">
                    <div className='mb-3'>
                        <h1 className='text-2xl font-bold'>{artist?.name}</h1>
                        <p className='text-secondary'>Album: {artist?.nb_album}</p>
                    </div>
                </div>
            </div>
                        
            {/* albums */}
            <div className="container-fluid p-0">
                <h2 className='font-bold text-3xl my-4'>Discografia</h2>
                { tracklist?.length>0 ?
                    tracklist.map(t => (
                        !arrayAlbum.includes(t.album.id) && arrayAlbum.push(t?.album?.id) &&
                        <SingleAlbumComponent result={t}/>
                    ))
                    :
                    'Non ci sono album'
                }
            </div>
        </div>
    </>
  )
}
