import React,{useState} from 'react';


import Sidebar from './Sidebar';
import ContentElements from "./ContentElements";
const Contents = ({openPopup, setOpenpopup, setRowId, rowId}) => {

    const [activeTab,setActiveTab] = useState("");

    return ( 
            <div className="contents-container">
                <div className="sidebar"><Sidebar /> </div>
                 <div className="contents">
                    <ContentElements openPopup={openPopup} setOpenpopup={setOpenpopup} setRowId={setRowId} rowId={rowId} />
                 </div>
            </div>
     );
    }

export default Contents;