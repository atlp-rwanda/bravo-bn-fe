import React from "react";
import "../../views/Home";
import About from "../../views/About";
import { Link } from "react-router-dom";
import barefootLogo from '../../assets/Barefoot. Nomad.svg'

const footer = () => {
    return ( 

        <div className="footer-content">
            <div>
                <h1><img src={barefootLogo} className="logo" alt="Barefoot logo"/></h1>
                <span>Barefoot nomad is a company makes easy for it’s</span>
                <span> savvy members of staff in making travels and booking </span>
                <span>accommodations
                </span>
                 <p className="footer__copy">&#169; Barefoot Nomad 2022</p>
                 </div>
        <div>
            <span>contact info</span>
            <span>+25078888888</span>
            <span>184 Main KG Street Down-town</span>
            <span>Mon – Sat 8.00 – 18.00 Sunday CLOSED</span>
            </div>
            
        <div>
        <span>quick links</span>
            <span><Link to="home"> Home</Link></span>
            <span><Link to="booking"> booking</Link></span>
            <span><Link to="about"> About Us</Link></span>
            <span><Link to="hotels"> hotels</Link></span>
            <span><Link to="contact"> contact Us</Link></span>
       

        </div>
        
    </div>
     );
}
 
export default footer;