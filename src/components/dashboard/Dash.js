import React,{useState} from 'react';
import Contents from './Contents';
import Navbar from './Navbar';
import Footer from './Footer';
import UserDetailsModal from './UserDetailsModal';

const Dash = () => {

    return ( 
        <div className='dashboard-container'>
            <Navbar/>
            <Contents  
            />
           
            
            <Footer/>
        </div>
     );
}
 
export default Dash;