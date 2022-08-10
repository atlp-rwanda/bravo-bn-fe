import React,{useState} from 'react';


import Sidebar from './Sidebar';
import ContentElements from "./ContentElements";
const Contents = () => {

    const [activeTab,setActiveTab] = useState("");

    return ( 
            <div className="contents-container">
                <div className="sidebar"><Sidebar /> </div>
                 <div className="contents">
                    <ContentElements />
                 </div>
            </div>
     );
    }

export default Contents;