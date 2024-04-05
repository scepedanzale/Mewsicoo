import React, { useState } from 'react'
import useAuthContext from '../context/AuthContext'


export default function RegisterPage() {
    const [errorAge, setErrorAge] = useState('')  

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPassword_confirmation] = useState('')
    const [birth_day, setBirth_day] = useState('')
    const [biography, setBiography] = useState('')
    const [profile_img, setProfile_img] = useState('')

    const { register, errors } = useAuthContext()

    const handleBirthDayChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const currentDate = new Date();
        const ageDiff = currentDate.getFullYear() - selectedDate.getFullYear();
        const birthDayPassed = currentDate.getMonth() > selectedDate.getMonth() || 
                              (currentDate.getMonth() === selectedDate.getMonth() && currentDate.getDate() >= selectedDate.getDate());
        const isOver14 = ageDiff > 14 || (ageDiff === 14 && birthDayPassed);
    
        if (!isOver14) {
          setErrorAge('Devi avere almeno 14 anni')
            setBirth_day(''); // o un altro valore di default
        } else {
          setErrorAge('')
          setBirth_day(e.target.value);
        }
    };

    const handleRegister = async (event) => {
      event.preventDefault();
      register({name, username, email, password, password_confirmation, birth_day, biography, profile_img})
    }

  return (
    <div className="container-fluid m-4">
      <h2 className="text-base font-semibold leading-7 text-gray-900">Register</h2>

      <form onSubmit={handleRegister} className='mt-3'>
        {/* name */}
        <div className="mb-4">
          <label for="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div className="mt-2">
            <input 
            id="name" 
            name="name" 
            type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            autoFocus 
            minlength="2"
            className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-grey-600 text-sm"/>
          </div>
        </div>
        {/* username */}
        <div className="mb-4">
          <label for="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
          <div className="mt-2">
            <input 
            id="username" 
            name="username" 
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            minlength="2"
            className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-grey-600 text-sm"/>
          </div>
          {errors.username && <div className='text-red-500 text-xs mt-1'>{errors.username}</div>}
        </div>
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
            required
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
            minlength="8"
            className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-grey-600 text-sm"/>
          </div>
          {errors.password && <div className='text-red-500 text-xs mt-1'>{errors.password}</div>}
        </div>
        {/* password_confirmation */}
        <div className="mb-4">
          <label for="password_confirmation" className="block text-sm font-medium leading-6 text-gray-900">Password Confirm</label>
          <div className="mt-2">
            <input 
            id="password_confirmation" 
            name="password_confirmation" 
            type="password"
            value={password_confirmation}
            onChange={(e)=>setPassword_confirmation(e.target.value)}
            minlength="8"
            className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-grey-600 text-sm"/>
          </div>
          {errors.password_confirmation && <div className='text-red-500 text-xs mt-1'>{errors.password_confirmation}</div>}
        </div>
        {/* birth_day */}
        <div className="mb-4">
          <label for="birth_day" className="block text-sm font-medium leading-6 text-gray-900">Birth Date</label>
          <div className="mt-2">
            <input 
            id="birth_day" 
            name="birth_day" 
            type="date"
            value={birth_day}
            onChange={handleBirthDayChange}
            className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-grey-600 text-sm"/>
          </div>
          {errorAge && <div className='text-red-500 text-xs mt-1'>{errorAge}</div>}
        </div>
        {/* biography */}
        <div className="mb-4">
          <label for="biography" className="block text-sm font-medium leading-6 text-gray-900">Biography</label>
          <div className="mt-2">
            <textarea 
            id="biography" 
            name="biography"
            value={biography}
            onChange={(e)=>setBiography(e.target.value)} 
            className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-grey-600 text-sm"></textarea>
          </div>
        </div>
        {/* profile_img */}
        <div className="mb-4">
          <label for="profile_img" className="block text-sm font-medium leading-6 text-gray-900">Profile Image</label>
          <div className="mt-2">
            <input 
            id="profile_img" 
            name="profile_img" 
            type="file"
            value={profile_img}
            onChange={(e)=>setProfile_img(e.target.value)}
            className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-grey-600 text-sm"/>
          </div>
        </div>

        <div className="mt-10 w-full flex justify-center">
            <button type='submit' className='bg-sky-700 text-neutral-100 p-2 rounded-md w-1/2 hover:bg-sky-600'>Registrati</button>
        </div>
      </form>
    </div>
  )
}
