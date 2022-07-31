import React from "react";
import { Routes, Route } from 'react-router-dom';

import Nav from '../components/NavDummy';
import Home from '../views/Home';
import Login from '../views/Login';

export default function AllRoutes() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Nav />} />
                <Route path='home' element={<Home />} />
                <Route path='login' element={<Login />} />
            </Routes>
        </div>
    );
}