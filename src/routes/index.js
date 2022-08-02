import React from 'react';
import { useRoutes } from 'react-router-dom';

import Nav from '../components/NavDummy';
import Home from '../views/Home';
import Login from '../views/Login';
import About from '../views/About';
import SignUp from '../views/Signup';


export default function Router() {
    let element = useRoutes([
        {
            path: "/",
            element: <Nav />,
            children: [
                { path: "home", element: <Home /> },
                { path: "about", element: <About /> },
                { path: "signup", element: <SignUp /> },
                { path: "login", element: <Login /> },
            ]
        }


    ]);

    return element;
}