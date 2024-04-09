import React, { useState } from 'react'
import useAuthContext  from '../../context/AuthContext'
import { Link } from 'react-router-dom';
import { BsEye, BsEyeSlash } from "react-icons/bs";


export default function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const { login, errors } = useAuthContext()

  const handleLogin = async (event) => {
    event.preventDefault();
    login({email, password})    
  }

  return (
    <div className="container-fluid m-10">
      <div className="sm:px-20 md:px-40 lg:px-64 xl:px-96">
        <div className='w-full text-center my-20'>
          <h2 className="font-semibold text-6xl text-gray-900">Mewsikoo</h2>
        </div>

        <div className='border-2 rounded-xl p-6'>
          <form onSubmit={handleLogin} className='px-2'>
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
              <div className="mt-2 relative">
                <input 
                id="password" 
                name="password" 
                type={`${showPassword ? 'text' : 'password'}`}
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-grey-600 text-sm"/>
                <div className='absolute top-1 right-3 '>
                  {showPassword == false ?
                    <button type='button' onClick={()=>setShowPassword(true)}>
                      <span className='text-lg text-gray-500'><BsEyeSlash/> </span>
                    </button> 
                    :    
                    <button type='button' onClick={()=>setShowPassword(false)}>
                      <span className='text-lg text-gray-700'><BsEye/></span> 
                    </button> 
                  }
                </div>
              </div>
              <div className='w-full flex justify-between'>
                <div className='text-red-500 text-xs mt-1'>{errors.password && errors.password}</div>
                <Link to={'/forgot-password'}>
                  <span className='main-color text-sm'>Hai dimenticato la password?</span> 
                </Link>
              </div>
            </div>
            <div className="mt-10 w-full flex justify-center">
                <button type='submit' className='main-color-btn text-neutral-100 p-2 rounded-md w-1/2'>Accedi</button>
            </div>
          </form>
          <div className='text-lg mt-8 text-gray-500 mx-auto max-w-max'>
              Non sei ancora registrato?
            <Link to={'/register'}>
              <span className='main-color tracking-wider font-bold'> Iscriviti</span> 
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
