import React,{useState} from 'react';
import "./Contents.scss";

import Sidebar from '../Sidebar/Sidebar';
import ContentElements from "../contentElements/ContentElements";
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