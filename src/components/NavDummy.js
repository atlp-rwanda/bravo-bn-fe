import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Nav() {
    return (
        <>
            {/* <nav className="nav-bar">
                <ul>
                    <li>
                        <Link to="/"> Home</Link>
                    </li>
                    <li>
                        <Link to="/about"> About</Link>
                    </li>
                    <li>
                        <Link to="dashboard"> Dashboard </Link>
                    </li>
                </ul>
            </nav> */}
            <Outlet />
        </>
    );
}
