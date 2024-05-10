import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { server } from '../../api/axios';
import useAuthContext from '../../context/AuthContext';
import { useDispatch } from 'react-redux';
import { UPDATE_POST } from '../../redux/actions/actions';

export default function EditPostComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    const {post} = location.state;

    const {csrf} = useAuthContext()
    const [text, setText] = useState(post.text)

    /* modifica testo del post */
    const handleText = async (event) =>{
        event.preventDefault();
        await csrf()
        try{
            const response = await server.patch('api/post/'+post.id, {text})
            if(response.status === 200){
                post.text = text
                dispatch({type: UPDATE_POST, payload: post})
                navigate(-2)
            }
        }catch(e){
            console.log(e)
        }
    }


  return (
        <div className="box edit-post container-fluid order-1 order-sm-2 border-2 p-3 rounded-md">
            <h2 className='font-bold text-2xl mb-3'>Modifica post</h2>
            <form className='w-100'>
                <textarea 
                name="text" 
                rows="10" 
                id="text" 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                className="w-full border rounded-md p-2"
                autoFocus
                >
                </textarea>
                <div className='flex justify-center gap-3 mt-3'>
                    <button className='btn back w-25' onClick={()=>navigate(-1)}>Indietro</button>
                    <button className='btn save w-25' onClick={handleText}>Salva</button>
                </div>
            </form>
        </div>
  )
}
