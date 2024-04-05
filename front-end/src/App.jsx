import './css/App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import AuthLayout from './layouts/AuthLayout';
import GuestLayout from './layouts/GuestLayout';

function App() {

  return (
    <>
      
      <Routes>
        <Route path='*' element={<NotFoundPage/>}/>
        <Route element={<AuthLayout/>}>
          <Route path='/' element={<HomePage/>}/>
        </Route>
        <Route element={<GuestLayout/>}>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
