import './css/styles.css'
import { Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/account/RegisterPage';
import LoginPage from './pages/account/LoginPage';
import ForgotPasswordPage from './pages/account/ForgotPasswordPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import AuthLayout from './layouts/AuthLayout';
import GuestLayout from './layouts/GuestLayout';
import ResetPassword from './pages/account/ResetPassword';

function App() {

  return (
    <>
      
      <Routes>
        <Route path='*' element={<NotFoundPage/>}/>
        <Route element={<AuthLayout/>}>
          <Route path='/' element={<HomePage/>}/>
        </Route>
        <Route element={<GuestLayout/>}>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
          <Route path='/password-reset/:token' element={<ResetPassword/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
