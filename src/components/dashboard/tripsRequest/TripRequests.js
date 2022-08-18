import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  getRequestAsync,
  showRequest,
  searchRequestAsync,
} from "../../../redux/requests/requestSlice";
import { selectRequest } from "../../../redux/requests/selectedRequestSlice";

const columns = [
  { field: "leavingFrom", headerName: "Requester Address", width: 200 },
  { field: "travelReason", headerName: "Travel Reason", width: 200 },
  { field: "travelDate", headerName: "travelDate", width: 140 },
  { field: "returnDate", headerName: "returnDate", width: 140 },
  { field: "tripType", headerName: "type", width: 120 },
  { field: "status", headerName: "Status", width: 140 },
  { field: "goingTo", headerName: "Destination", width: 210 },
];

export default function TripRequests({ setOpenPopup, openPopup, setData }) {
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  let requests = useSelector(showRequest);

  useEffect(() => {
    dispatch(getRequestAsync());
  }, []);

  let trips = requests[0];

  const checkPopup = (e) => {
    const data = e.row;
    dispatch(selectRequest(data));
    setOpenPopup(true);
  };

  return (
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
  );
}
