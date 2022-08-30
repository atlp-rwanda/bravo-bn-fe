import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from '../views/About';
import PrivateRoutes from '../utils/PrivateRoutes';
import Login from '../views/Login';
import Signup from '../views/Signup';
import Dashboard from '../views/Dashboard';
import RequestsTable from '../components/dashboard/RequestsTable';
import Reset from '../views/Reset';
import Respassword from '../views/Respassword';

import PopupModal from "../components/Modal/Modal.js"


const routes= () => {
  return (
  
      <Routes>
      <Route  element={<PrivateRoutes/>}>
        <Route exact path="/" element={<Dashboard/>}/>
        <Route exact path="/about" component={<About/>}/>
        <Route exact path="/dashboard" component={<Dashboard/>}/>
        <Route exact path="/dashboard/requests" element={<RequestsTable/>}/>
      </Route >
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/reset' element={<Reset/>}/>
      <Route exact path="/password/:token" element={<Respassword/>}/>
      <Route path='/modal' element={<PopupModal/>}/>
    </Routes>
 
  );
}
export default routes;
