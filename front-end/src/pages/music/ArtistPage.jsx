import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { urlArtist } from '../../api/config'

export default function ArtistPage() {

    const {id} = useParams()
    const [artist, setArtist] = useState({})

    useEffect(()=>{
        if(id){
            axios(urlArtist+id)
            .then(response => setArtist(response.data))
        }
    }, [id])

  return (
    artist &&
    <div>{artist.name}</div>
  )
}
