import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { DataGrid } from "@mui/x-data-grid"
    
      const columns = [
  { field: "username", headerName: "Username", width: 300 },
  { field: "image", headerName: "Profile", width: 300 },
  { field: "email", headerName: "Email", width: 300 },
  { field: "role", headerName: "Role", width: 200 },
  { field: "gender", headerName: "Gender", width: 100 },
  { field: "isVerified", headerName: "Verified", width: 100 },

];


const Users = ({openPopup,setOpenpopup}) => {
    const [users,setUsers]=useState([]);
    useEffect(() => {
        const renderState = async () => {
          const res = await axios.get(
            `https://bravo-bfn-be.herokuapp.com/api/v1/user/`
          );
        const {data}=res.data;
        
        setUsers(data)
        };
        renderState();
      }, []);
    return ( 
       
         <div style={{ margin: "10px", height: 600, width: "80%" }}
         >
           <DataGrid
         data-testid="requests-table"
         rows={users}
         columns={columns}
         pageSize={15}
         rowsPerPageOptions={[15]}
         checkboxSelection
         sx={{
           height: "100%",
           width: "100%",
           "& .MuiDataGrid-columnHeaderTitle": {
             color: "#f5f5f5",
           },
           "& .MuiDataGrid-columnHeadersInner": {
             backgroundColor: "#046CC6",
             fontWeight: "bold",
             textAlign: "center",
           },
           "& .MuiDataGrid-columnHeaderTitleContainerContent": {
             paddingLeft: "10px",
           },
           "& .MuiToolbar-root": {
             color: "#1565c0",
           },
           "& .MuiDataGrid-selectedRowCount": {
             color: "#1565c0",
           },
           "& .css-d3ri6l-MuiStack-root": {
             display: "grid",
             flexDirection: "column !important",
             alignItems: "start",
           },
         }}   
         />
         </div>
     );
}
 
export default Users;