import React, { useState, useEffect, Fragment } from "react";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  getRequestAsync,
  showRequest,
  searchRequestAsync,
  getRequests
} from "../../../redux/requests/requestSlice";
import { selectRequest } from "../../../redux/requests/selectedRequestSlice";
import DetailsPopUp from "./TripDetails";
import axios from "axios";


const columns = [
  { field: "leavingFrom", headerName: "Requester Address", width: 200 },
  { field: "travelReason", headerName: "Travel Reason", width: 400 },
  { field: "travelDate", headerName: "travelDate", width: 160 },
  { field: "returnDate", headerName: "returnDate", width: 160 },
  { field: "tripType", headerName: "type", width: 140 },
  { field: "status", headerName: "Status", width: 140 },
  { field: "goingTo", headerName: "Destination", width: 220 },
];

export default function TripRequests() {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const token = useSelector(state => state.auth.token);


  const dispatch = useDispatch();

  const getData = () => {
    axios.get(`${process.env.API_URL}/user/trip/get`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => {
      const unsortedData = res.data.data;
      const sortedData = unsortedData.sort((a, b) => b.id - a.id);
      dispatch(getRequests(sortedData))
    })
      .catch(error => {
        console.log(error)
      })

  }

  useEffect(() => {
    getData()
  }, []);
  let requests = useSelector(showRequest);


  let trips = requests[0];

  const checkPopup = (e) => {
    const data = e.row;
    dispatch(selectRequest(data));
    setOpen(true)
  };

  return (
    <Fragment>
      <DetailsPopUp open={open} setOpen={setOpen} getData={getData} />
      <div
        data-testid="requests-table"
        style={{ margin: "auto", height: "70%", width: "90%" }}
      >
        <h1 style={{ textAlign: "center" }}>Travel Requests</h1>
        <TextField
          id="search-bar"
          className="text"
          onChange={(e) => {
            e.preventDefault();
            setSearchTerm(e.target.value);
            dispatch(searchRequestAsync(searchTerm));
          }}
          variant="outlined"
          placeholder="Search..."
          style={{ paddingBottom: "0.5rem", width: "25%" }}
        />

        <DataGrid
          data-testid="requests-table"
          style={{ cursor: "pointer" }}
          rows={requests.length ? trips : ""}
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
      </div>
    </Fragment >
  );
}
