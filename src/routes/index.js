import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../views/Home';
import About from '../views/About';
import PrivateRoutes from '../utils/PrivateRoutes';
import Login from '../views/Login';
import Signup from '../views/Signup';
import Users from '../components/dashboard/Users';
import Dashboard from '../views/Dashboard';


const routes= () => {
  return (
      <Routes>
      <Route  element={<PrivateRoutes/>}>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/about" component={<About/>}/>
        <Route exact path="/dashoard" component={<Dashboard/>}/>
        <Route exact path="/dashboard/users" component={<Users/>}/>
      </Route >
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
  );
}
export default routes;
