import React, { useEffect } from 'react'
import TrackComponent from '../music/TrackComponent'

export default function SearchTracks({tracks}) {
  useEffect(()=>{
    console.log(tracks)
  }, [tracks])
    return (
    tracks && tracks.map((t)=>(
        <TrackComponent track={t}/>
    ))
  )
}
