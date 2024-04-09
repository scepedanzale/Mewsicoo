import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { urlAlbum } from '../../api/config'

export default function AlbumPage() {

    const {id} = useParams()
    const [album, setAlbum] = useState({})

    useEffect(()=>{
        if(id){
            axios(urlAlbum+id)
            .then(response => setAlbum(response.data))
        }
    }, [id])

  return (
    album &&
    <div>{album.title}</div>
  )
}
