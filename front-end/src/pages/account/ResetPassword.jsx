import React, { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom';
import useAuthContext from '../../context/AuthContext';
import {server} from '../../api/axios';


export default function ResetPassword() {

    const {csrf} = useAuthContext();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPassword_confirmation] = useState('')
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState([]);
    const {token} = useParams()

    const [searchParams] = useSearchParams()
    
    useEffect(()=>{
        setEmail(searchParams.get('email'))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        await csrf()
        setErrors([])
        setStatus(null)
        if(password!==password_confirmation){
            setStatus({msg: "Passwords don't match."})
        }else{
            try{
                const response = await server.post('/reset-password', {email, password, password_confirmation,token})
                console.log(response)
                setStatus({
                    code: response.status,
                    msg: response.data.status
                })
            }catch(e){
                if(e.response.status === 422)
                setErrors(e.response.data.errors)
            }
        }
    }

  return (
    <div className="container-fluid auth-page">
        <div className="sm:px-20 md:px-40 lg:px-64 xl:px-96">
            <div className='w-full text-center'>
                <h2>Reset Password</h2>
            </div>
            
            <div className='box border-2 rounded-xl p-6'>
                <form onSubmit={handleSubmit} className='px-2'>
                    <div className='w-full mb-8 text-center'>
                        <p className='text-lg mb-5'>Reimposta password</p>
                    </div>
                    {/* password */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block  font-medium leading-6 text-gray-900">Password</label>
                        <div className="mt-2">
                            <input 
                            id="password" 
                            name="password" 
                            type="password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            minLength="8"
                            required
                            className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-grey-600 "/>
                        </div>
                    </div>
                    {/* password_confirmation */}
                    <div className="mb-4">
                        <label htmlFor="password_confirmation" className="block  font-medium leading-6 text-gray-900">Password Confirm</label>
                        <div className="mt-2">
                            <input 
                            id="password_confirmation" 
                            name="password_confirmation" 
                            type="password"
                            value={password_confirmation}
                            onChange={(e)=>setPassword_confirmation(e.target.value)}
                            minLength="8"
                            required
                            className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-grey-600 "/>
                        </div>
                    </div>
                    <div className='text-gray-600 text-center'>
                        {status?.msg &&  <div className="mt-10 w-full justify-center ">{status.msg}</div>}
                    </div>
                    <div className="mt-10 w-full flex justify-center">
                        {status?.code === 200 ?
                        <Link to={'/login'} className='text-lg'>Vai al login</Link>
                        :
                        <button type='submit' className='btn text-neutral-100 w-1/2'>Conferma</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    </div>
)
}
