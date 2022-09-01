import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  getRequests,
  showRequest,
  searchRequestAsync,
} from "../../redux/requests/requestSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const columns = [
  { field: "leavingFrom", headerName: "Requester Address", width: 200 },
  { field: "travelReason", headerName: "Travel Reason", width: 200 },
  { field: "travelDate", headerName: "travelDate", width: 140 },
  { field: "returnDate", headerName: "returnDate", width: 140 },
  { field: "tripType", headerName: "type", width: 120 },
  { field: "status", headerName: "Status", width: 140 },
  { field: "goingTo", headerName: "Destination", width: 140 },
];

export default function RequestsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(false);
  const token = useSelector(state => state.auth.token);
  const navigate = useNavigate()

  console.log(user, "user")

  const selectRow = (e) => {
    setSelected(!selected);
  };

  const dispatch = useDispatch();

  const getData = () => {
    axios.get(`${process.env.API_URL}/user/trip/get`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => {
      dispatch(getRequests(res.data.data))
    }).catch(error => {
      console.log(error)
    })
  }

  const user = useSelector((state) => state.login.user);

  useEffect(() => {
    if (user.role == 'requester') {
      navigate('/')
    }
    getData()
  }, [user]);
  let requests = useSelector(showRequest);
  let trips = requests[0]

  return (
    <div
      data-testid="requests-table"
      style={{ margin: "auto", height: 600, width: "80%" }}
    >
      <h1 style={{ textAlign: "left", paddingBottom: 40 }}>Travel Requests</h1>
      <form style={{ paddingBottom: 24 }}>
        <TextField
          id="search-bar"
          className="text"
          style={{ width: 240 }}
          onChange={(e) => {
            e.preventDefault();
            setSearchTerm(e.target.value);
            dispatch(searchRequestAsync(searchTerm));
          }}
          label="Search trip requests"
          variant="outlined"
          placeholder="Search..."
          size="larger"
        />
      </form>
      <div style={{ display: `${selected ? "flex" : "none"}`, justifyContent: "flex-end", paddingBottom: 10 }}>
        <Button
          align="right"
          variant="outlined"
          color="error"
          style={{ width: 180, height: 38 }}
        >
          DELETE
          <DeleteIcon style={{ paddingLeft: 20 }} />
        </Button>
      </div>
      <DataGrid
        data-testid="requests-table"
        rows={requests.length ? trips : ""}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[15]}
        onRowClick={(e) => {
          selectRow(e)
        }}
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
