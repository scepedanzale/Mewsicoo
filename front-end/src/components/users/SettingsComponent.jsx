import React, { useEffect, useState } from 'react'
import useAuthContext from '../../context/AuthContext'
import { server } from '../../api/axios';
import { Alert } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_BIRTHDAY, UPDATE_EMAIL } from '../../redux/actions/actions';

export default function SettingsComponent() {

    const dispatch = useDispatch()

    const {user, csrf, logout, destroy} = useAuthContext();
    const loggedUser = useSelector(state => state.loggedUser)

    const [errorAge, setErrorAge] = useState('')
    const [errors, setErrors] = useState([])
    const [alertMsg, setAlertMsg] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    const [birth_day, setBirth_day] = useState(loggedUser.birth_day)
    const [email, setEmail] = useState(loggedUser.email)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPassword_confirmation, setNewPassword_confirmation] = useState('')

    /* controllo età */
    const handleBirthDayChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const currentDate = new Date();
        const ageDiff = currentDate.getFullYear() - selectedDate.getFullYear();
        const birthDayPassed = currentDate.getMonth() > selectedDate.getMonth() || 
                              (currentDate.getMonth() === selectedDate.getMonth() && currentDate.getDate() >= selectedDate.getDate());
        const isOver14 = ageDiff > 14 || (ageDiff === 14 && birthDayPassed);
    
        if (!isOver14) {
          setErrorAge('Devi avere almeno 14 anni')
          setBirth_day('');
        } else {
          setErrorAge('')
          setBirth_day(e.target.value);
        }
    };

    /* modifica password */
    const handlePassword = async (e) => {
        e.preventDefault();
        setErrors([]);
        await csrf();
        try {
            const response = await server.post('/api/change-password', { old_password: oldPassword, password: newPassword, password_confirmation: newPassword_confirmation });
            if(response.status === 200){
                setAlertMsg(response.data.message)
                setShowAlert(true)
            }
        } catch (e) {
            if(e.response)
              setErrors(e.response.data.error)
        }
    }
    /* modifica data di nascita */
    const handleBirthDay = async (e) => {
        e.preventDefault();
        setErrors([]);
        await csrf()
        try{
            const response = await server.patch('api/user/'+user.id, {birth_day})
            if(response.status === 200){
                dispatch({type: UPDATE_BIRTHDAY, payload: birth_day})
                setAlertMsg('Data di nascita aggiornata!')
                setShowAlert(true)
            }
        }catch(e){
            console.error(e)
        }
      }
    /* modifica email */
    const handleEmail = async (e) => {
        e.preventDefault();
        setErrors([]);
        await csrf()
        try{
            const response = await server.patch('api/user/'+user.id, {email})
            if(response.status === 200){
                dispatch({type: UPDATE_EMAIL, payload: email})
                setAlertMsg('Email aggiornata!')
                setShowAlert(true)
            }
        }catch(e){
            if(e.response.status === 500){
                if (e.response.data.message.includes('Duplicate entry')) {
                    setErrors('Questo email è già registrata.');
                } else {
                    setErrors('Si è verificato un errore durante l\'aggiornamento del profilo.');
                }
               }
        }
      }

  return (
    <div className='box'>
        {showAlert && 
            <Alert variant='success' className='flex items-center gap-2'  onClose={() => setShowAlert(false)} dismissible>
                <FaCheck className='text-success text-lg'/>{alertMsg}
            </Alert>}
        <div className="container-fluid">
            <h2 className='font-bold text-xl mb-3'>Impostazioni account</h2>

            <div className="row mb-4 border-1 p-1 rounded-md">
                <p className='font-bold text-lg text-gray-500'>Informazioni personali</p>
                <div className='mt-1 ml-2'>
                    {/* data di nascita */}
                    <p type="button" data-bs-toggle="modal" data-bs-target="#birth_day_modal" className='max-w-max'>Data di nascita</p>
                    <div class="modal fade" id="birth_day_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <p class="modal-title fs-5" id="exampleModalLabel">Cambia data di nascita</p>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form onSubmit={handleBirthDay}>
                                        <div className="mb-4">
                                            <label htmlFor="birth_day" className="block  font-medium leading-6 text-gray-900">Data di nascita</label>
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
                                        <div class="modal-footer">
                                        <button type="button" class="btn empty-btn" data-bs-dismiss="modal">Chiudi</button>
                                        <button type="submit" class="btn colored-btn" data-bs-dismiss="modal" aria-label="Close">Modifica</button>
                                    </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* email */}
                    <p type="button" data-bs-toggle="modal" data-bs-target="#email_modal" className='max-w-max'>Email</p>
                    <div class="modal fade" id="email_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <p class="modal-title fs-5" id="exampleModalLabel">Cambia email</p>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form onSubmit={handleEmail}>
                                        <div className="mb-4">
                                            <label htmlFor="email" className="block  font-medium leading-6 text-gray-900">Email</label>
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
                                            {errors && <div className='text-red-500 text-xs mt-1'>{errors}</div>}

                                        </div>
                                        <div class="modal-footer">
                                        <button type="button" class="btn empty-btn" data-bs-dismiss="modal">Chiudi</button>
                                        <button type="submit" class="btn colored-btn" data-bs-dismiss="modal" aria-label="Close">Modifica</button>
                                    </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* password */}
            <div className="row mb-4 border-1 p-1 rounded-md">
                <p className='font-bold text-lg text-gray-500'>Sicurezza</p> {/* ------------------ sicurezza --------------------- */}
                <div className='mt-1 ml-2'>
                    <p type="button" data-bs-toggle="modal" data-bs-target="#password_modal" className='max-w-max'>Modifica password</p>
                    <div class="modal fade" id="password_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <p class="modal-title fs-5" id="exampleModalLabel">Cambia password</p>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form onSubmit={(e)=>handlePassword(e)}>

                                        {/* old password */}
                                        <div className="mb-4">
                                            <label htmlFor="old_password" className="block  font-medium leading-6 text-gray-900">Password attuale</label>
                                            <div className="mt-2">
                                                <input 
                                                id="old_password" 
                                                name="old_password" 
                                                type="password"
                                                value={oldPassword}
                                                onChange={(e)=>setOldPassword(e.target.value)}
                                                minLength="8"
                                                required
                                                autofocus
                                                className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-grey-600 "/>
                                            </div>
                                            {errors.includes('vecchia password') && <div className='text-red-500 text-xs mt-1'>{errors}</div>}
                                        </div>
                                        {/* new password */}
                                        <div className="mb-4">
                                            <label htmlFor="new_password" className="block  font-medium leading-6 text-gray-900">Nuova password</label>
                                            <div className="mt-2">
                                                <input 
                                                id="new_password" 
                                                name="new_password" 
                                                type="password"
                                                value={newPassword}
                                                onChange={(e)=>setNewPassword(e.target.value)}
                                                minLength="8"
                                                required
                                                className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-grey-600 "/>
                                            </div>
                                        </div>
                                        {/* new password_confirmation */}
                                        <div className="mb-4">
                                            <label htmlFor="password_confirmation" className="block  font-medium leading-6 text-gray-900">Conferma Password</label>
                                            <div className="mt-2">
                                                <input 
                                                id="password_confirmation" 
                                                name="password_confirmation" 
                                                type="password"
                                                value={newPassword_confirmation}
                                                onChange={(e)=>setNewPassword_confirmation(e.target.value)}
                                                minLength="8"
                                                required
                                                className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-grey-600 "/>
                                            </div>
                                            {errors.includes('nuova password') && <div className='text-red-500 text-xs mt-1'>{errors}</div>}
                                        </div>
                                        <div class="modal-footer">
                                        <button type="button" class="btn empty-btn" data-bs-dismiss="modal">Chiudi</button>
                                        <button type="submit" class="btn colored-btn" data-bs-dismiss="modal" aria-label="Close">Modifica</button>
                                    </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="row mt-5 mb-2 flex flex-col">
            {/* logout */}
                <p className='font-semibold text-lg text-red-600 hover:text-red-800 mb-2 max-w-max' type="button" data-bs-toggle="modal" data-bs-target="#logout_modal">
                    Disconnettiti
                </p>
                <div class="modalfade" id="logout_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" className='modal'>
                    <div class="modal-dialog">
                        <div class="modal-content p-3">
                            <div class="text-end">
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="text-center">
                                <h1 class="modal-title fs-5 mb-4" id="exampleModalLabel">Vuoi disconnetterti?</h1>
                                <button type="button" class="btn btn-secondary w-25 mr-3" data-bs-dismiss="modal">Annulla</button>
                                <button type="button" class="btn bg-red-700 hover:bg-red-800 text-white w-25" data-bs-dismiss="modal" aria-label="Close" onClick={logout}>Esci</button>
                            </div>
                        </div>
                    </div>
                </div>
            {/* eliminazione */}
                <p className='font-semibold text-lg text-red-600 hover:text-red-800 max-w-max' type="button" data-bs-toggle="modal" data-bs-target="#destroy_account_modal">
                    Elimina Account
                </p>
                <div class="modalfade" id="destroy_account_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" className='modal'>
                    <div class="modal-dialog">
                        <div class="modal-content p-3">
                            <div class="text-end">
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="text-center">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Vuoi eliminare il tuo account?</h1>
                                <div class="modal-body mb-2">
                                    <p>Una volta eliminato non potrai più recuperare i tuoi dati.</p>
                                </div>
                                <button type="button" class="btn btn-secondary w-25 mr-3" data-bs-dismiss="modal">Annulla</button>
                                <button type="button" class="btn bg-red-700 hover:bg-red-800 text-white w-25" data-bs-dismiss="modal" aria-label="Close" onClick={()=>destroy(user.id)}>Elimina</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}