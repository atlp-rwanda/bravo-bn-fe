import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../views/Home';
import About from '../views/About';
import PrivateRoutes from '../utils/PrivateRoutes';
import Login from '../views/Login';
import Dashboard from '../views/Dashboard';

const routes= () => {
  return (
      <Routes>
        <Route  element={<PrivateRoutes/>}>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/about" component={<About/>}/>
          <Route exact path="/dashboard/users" element={<Dashboard />} />
        </Route >
        <Route path='/login' element={<Login/>}/>
    </Routes>
  );
}
export default routes;
