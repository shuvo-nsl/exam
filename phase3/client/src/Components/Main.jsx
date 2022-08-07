import React from 'react';
import {Router, Routes, Link, Route} from "react-router-dom";
import Home from '../pages/Home/Home';
import PrivateRoute from '../utils/PrivateRoute';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import PageNotFound from './PageNotFound/PageNotFound';
import ChangePassword from './ChangePassword/ChangePassword';
import AddProject from './AddProject/AddProject';
import Adduser from './adduser/Adduser';
import SingleProjects from './singleproject/singleProjects';
import ResponsiveAppBar from '../Components/Navbar/Navbar';
import Profile from './Profile/Profile';
import UpdateProject from './updateproject/UpdateProject';
const Main = () => {
  return (
    <div>
      <ResponsiveAppBar />
    <Routes>
      <Route path='/' index element={<Login />} />
      <Route path='/register' element={<SignUp />} />
      <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path='/changepassword' element={<ChangePassword />} />
      <Route path='/home' element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path='/addproject' element={<PrivateRoute><AddProject /></PrivateRoute>} />
      <Route path='/adduser' element={<PrivateRoute><Adduser /></PrivateRoute>} />
      <Route path='/projects/:id' element={<PrivateRoute><SingleProjects /></PrivateRoute>} />
      <Route path='/projects/:id/update' element={<PrivateRoute><UpdateProject /></PrivateRoute>} />
      <Route path='/*' element={<PageNotFound />} />
    </Routes>
    </div>
  )
}

export default Main