import { useState } from "react";
import useAuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";

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
    <div className="container-fluid m-10 ">
      <div className="container-fluid m-10">
        <div className='w-full text-center my-20'>
          <h2 className="font-semibold text-6xl text-gray-900">Mewsikoo</h2>
        </div>

        <div className='border-2 rounded-xl p-6'>
          <form onSubmit={handleRegister} className="mt-6 px-2 sm:px-20 md:px-40 lg:px-64 xl:px-96">
            {/* name */}
            <div className="mb-4">
              <label htmlFor="name" className="block font-medium leading-6 text-gray-900">Name</label>
              <div className="mt-2">
                <input 
                id="name" 
                name="name" 
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                autoFocus 
                minLength="2"
                className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-grey-600 "/>
              </div>
            </div>
            {/* username */}
            <div className="mb-4">
              <label htmlFor="username" className="block  font-medium leading-6 text-gray-900">Username</label>
              <div className="mt-2">
                <input 
                id="username" 
                name="username" 
                type="text"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                minLength="2"
                required
                className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-grey-600 "/>
              </div>
              {errors.username && <div className='text-red-500 text-xs mt-1'>{errors.username}</div>}
            </div>
            {/* email */}
            <div className="mb-4">
              <label htmlFor="email" className="block  font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input 
                id="email" 
                name="email" 
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
                className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-grey-600 "/>
              </div>
              {errors.email && <div className='text-red-500 text-xs mt-1'>{errors.email}</div>}
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
              {errors.password && <div className='text-red-500 text-xs mt-1'>{errors.password}</div>}
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
              {errors.password_confirmation && <div className='text-red-500 text-xs mt-1'>{errors.password_confirmation}</div>}
            </div>
            {/* birth_day */}
            <div className="mb-4">
              <label htmlFor="birth_day" className="block  font-medium leading-6 text-gray-900">Birth Date</label>
              <div className="mt-2">
                <input 
                id="birth_day" 
                name="birth_day" 
                type="date"
                value={birth_day}
                onChange={handleBirthDayChange}
                required
                className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-grey-600 "/>
              </div>
              {errorAge && <div className='text-red-500 text-xs mt-1'>{errorAge}</div>}
            </div>

            <div className="mt-10 w-full flex justify-center">
                <button type='submit' className='text-neutral-100 p-2 rounded-md w-1/2 main-color-bg'>Registrati</button>
            </div>
          </form>
          <div className='mt-8 text-gray-500 mx-auto max-w-max'>
              Hai già un account?
            <Link to={'/login'}>
              <span className='text-lg main-color font-bold'> Accedi</span> 
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
