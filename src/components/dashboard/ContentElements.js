import React from 'react';
import Users from './Users';

const ContentElements = ({openPopup,setOpenpopup, setRowId, rowId}) => {
    return ( 
        <div>
          <Users openPopup={openPopup} setOpenpopup={setOpenpopup} setRowId={setRowId}/>
        </div>
        
     );
}
 
export default ContentElements;