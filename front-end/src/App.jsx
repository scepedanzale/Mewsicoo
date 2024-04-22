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
import AlbumPage from './pages/music/AlbumPage';
import ArtistPage from './pages/music/ArtistPage';
import FollowsPage from './pages/FollowsPage';
import ProfilePage from './pages/users/ProfilePage';
import EditProfilePage from './pages/users/EditProfilePage';
import SettingsPage from './pages/users/SettingsPage';
import PostPage from './pages/posts/PostPage';
import EditPostPage from './pages/posts/EditPostPage';
import SearchPage from './pages/SearchPage';
import NewPostPage from './pages/posts/NewPostPage';
import SavedPage from './pages/SavedPage';

function App() {

  return (
    <>    
      <Routes>
        <Route path='*' element={<NotFoundPage/>}/>
        <Route element={<AuthLayout/>}>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/search/:element' element={<SearchPage/>}/>
          <Route path='/album/:id' element={<AlbumPage/>}/>
          <Route path='/artist/:id' element={<ArtistPage/>}/>
          <Route path='/post/:id' element={<PostPage/>}/>
          <Route path='/new/post' element={<NewPostPage/>}/>
          <Route path='/edit/post/:id' element={<EditPostPage/>}/>
          <Route path='/profile/user/:id' element={<ProfilePage/>}/>
          <Route path='/user/:id/follows/:follows' element={<FollowsPage/>}/>
          <Route path='/user/:id/saved/:saved' element={<SavedPage/>}/>
          <Route path='/account/edit' element={<EditProfilePage/>}/>
          <Route path='account/settings' element={<SettingsPage/>}/>
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
