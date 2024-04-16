import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiEdit } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import { server } from '../../api/axios'
import useAuthContext from '../../context/AuthContext'
import { updateInfo } from '../../redux/actions/actions';
import { Alert } from 'react-bootstrap';

export default function EditProfileComponent() {

    const dispatch = useDispatch();

    const {user, csrf} = useAuthContext()
    const loggedUser = useSelector(state => state.loggedUser.info)

    const [errors, setErrors] = useState([])
    const [alert, setAlert] = useState(false)

    const [name, setName] = useState(loggedUser.name)
    const [username, setUsername] = useState(loggedUser.username)
    const [biography, setBiography] = useState(loggedUser.biography)
    const [profile_img, setProfile_img] = useState(loggedUser.profile_img)

    const handleEditProfile = async (event) => {
      event.preventDefault();
      setErrors([]);
      const data = {name, username, biography, profile_img}
      await csrf()
      try{
          const response = await server.patch('api/user/'+user.id, data)
          if(response.status === 200){
              dispatch(updateInfo(data))
              setAlert(true)
          }
        }catch(e){
          if(e.response.status === 500){
            if (e.response.data.message.includes('Duplicate entry')) {
                setErrors('Questo username è già in uso.');
            } else {
                setErrors('Si è verificato un errore durante l\'aggiornamento del profilo.');
            }
           }
        }
    }


  return (
    <div className="container-fluid md:w-5/6 lg:w-2/3 xl:w-1/2 2xl:w-2/5">
        <div className="container-fluid box order-1 order-sm-2 border-2 p-3 rounded-md">
            {alert && 
            <Alert variant='success' className='flex items-center gap-2'  onClose={() => setAlert(false)} dismissible>
                <FaCheck className='text-success text-lg'/>Profilo modificato
            </Alert>}

            {/* profile img */}
            <div className="max-w-max mx-auto relative flex justify-center items-center rounded-full" type="button" data-bs-toggle="modal" data-bs-target="#profile_img_modal">
                <div className='icon_edit'><FiEdit /></div>
                <div className="edit_profile_img mx-auto overflow-hidden flex justify-center items-center rounded-full h-36 w-36 sm:h-48 sm:w-48">
                    <img src={profile_img} alt="profile image" className='object-cover h-full w-full'/>
                </div>
            </div>
                {/* modal profile img*/}
                <div class="modal fade" id="profile_img_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Cambia immagine profilo</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <form onSubmit={handleEditProfile}>
                                <input type="file" />
                                <div className="mt-4">
                                    <div className="mt-2">
                                        <label htmlFor="profile_img" className="block font-medium leading-6 text-gray-900">oppure inserisci URL dell'immagine</label>
                                        <input 
                                        id='profile_img'
                                        name="profile_img" 
                                        type="text"
                                        value={profile_img}
                                        onChange={(e)=>setProfile_img(e.target.value)}
                                        className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-grey-600 "/>
                                    </div>
                                </div>
                              <div class="modal-footer">
                                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                                  <button type="submit" class="btn main-color-btn" data-bs-dismiss="modal" aria-label="Close">Salva</button>
                              </div>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
        <form onSubmit={handleEditProfile} className="px-2">
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
              {errors && <div className='text-red-500 text-xs mt-1'>{errors}</div>}
            </div>
             {/* Biography */}
             <div className="mb-4">
              <label htmlFor="username" className="block  font-medium leading-6 text-gray-900">Biography</label>
              <div className="mt-2">
                <textarea 
                id="biography" 
                name="biography" 
                value={biography}
                onChange={(e)=>setBiography(e.target.value)}
                className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-grey-600 ">
                </textarea>
              </div>
            </div>

            <div className="mt-10 w-full flex justify-center gap-3">
                <button type='submit' className='text-neutral-100 p-2 rounded-md w-1/2 bg-gray-400 text-white'>Torna indietro</button>
                <button type='submit' className='text-neutral-100 p-2 rounded-md w-1/2 main-color-btn'>Salva</button>
            </div>
          </form>
        </div>
    </div>
  )
}
