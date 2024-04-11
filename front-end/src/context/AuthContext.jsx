import { createContext, useContext, useEffect, useState } from 'react';
import {server} from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoggedUserFollowers, setLoggedUserFollowings } from '../redux/actions/actions';

const AuthContext = createContext();

export function AuthProvider({children}) {

    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const csrf = async () => {
        await server.get("/sanctum/csrf-cookie");
      };

    const getUser = async () => {
      try {
        const { data } = await server.get('api/user-auth');
        setUser(data);
        dispatch(setLoggedUserFollowers(data.followers))
        dispatch(setLoggedUserFollowings(data.followings))
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    const login = async ({ ...data }) => {
        setErrors([]);
        await csrf()
        try{
            await server.post('/login', data)
            await getUser();
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
            await server.post('/register', data)
            await getUser();
            navigate('/')
          }catch(e){
            if(e.response.status === 422)
              setErrors(e.response.data.errors)
          }
    }

    const logout = async () => {
      server.post('/logout')
      .then(()=>{
        setUser(null)
        navigate('/')
      })
    }

    useEffect(()=>{
      if(!user){
        getUser();
      }
    }, [])

  return (
    <AuthContext.Provider value={{user, errors, getUser, login, register, logout, csrf}}>
        {children}
    </AuthContext.Provider>
  )
}

export default function useAuthContext(){
    return useContext(AuthContext)
} 