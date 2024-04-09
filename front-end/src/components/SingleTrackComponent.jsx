import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import { FaPlay, FaPause } from "react-icons/fa";
import { apiKey, urlTrack } from '../api/config'
import { setTrackPlaying } from '../redux/actions/actions';

export default function SingleTrackComponent({track_id, post_id}) {
    const dispatch = useDispatch();

    const [track, setTrack] = useState([])  // song
    const [audioPlayer, setAudioPlayer] = useState(null);  // audio
    const [play, setPlay] = useState(false)   // button player
    const trackPlaying = useSelector(state => state.music.trackPlaying)

    useEffect(()=>{
        axios(urlTrack + track_id, {
            headers: {
              'Authorization' : 'Bearer ' + apiKey
            }
          })
          .then(response => {
            setTrack(response.data)
            const player = new Audio(response.data.preview)
            player.addEventListener('ended', handleAudioEnded);
            setAudioPlayer(player);
        })
    }, [track_id])

    // end track
    const handleAudioEnded = () => {
        setPlay(false);
    };
    
    // btn and action control
    const player = () => {
        if(!play){
            if(trackPlaying?.post_id !== post_id){
                dispatch(setTrackPlaying({audio: audioPlayer, post_id : post_id}))
            }
            setPlay(true)
        }else{
            setPlay(false)
            dispatch(setTrackPlaying({}))
        }
    }
    
    // set btn false
    useEffect(()=>{
        if(trackPlaying.post_id !== post_id){
            setPlay(false)
        }
    }, [trackPlaying])

    // play music
    useEffect(()=>{
        if(audioPlayer){
            if(play && trackPlaying.post_id === post_id){
                audioPlayer.play();
            }else{
                audioPlayer.pause();
                audioPlayer.currentTime = 0;
            }
        }
    }, [play, trackPlaying])



  return (
    track?.album?.cover_big &&
        <div className='col-span-3 sm:col-span-1 flex flex-col justify-center relative rounded-md'>
            <div className='order-2 sm:order-1 flex flex-col justify-center items-center relative rounded-md overflow-hidden'>
                <button className='play absolute text-white max-w-max text-6xl sm:text-4xl' onClick={player}>
                    {play && trackPlaying?.post_id === post_id ? <FaPause /> : <FaPlay />}
                </button>
                <img src={track.album.cover_big} alt="" className={`cover rounded-md ${play && 'filter-cover'}`}/>
                {/* animation */}
                {play && <div class="wave noHover"></div>}
                <div class="track-name hidden noHover absolute text-white font-extralight text-5xl sm:text-lg flex justify-center ">{track.title}</div>
            </div>
            <div className="order-1 sm:order-2 text-center sm:mt-2 mb-2 text-gray-500">
                {track.artist.name} - {track.album.title}
            </div>

        </div>
  )
}