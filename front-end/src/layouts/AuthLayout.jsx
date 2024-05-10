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
      <div className='outlet-div col-12 col-md-11 overflow-auto'>
        <div className='container-fluid mx-auto mb-20 p-3 md:w-5/6 lg:w-2/3 xl:w-1/2 2xl:w-2/5'>
          <Outlet /> 
        </div>
      </div>
      <div className='col sticky-bottom bottom-1'>
        <Navbar/>
      </div>
    </div>
  </>
  : <Navigate to="/login" />
}
