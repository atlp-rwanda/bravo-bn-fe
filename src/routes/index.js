import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from '../views/About';
import PrivateRoutes from '../utils/PrivateRoutes';
import Login from '../views/Login';
import Signup from '../views/Signup';
import Dashboard from '../views/Dashboard';
import Reset from '../views/Reset';
import Respassword from '../views/Respassword';
import PopupModal from "../components/Modal/Modal.js"
import Booking from '../views/Book';
import Home from '../views/Home';
import CreateRequest from '../views/CreateRequest';
import RequestsTable from '../components/dashboard/RequestsTable';
import Map from '../../src/components/Map';
import Accomodation from "../views/Accomodation";
import Trips from '../views/Trips';
import NotFound from '../views/NotFound';
import AccomodationTable from '../components/dashboard/AccomodationTable';



const routes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/trip-requests" element={<Booking />} />
        <Route exact path="/create-request" element={<CreateRequest />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/dashboard/trips" element={<Trips />} />
        <Route path='*' exact={true} element={<NotFound />} />
      </Route >
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/reset' element={<Reset/>}/>
      <Route exact path="/password/:token" element={<Respassword/>}/>
      <Route path='/modal' element={<PopupModal/>}/>
      <Route path='/map' element={<Map />}/>
      <Route  exact path="accomodation" element={<Accomodation />}/>
      <Route  exact path="/facilitytable" element={<AccomodationTable />}/>
      <Route path='*' exact={true} element={<NotFound />} />
    </Routes>
  );
}

export default routes;