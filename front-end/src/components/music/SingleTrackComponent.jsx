import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import { GiDeathSkull } from "react-icons/gi";
import { FaPlay, FaPause } from "react-icons/fa";
import { apiKey, urlTrack } from '../../api/config'
import { setTrackPlaying } from '../../redux/actions/actions';
import { Link } from 'react-router-dom';
import trackPlaceholder from '../../assets/track-placeholder.jpeg'

export default function SingleTrackComponent({track_id, post_id}) {
    const dispatch = useDispatch();

    const [track, setTrack] = useState([])  // song
    const [audioPlayer, setAudioPlayer] = useState(null);  // audio
    const [play, setPlay] = useState(false)   // button player
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const trackPlaying = useSelector(state => state.music.trackPlaying)

    useEffect(()=>{
        setIsLoading(true);
        axios(urlTrack + track_id, {
            headers: {
              'Authorization' : 'Bearer ' + apiKey
            }
          })
          .then(response => {
            if(response.status === 200){
                setTrack(response.data)
                const player = new Audio(response.data.preview)
                player.addEventListener('ended', handleAudioEnded);
                setAudioPlayer(player);
                setIsLoading(false);
                setError(false)
            }
        })
        .catch(e => {
            console.error(e)
            setError(true)
            setIsLoading(false);
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

    // Component unmount
    useEffect(() => {
        return () => {
            if (play) {
                console.log('unmount')
                setPlay(false)
                dispatch(setTrackPlaying({}))
                if(play && audioPlayer){
                    audioPlayer.pause();
                    audioPlayer.currentTime = 0;
                }
            }
        };
    }, [play]);


  return (
    
        !isLoading ?
        track ?
          <>
            <div className='order-2 order-sm-1 flex flex-col justify-center items-center relative rounded-md overflow-hidden'>
                {isLoading ?
                    <div className="loading flex absolute">
                        <div className="dot dot-1">.</div>
                        <div className="dot dot-2">.</div>
                        <div className="dot dot-3">.</div>
                    </div>
                :
                    <button className='play absolute text-white max-w-max text-6xl sm:text-4xl' onClick={player}>
                        {play && trackPlaying?.post_id === post_id ? <FaPause /> : <FaPlay />}
                    </button>
                }
                <img src={`${track.album?.cover_big ? track.album.cover_big : {trackPlaceholder}}`} alt="" className={`cover rounded-md ${play && 'filter-cover'} ${isLoading && 'blur-sm'}`}/>
                {/* animation */}
                {play && <div className="wave noHover"></div>}
                <div className="track-name hidden noHover absolute text-white font-extralight text-3xl sm:text-lg flex justify-center ">{track.title}</div>
            </div>
            {/* artist - album */}
            <div className="order-1 order-sm-2 text-center sm:text-sm md:text-base mt-sm-2 mb-2 text-gray-500">
                <Link to={'artist/'+track.artist?.id} className='hover:font-semibold'>{track.artist?.name} - </Link>
                <Link to={'album/'+track.album?.id} className='hover:font-semibold'>{track.album?.title}</Link>
            </div>
          </>
          :
            <div className='text-4xl flex flex-col items-center text-3xl mr-3 text-gray-400 text-center py-10 bg-gray-200 rounded-md'>
                <GiDeathSkull />
                <p className='uppercase mt-3 text-2xl'>Error</p>
            </div>
          :
          <div className="loader text-center mx-auto"></div>
  )
}

{/* <img src={trackPlaceholder} alt="" className='cover rounded-md filter-cover blur-sm'/>
                <div className="loading flex absolute">
                        <div className="dot dot-1">.</div>
                        <div className="dot dot-2">.</div>
                        <div className="dot dot-3">.</div>
                    </div> */}