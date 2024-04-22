import { Navigate, Outlet } from 'react-router-dom'
import useAuthContext from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Topbar from '../components/Topbar'

export default function AuthLayout() {
  const { user } = useAuthContext()

  return  user ? 
  <>
    <Topbar/>
    <div className='md:flex h-100'>
      <div className='col-12 col-md-11 h-100'>
        <Outlet /> 
      </div>
      <div className='col sticky-bottom bottom-1'>
        <Navbar/>
      </div>

    </div>
  </>
  : <Navigate to="/login" />
}
