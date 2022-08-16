import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { DataGrid } from "@mui/x-data-grid"
import Avatar from "@mui/material/Avatar";


const Users = ({ setOpenpopup, setRowId, openPopup }) => {

  const [users, setUsers] = useState([]);

  const columns = useMemo(()=>[
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
  ], []);

  useEffect(() => {
    const renderState = async () => {
      const res = await axios.get(
        `https://bravo-bfn-be.herokuapp.com/api/v1/user/`
      );
      const { data } = res.data;

      setUsers(data)
    };
    renderState();
  }, []);

  const checkPopup = (e) => {
    setOpenpopup(true);
    setRowId(e.id);
  }

  return (


    <div style={{ margin: "10px", height: 600, width: "80%", cursor: "pointer" }}
    >

      <DataGrid
        data-testid="users-table"
        rows={users}
        columns={columns}
        getRowId={(row) => row.id}
        onRowClick={(e) => {checkPopup(e);}}
        pageSize={15}
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
        onCellEditCommit={(params) => setRowId(params.id)}
      />
    </div>

  );
}

export default Users;