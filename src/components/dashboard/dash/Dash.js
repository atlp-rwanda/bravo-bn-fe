import React,{useState} from 'react';
import Contents from '../Contents/Contents';
import Navbar from '../Navbar/Navbar';
import Footer from '../../footer/footer';
const Dash = () => {

    const [activeTab,setActiveTab] = useState("");


    return ( 
        <div>
             <div>
                <Navbar/>
             </div>
            <Contents />
            <Footer/>
        </div>
       
      
     );
}
 
export default Dash;