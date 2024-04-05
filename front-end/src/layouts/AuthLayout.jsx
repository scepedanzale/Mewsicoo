import { Navigate, Outlet } from 'react-router-dom'
import useAuthContext from '../context/AuthContext'
import Navbar from '../components/Navbar'

export default function AuthLayout() {
  const { user } = useAuthContext()

  return  user ? 
  <>
    <Navbar/>
    <Outlet /> 
  </>
  : <Navigate to="/login" />
}
