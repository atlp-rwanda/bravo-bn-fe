import React,{useState} from 'react';
import Contents from './Contents';
import Navbar from './Navbar';
import Footer from './footer';
import "./dashboard.scss";
const Dash = () => {

    const [activeTab,setActiveTab] = useState("");


    return ( 
        <div className='dashboard-container'>
             <div>
                <Navbar/>
             </div>
             
            <Contents />
            <Footer/>
        </div>
       
      
     );
}
 
export default Dash;