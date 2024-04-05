import { createContext, useContext, useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({children}) {

    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const csrf = async () => {
        await axios.get("/sanctum/csrf-cookie");
      };

    const getUser = async () => {
        const { data } = await axios.get('api/user')
        setUser(data)
    }

    const login = async ({ ...data }) => {
        setErrors([]);
        await csrf()
        try{
            await axios.post('/login', {data})
            //getUser();
            navigate('/')
          }catch(e){
            if(e.response.status == 422)
              setErrors(e.response.data.errors)
          }
    }

    const register = async ({ ...data }) => {
      setErrors([]);
        await csrf()
        try{
            await axios.post('/register', data)
            //getUser();
            navigate('/')
          }catch(e){
            if(e.response.status === 422)
              setErrors(e.response.data.errors)
          }
    }

    const logout = async () => {
      axios.post('/logout')
      .then(()=>{
        setUser(null)
        navigate('/')
      })
    }

  return (
    <AuthContext.Provider value={{user, errors, getUser, login, register}}>
        {children}
    </AuthContext.Provider>
  )
}

export default function useAuthContext(){
    return useContext(AuthContext)
} 