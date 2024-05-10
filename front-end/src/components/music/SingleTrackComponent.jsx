import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { GiDeathSkull } from "react-icons/gi";
import { FaPlay, FaPause } from "react-icons/fa";
import { SET_TRACK_PLAYING } from '../../redux/actions/actions';
import trackPlaceholder from '../../assets/track-placeholder.jpeg'

export default function SingleTrackComponent({track, isLoading, post_id}) {
    const dispatch = useDispatch();

    const [audioPlayer, setAudioPlayer] = useState(null);  // audio
    const [play, setPlay] = useState(false)   // button player
    const [error, setError] = useState(false);
    const trackPlaying = useSelector(state => state.music.trackPlaying) // controllo se presente una canzone nello stato... che quindi viene riprodotta

    /* creazione audio da track passata come prop */
    useEffect(()=>{
        if(track){
            const player = new Audio(track.preview)
            player.addEventListener('ended', handleAudioEnded);
            setAudioPlayer(player);
            setError(false)
        }
    }, [track])

    // end track
    const handleAudioEnded = () => {
        setPlay(false);
    };
    
    // btn start/stop track
    const player = () => {
        if(!play){
            dispatch({type: SET_TRACK_PLAYING, payload: track.id})
            setPlay(true)
        }else{
            setPlay(false)
            audioPlayer.pause()
            audioPlayer.currentTime = 0;
            dispatch({type: SET_TRACK_PLAYING, payload: ''})
        }
    }

    
    useEffect(()=>{
        if(audioPlayer){
            if(play && trackPlaying === track.id){
                audioPlayer.play()
            }else{
                setPlay(false)
                audioPlayer.pause()
                audioPlayer.currentTime = 0;
            }
        }
    }, [trackPlaying])

    /* stoppa audio quando viene smontato il componente o parte altra track */
    useEffect(() => {
        return () => {
            if(play){
                audioPlayer?.pause();
            }
        };
    }, [play]);


  return (
        !isLoading ?
            (track ?
                <>
                    <div className='shadow-lg order-2 order-sm-1 flex flex-col justify-center items-center relative rounded-md overflow-hidden'>
                        {isLoading ?
                            <div className="loading flex absolute">
                                <div className="dot dot-1">.</div>
                                <div className="dot dot-2">.</div>
                                <div className="dot dot-3">.</div>
                            </div>
                        :
                            <button 
                            className='play absolute text-white max-w-max text-4xl' 
                            onClick={player}>
                                {play  ? <FaPause /> : <FaPlay />}
                            </button>
                        }
                        <img src={`${track?.album?.cover_big ? track.album.cover_big : {trackPlaceholder}}`} alt="" className={`cover rounded-md ${play && 'filter-cover'} ${isLoading && 'blur-sm'}`}/>
                        {/* animation */}
                        {play && <div className="wave noHover"></div>}
                        <div className="track-name hidden noHover absolute text-white font-extralight text-2xl sm:text-lg flex justify-center ">{track.title}</div>
                    </div>
                </>
                :
                <div className='text-4xl flex flex-col items-center text-3xl mr-3 text-gray-400 text-center py-10 bg-gray-200 rounded-md'>
                    <GiDeathSkull />
                    <p className='uppercase mt-3 text-2xl'>Error</p>
                </div>)
            :
            (<div className="loader text-center mx-auto"></div>)
  )
}

{/* <img src={trackPlaceholder} alt="" className='cover rounded-md filter-cover blur-sm'/>
                <div className="loading flex absolute">
                        <div className="dot dot-1">.</div>
                        <div className="dot dot-2">.</div>
                        <div className="dot dot-3">.</div>
                    </div> */}
                    