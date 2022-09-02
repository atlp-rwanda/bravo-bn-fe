import React, { useState, useEffect, Fragment } from "react";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {

  showRequest,
  getRequests
} from "../../../src/redux/requests/accomodationSlice";
import selectRequest from "../../../src/redux/requests/accomodationSlice";
import DetailsPopUp from "./tripsRequest/TripDetails";
import axios from "axios";
import Nav from "../NavDummy";
import Sidebar from "./Sidebar";


const columns = [
  { field: "name", headerName: "Name", width: 100 },
];

export default function AccomodationTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [accomodationData, setAccomodationData] = useState([]);
  const token = useSelector(state => state.auth.token);


  const dispatch = useDispatch();

  const getData = () => {
    axios.get(`${process.env.API_URL}/accomodation`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => {
        console.log("response",res);
      const unsortedData = res.data.data.rows;
      const sortedData = unsortedData.sort((a,b) => b.id - a.id);
        setAccomodationData(sortedData);
     
    })
      .catch(error => {
        console.log(error)
      })

  }
  

  useEffect(() => {
    getData()
  }, []);
  console.log("get",accomodationData);


  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'description', headerName: 'Description', width: 130 },
    {
        field: 'highlight',
        headerName: 'Highlight',
      width: 90,
    },
    {
      field: 'highlight',
      headerName: 'Highlight',
      description: 'This column has a value getter and is not sortable.',
      
      width: 160,
    },
    {
        field: 'geoLocation',
        headerName: 'Gelocation',
        description: 'This column has a value getter and is not sortable.',
        width: 160,
      },
  ];
  
  const rows = accomodationData;


  return (
      <div>
      <Nav/>
      <div style={{display: 'flex', flexDirection: 'row'}}>
      <div>
      <Sidebar/> 
      </div>   
    <div style={{ height: 400, width: '100%',margin:20 }}>
        <h2 style={{color:"#046CC6",margin:20}}>Accomodation facilities list</h2>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
    </div>
    </div>
  );
}
