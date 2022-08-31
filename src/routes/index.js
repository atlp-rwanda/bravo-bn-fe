import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from '../views/About';
import PrivateRoutes from '../utils/PrivateRoutes';
import Login from '../views/Login';
import Dashboard from '../views/Dashboard';
import Signup from '../views/Signup';
import Reset from '../views/Reset';
import Respassword from '../views/Respassword';
import PopupModal from "../components/Modal/Modal.js"
import { useSelector } from 'react-redux';


const routes= () => {
  const user= useSelector(state=> state.login.user);
  return (
  
      <Routes>

        <Route  element={<PrivateRoutes/>}>
          <Route exact path="/about" component={<About/>}/>
          <Route exact path="/dashboard/users" element={<Dashboard />} />
          {user.role =="requester"? <Route exact path="/about" component={<About/>}/> : <Route exact path="/dashboard" element={<Dashboard/>}/>}
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
