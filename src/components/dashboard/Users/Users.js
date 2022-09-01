import React, { useEffect, useMemo, useState } from 'react';
import { DataGrid } from "@mui/x-data-grid"
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsersAsync,
  showUser
} from "../../../redux/users/userSlice";
import UserDetailsModal from './UserDetailsModal';


  const columns =[
    { field: "id", headerName: "id", width: 200 },
      {field: "image", headerName: "Profile", width: 100,
      renderCell: (params) => {
        return (
          <>
            <Avatar src={params.image} />
            {params.username}
          </>
        );
      }
    },
    { field: "username", headerName: "Username", width: 200 },
    { field: "email", headerName: "Email", width: 300 },
    {field: "role", headerName: "Role", width: 200, },
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "isVerified", headerName: "Verified", width: 100 }
  ]

  
export default function UsersTable() {

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users)
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);


  useEffect(() => {
    dispatch(getUsersAsync());
  }, []);

  
  const checkPopup = (e) => {
    setSelectedUser(e.row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (


    <div
      data-testid="Users-table"
      style={{ marginLeft: "500", height: 600, width: "80%" }}
    >
      <h1 style={{ textAlign: "left" }}>Users</h1>
     <DataGrid
        data-testid="Users-table"
        rows={users.length ? users : []}
        columns={columns}
        pageSize={15}
        onRowClick={(e) => {
          checkPopup(e);
        }}
        rowsPerPageOptions={[15]}
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
       <UserDetailsModal
        selectedValue={selectedUser}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}