import React from 'react'
import { Link } from "react-router-dom";
export default function Nav() {
    return (

        <nav>
            <span>
                <Link className="nav-link active" aria-current="page" to="/Home">home</Link> <br></br>
                <Link className="nav-link" to="/Login">login</Link>
            </span>
        </nav>

    );
}