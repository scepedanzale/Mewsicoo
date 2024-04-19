import { createContext, useContext, useEffect, useState } from 'react';
import {server} from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SET_LOGGED } from '../redux/actions/actions';
//import { setLogged, setLoggedUserFollowers, setLoggedUserFollowings, setPosts, updateBirthDay, updateEmail, updateInfo } from '../redux/actions/actions';

const AuthContext = createContext();

export function AuthProvider({children}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState([]);

    const csrf = async () => {
        await server.get("/sanctum/csrf-cookie");
      };

    const getUser = async () => {
      try {
        const { data } = await server.get('api/user-auth');
        setUser(data);
        dispatch({type: SET_LOGGED, payload: data})

        /* dispatch(updateInfo({id: data.id, biography: data.biography, name: data.name, profile_img: data.profile_img, username: data.username}))
        dispatch(updateBirthDay(data.birth_day))
        dispatch(updateEmail(data.email))
        dispatch(setPosts(data.posts))
        dispatch(setLoggedUserFollowers(data.followers))
        dispatch(setLoggedUserFollowings(data.followings)) */
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
        dispatch({type: SET_LOGGED, payload: {}})
        /* dispatch(updateInfo({}))
        dispatch(setPosts([]))
        dispatch(setLoggedUserFollowers([]))
        dispatch(setLoggedUserFollowings([])) */
        navigate('/')
      })
    }
    
    const destroy = async () => {
      server.delete('/api/user/'+ user.id)
      .then(()=>{
        setUser(null)
        dispatch({type: SET_LOGGED, payload: {}})
       /*  dispatch(updateInfo({}))
        dispatch(setPosts([]))
        dispatch(setLoggedUserFollowers([]))
        dispatch(setLoggedUserFollowings([])) */
        navigate('/')
      })
    }

    useEffect(()=>{
      if(!user){
        getUser();
      }
    }, [])

  return (
    <AuthContext.Provider value={{user, errors, getUser, login, register, logout, destroy, csrf}}>
        {children}
    </AuthContext.Provider>
  )
}

export default function useAuthContext(){
    return useContext(AuthContext)
} 