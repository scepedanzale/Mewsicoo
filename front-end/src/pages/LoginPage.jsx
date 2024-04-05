import React, { useState } from 'react'
import useAuthContext  from '../context/AuthContext'
import { Link } from 'react-router-dom';

export default function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, errors } = useAuthContext()

  const handleLogin = async (event) => {
    event.preventDefault();
    login({email, password})    
  }

  return (
    <div className="container-fluid m-10">
      <h2 className="text-base font-semibold text-3xl text-gray-900">Login</h2>

      <form onSubmit={handleLogin} className='mt-6 px-2 sm:px-20 md:px-40 lg:px-64 xl:px-96'>
        {/* email */}
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium leading-6 text-gray-900">Email address</label>
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
          <label htmlFor="password" className="block font-medium leading-6 text-gray-900">Password</label>
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
      <div className='mt-8 text-gray-500 hover:text-gray-700 mx-auto max-w-max'>
          Non sei ancora registrato?
        <Link to={'/register'}>
           <span className='text-lg text-sky-600 uppercase'> Iscriviti</span> 
        </Link>
      </div>
    </div>
  )
}
