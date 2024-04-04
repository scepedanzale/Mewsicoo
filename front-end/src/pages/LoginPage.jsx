import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

export default function LoginPage() {
  const navigate = useNavigate()

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const token = async () => await axios.get('/sanctum/csrf-cookie');

  const handleLogin = async (event) => {
    event.preventDefault();
    try{
      await token()
      await axios.post('/login', {email, password})
      setEmail('')
      setPassword('')
      navigate('/')
    }catch(e){
      if(e.response.status == 422)
        setErrors(e.response.data.errors)
    }
  }

  return (
    <div className="container-fluid m-4">
      <h2 className="text-base font-semibold leading-7 text-gray-900">Login</h2>

      <form onSubmit={handleLogin} className='mt-3'>
        {/* email */}
        <div className="mb-4">
          <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div className="mt-2">
            <input 
            id="email" 
            name="email" 
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            autoFocus 
            className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-grey-600 text-sm"/>
          </div>
            {errors.email && <div className='text-red-500 text-xs mt-1'>{errors.email}</div>}
        </div>
        {/* password */}
        <div className="mb-4">
          <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div className="mt-2">
            <input 
            id="password" 
            name="password" 
            type="password" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-grey-600 text-sm"/>
          </div>
          {errors.password && <div className='text-red-500 text-xs mt-1'>{errors.password}</div>}
        </div>
        <div className="mt-10 w-full flex justify-center">
            <button type='submit' className='bg-sky-700 text-neutral-100 p-2 rounded-md w-1/2 hover:bg-sky-600'>Accedi</button>
        </div>
      </form>
    </div>
  )
}
