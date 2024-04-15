import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { server } from '../../api/axios';
import useAuthContext from '../../context/AuthContext';
import { useDispatch } from 'react-redux';
import { updatePost } from '../../redux/actions/actions';

export default function EditPostComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {post} = location.state;

    const {csrf} = useAuthContext()
    const [text, setText] = useState(post.text)

    const handleText = async (event) =>{
        event.preventDefault();
        await csrf()
        try{
            const response = await server.patch('api/post/'+post.id, {text})
            if(response.status === 200){
                dispatch(updatePost(text, post.id))
                navigate(-2)
            }
        }catch(e){
            console.log(e)
        }
    }

  return (
    <div className="container-fluid md:w-5/6 lg:w-2/3 xl:w-1/2 2xl:w-2/5">
        <div className="container-fluid order-1 order-sm-2 border-2 p-3 rounded-md">
            <h1 className='font-bold text-2xl mb-3'>Modifica post</h1>
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
                    <button className='btn bg-gray-400 hover:bg-gray-500 text-white w-25' onClick={()=>navigate(-1)}>Indietro</button>
                    <button className='btn main-color-btn w-25' onClick={handleText}>Salva</button>
                </div>
            </form>
        </div>
    </div>
  )
}
