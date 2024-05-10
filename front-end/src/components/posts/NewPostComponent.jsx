import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiKey, urlSearch } from '../../api/config'
import axios from 'axios'
import TrackComponent from '../music/TrackComponent'
import { server } from '../../api/axios'
import useAuthContext from '../../context/AuthContext'
import { useDispatch } from 'react-redux'
import { ADD_POST } from '../../redux/actions/actions'

export default function NewPostComponent() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {csrf} = useAuthContext()

    const [searchParam, setSearchParam] = useState('')
    const [tracks, setTracks] = useState([])
    const [trackId, setTrackId] = useState('')
    const [text, setText] = useState('')

    /* cerca canzone real time */
    useEffect(()=>{
        axios(urlSearch+searchParam, {
            headers: {
              'Authorization' : 'Bearer ' + apiKey
            }
          })
        .then(response => {
            setTracks(response.data.data)
        })
        .catch(e => console.error(e))
    },[searchParam])

    const search = (e) => {
        setSearchParam(e.target.value)
    }

    /*  settaggio canzone scelta */
    const setTrack = (t) => {
        setSearchParam('')
        setTrackId(t)
    }

    /* creazione post */
    const handleSubmit = async () => {
        if(trackId && text){
            const data = {
                track_id : trackId.id,
                text: text
            }
            await csrf()
            try{
                const response = await server.post('api/post', data)
                if(response.status === 201){
                    console.log(response)
                    dispatch({type: ADD_POST, payload: response.data})
                    navigate('/')
                }
            }catch(e){
                console.log(e)
            }
        }else if(trackId && !text){
            console.log('devi mettere una descrizione')
        }else if(!trackId && text){
            console.log('devi scegliere una canzone')
        }else{
            console.log('devi riempire tutti i campi')
        }
    }

  return (
    <>
        <div className="new-post-form mb-3 container-fluid p-3 rounded-md">

            <h2 className='font-bold text-2xl mb-3'>Crea post</h2>
            {trackId && 
            /* canzone scelta */
            <div className='shadow-lg mb-10'><TrackComponent track={trackId}/></div>}

            <form onSubmit={handleSubmit} className='w-100'>
                {/* cerca canzone */}
                <input 
                    type="text"
                    id="search"
                    name="search"
                    placeholder='Cerca una canzone...'
                    value={searchParam}
                    onChange={(e)=> search(e)}
                    className='form-control my-3 rounded-full'
                    autofocus
                    />
                
                {/* descrizione */}
                {trackId && !searchParam &&
                <>
                    <textarea 
                    name="text" 
                    rows="10" 
                    id="text" 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    placeholder='Inserisci descrizione...'
                    minLength="2"
                    className="w-full border rounded-md p-2"
                    autoFocus
                    >
                    </textarea>
                    <div className='flex justify-center gap-3 mt-3'>
                        <button className='btn empty-btn w-32' onClick={()=>navigate(-1)}>Indietro</button>
                        <button className='btn colored-btn w-32' onClick={(e) => { e.preventDefault(); handleSubmit();}}>Pubblica</button>
                    </div>
                </>
                }
            </form>
        </div>
            {   /* elenco canzoni */
                searchParam &&
                   ( tracks.length > 0 ? 
                    tracks.map((t)=>(
                        <div className="new-post-track container-fluid box border-2 px-3 mb-2 rounded-md">
                            <div className="row choose-row mb-2 py-1 border-b-2 text-gray-500">
                                <button onClick={(e) => { e.preventDefault(); setTrack(t); }}>
                                    scegli
                                </button> 
                            </div>
                                <TrackComponent track={t}/>
                        </div>
                    ))
                    : 
                    <p>Nessuna canzone trovata</p>)
            }
    </>
  )
}
