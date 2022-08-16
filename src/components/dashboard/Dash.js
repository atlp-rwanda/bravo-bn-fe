import React,{useState} from 'react';
import Contents from './Contents';
import Navbar from './Navbar';
import Footer from './footer';
import Details from './details';

const Dash = () => {

    const [openPopup,setOpenpopup] = useState(false);
    const [rowId,setRowId] = useState(1);
   


    return ( 
        <div className='dashboard-container'>
            <Navbar/>
            <Contents openPopup={openPopup} setOpenpopup={setOpenpopup} setRowId={setRowId}/>
            <Footer/>
            <div className='popup-container' style={{display:`${openPopup ? "flex" : "none"}`}} >
                <Details openPopup={openPopup} setOpenpopup={setOpenpopup} setRowId={setRowId} rowId={rowId} />
            </div>
        </div>
     );
}
 
export default Dash;