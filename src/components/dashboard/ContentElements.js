import React from 'react';
import Users from './Users';

const ContentElements = ({openPopup,setOpenpopup}) => {
    return ( 
        <div>
          <Users openPopup={openPopup} setOpenpopup={setOpenpopup}/>
        </div>
        
     );
}
 
export default ContentElements;