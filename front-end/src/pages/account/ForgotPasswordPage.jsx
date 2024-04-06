import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useAuthContext from '../../context/AuthContext';
import axios from '../../api/axios';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);
    const {csrf} = useAuthContext()
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await csrf
        setErrors([])
        setStatus(null)
        try{
            const response = await axios.post('/forgot-password', {email})
            setStatus(response.data.status)
        }catch(e){
            if(e.response.status === 422)
              setErrors(e.response.data.errors)
        }
      }

    return (
        <div className="container-fluid m-10">
            <div className="sm:px-20 md:px-40 lg:px-64 xl:px-96">
                <div className='w-full text-center my-20'>
                    <h2 className="font-semibold text-6xl">Mewsikoo</h2>
                </div>
                
                <div className='border-2 rounded-xl p-6'>
                    <div className='w-full mb-8 text-center'>
                        <p className='main-color text-lg mb-5'>Hai dimenticato la tua password?</p>
                        <span className='text-gray-600'>Per recuperare la password inserisci la tua email e ti invieremo il link per accedere al tuo account.</span>
                    </div>
                    <form onSubmit={handleSubmit} className='px-2'>
                        {/* email */}
                        <div className="mb-4">
                            <div className="mt-2">
                                <input 
                                name="email" 
                                type="email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                autoFocus 
                                required
                                placeholder='Email'
                                className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-grey-600"/>
                            </div>
                            {errors && <div className='text-red-500 text-xs mt-1'>{errors}</div>}
                        </div>
                        <div className='text-gray-600 text-center'>
                            {status &&  <div className="mt-10 w-full justify-center ">{status}</div>}
                        </div>
                        <div className="mt-10 w-full flex justify-center">
                            <button type='submit' className='main-color-bg text-neutral-100 p-2 rounded-md w-1/2'>Invia Link</button>
                        </div>
                    </form>
                    <div className='mt-8 text-lg text-center text-gray-500 mx-auto w-full'>
                        <Link to={'/login'}>
                            <span className='main-color tracking-wider font-bold'>Torna al login</span> 
                        </Link>
                        <div className='w-full text-gray-700 my-6'>
                            <hr className='border-2 w-52 mx-auto'/>
                        </div>
                        <div className='text-lg mt-8 text-gray-500 mx-auto max-w-max'>
                            Non sei ancora registrato?
                            <Link to={'/register'}>
                            <span className='main-color tracking-wider font-bold'> Iscriviti</span> 
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )
    }
    
