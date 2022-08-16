import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';   
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import {  Typography } from '@mui/material';
import { CommentsModal, DetailsModal } from '../components/Models';
import { UpdateModal } from '../components/Models';
import { TripRequest } from '../components/TripRequest';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { tripsActions } from '../redux/tripsSlice';
import PreLoader from "../components/PreLoader";
import { ErrorAlert, SuccessAlert } from '../components/Alerts';
import { alertActions } from '../redux/alertSlice';
import Pagination from '@mui/material/Pagination';
import usePagination from "../hooks/Pagination";
import { Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const alertStyle = {
  position: 'fixed', zIndex: '2000',right: '3%', bottom: '30px',
  transition: 'all 300ms linear 0s'
};

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  

  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: 0,
      transition: theme.transitions.create('width'),
      borderBottom:'1px solid #0000002b',
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));



export default function Booking() {
  const [comments, setComments] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');
    const [searchLoading, setSearchLoading] = React.useState(false);
    const [details, setDetails] = React.useState(false);
    const [filter, setFilter] = React.useState({year:'',month:'',day:''});
    const token= useSelector(state=> state.auth.token);
    const trips= useSelector(state=> state.trips.trips);
    const getComments= useSelector(state=> state.trips.getComments);
    const getLocation= useSelector(state=> state.trips.getLocation);
    const dispatch = useDispatch();
    const [update, setUpdate] = React.useState(false);
    const { errorMessage,successMessage }= useSelector(state=> state.alert);
    const count =  Math.ceil(trips?.length/4);
    const _DATA = usePagination(trips, 4);
  
    const handlePagination = (e, p) => {
      _DATA.jump(p);
      dispatch(tripsActions.fetchComments({getComments:true}));
      dispatch(tripsActions.fetchLocation({getLocation:true}));
    };



    const days = [];
    for(let a=1 ; a <= 31; a++){
      days.push(a)
    }
    const months = [
      {name:'January',value:'jan'},
      {name:'February',value:'feb'},
      {name:'March',value:'mar'},
      {name:'April',value:'apr'},
      {name:'May',value:'may'},
      {name:'June',value:'jun'},
      {name:'July',value:'jul'},
      {name:'August',value:'aug'},
      {name:'September',value:'sep'},
      {name:'October',value:'oct'},
      {name:'November',value:'nov'},
      {name:'December',value:'dec'}
    ]


    const closeComments = () => {
      dispatch(
          tripsActions.comments({comments: null})
        );
      dispatch(
          tripsActions.openTripRequest({value: null})
        );
      setComments(false)};
    const closeUpdate=() => setUpdate(false);
    const closeDetails=() => setDetails(false);
 
    React.useEffect(()=>{
      if(!trips || trips.length == 0 && searchValue.length ==0 ){

        axios.get(`${process.env.API_URL}/user/trip/get`, {
          headers: { Authorization: `Bearer ${token}` },
        }).then((res)=>{
          let tripIndex =[];
          res.data.data.map((trip,index)=>{
            trip.tripIndex = index;
            return tripIndex.push(trip)
          })

          dispatch(
            tripsActions.getTripRequests({trips: tripIndex})
            );
            
          }).catch(err=> {
            console.log(err)
            dispatch(
              alertActions.error({message: err.name == "AxiosError"? 'There was a network error': err.response.data.message })
              );
            })
            setTimeout(()=>{
              dispatch(
                alertActions.error({message: 'none'}));
              },10000)
        }
    },[trips,comments,searchValue]);


    

    const getAllLocation = (locationId,index)=>{
      if(getLocation){
        axios.get(`${process.env.API_URL}/location/${locationId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }).then((res)=>{
          dispatch(tripsActions.updateTripRequests({index,property:'location',value:res.data.data?.location.locationName}));
          dispatch(tripsActions.fetchLocation({getLocation:false}));
        }).catch(err=> console.log(err))
      }
  }
  const getAllComments = (tripId,index)=>{
    if(getComments){
      
      axios.get(`${process.env.API_URL}/user/trip/${tripId}/comments`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res)=>{
          dispatch(tripsActions.fetchComments({getComments:false}));
          dispatch(tripsActions.updateTripRequests({index,property:'commentsCount',value:res.data.comments.count}));
        }).catch(err=> console.log(err))
      }
        
    }
    

    const searchTerm = (e)=>{
      setSearchValue(`${e.target.value}`);
      if(searchValue.trim().length ==0) return;
      if(e.target.value.length == 0) return dispatch(
        tripsActions.getTripRequests({trips: null})
        );
        if(e.target.value.length >=3 ){

      setSearchLoading(true)
      axios.get(`${process.env.API_URL}/search/${searchValue}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(async(res)=>{
        try{
          let allTrips = await axios.get(`${process.env.API_URL}/user/trip/get`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          let retrievedData =[]
          res.data.data.tripss.rows.map(el => retrievedData.push(el.id));
          let searchFilter = allTrips.data.data.filter( trip => retrievedData.includes(trip.id) );
          dispatch(
            tripsActions.getTripRequests({trips: searchFilter})
            );
            setSearchLoading(false)
          }catch(err){
            setSearchLoading(false)
            console.log(err)
          }
        }).catch(err=> {
          setSearchLoading(false)
          dispatch(
            alertActions.error({message: err.response.data.message })
            );
            setTimeout(()=>{
              dispatch(
                alertActions.error({message: 'none'}));
              },10000)
          })
        }
    }


  return (
    <Container maxWidth="xl"  className="book-container" >
      <Stack sx={alertStyle} spacing={2} >
        { errorMessage &&  errorMessage != 'none' && <ErrorAlert message={errorMessage}/> }
        { successMessage && successMessage != 'none' && <SuccessAlert message={successMessage}/> }
      </Stack>

      <CommentsModal
         open={comments}
         onClose={closeComments}
         />
         
         <UpdateModal
         open={update}
         onClose={closeUpdate}
         />
         <DetailsModal
         open={details}
         onClose={closeDetails}
         />

    <Box sx={{ flexGrow: 1 }} >
      <Grid container spacing={3} >
        <Grid item xs={8} >
          <Item className="book-grid" >
          <Stack spacing={2} direction="row" sx={{ display: { justifyContent: 'space-between' }}}>
      <Link to='/create-request' style={{padding:'10px 15px', textDecoration:'none', color:'white', borderRadius:'5px'}} variant="contained" className='button'>Create a trip request</Link>
      <Search>
            <StyledInputBase
              placeholder="search here..."
              inputProps={{ 'aria-label': 'search' }}
              value={searchValue}
              sx={{padding:'0'}}
              onChange={searchTerm}
            />
              <SearchIcon sx={{cursor:'pointer', mb:'-8px'}} />
          </Search>
    </Stack>
    <Typography variant="h6" component="h6" pt={8} sx={{ textAlign:'start', fontWeight:600}}>
          My trip requests
</Typography>
{!trips && !errorMessage || searchLoading ? <PreLoader />:  trips?.length > 0? 
_DATA.currentData().map((trip,index)=>{
  getAllLocation(trip.accomodation?.locationId, trip.tripIndex)
  getAllComments(trip.id, trip.tripIndex)
return(
  <TripRequest
  key={index}
  location={trip.location}
  status={trip.status}
  commentsCount = {trip.commentsCount}
  accomodation={trip.accomodation}

  onDelete = {()=>{
    deleteTrip(trip.id,index)
  }}
   openComments={() => {
    dispatch(tripsActions.openTripRequest({value: trip.tripIndex}) );
    setComments(true)
   }}
   openUpdate={() => {
    dispatch(tripsActions.openTripRequest({value: trip.tripIndex}) );
    setUpdate(true)
  }}
   openDetails={() => {
    dispatch(tripsActions.openTripRequest({value: trip.tripIndex}) );
    setDetails(true)
  }}
   />
)
})

:<Typography variant="h5"  sx={{ textAlign:'center', fontWeight:600}}>
No records 
</Typography>
}
   
        {
            trips?.length > 4? <Stack sx={{p:2}}>
            <Pagination sx={{display:'flex', justifyContent:'center'}} onChange={handlePagination} count={count} color="primary" />
          </Stack> :''
        }
          
          </Item>

        </Grid>
        <Grid item xs={4} >
          <Item className="book-grid">
              <Box sx={{ minWidth: 120 }}>
      <Box
      sx={{
        width: '100%',
        color: '#fff',
        '& > .MuiBox-root > .MuiBox-root': {
          p: 1,
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
        },
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
          gridTemplateRows: 'auto',
          gridTemplateAreas: `"month month day day"
        "year year year year"
        "button button button button"`,
        }}
      >
        <Box sx={{ gridArea: 'month' }}><FormControl fullWidth >
        <InputLabel id="demo-simple-select-label " className='select-input'>Choose a month</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter.month}
          label="Choose a month"
          className="select-form-control"
          onChange={(e)=> setFilter({...filter,month:e.target.value})}
        >
          {months.map((month,index)=>{
           return <MenuItem key={index} value={month.value}>{month.name}</MenuItem>
          })}
        </Select>
      </FormControl></Box>
        <Box sx={{ gridArea: 'day'}}><FormControl fullWidth >
        <InputLabel id="demo-simple-select-label" className='select-input'>Choose a day</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter.day}
          label="Choose a day"
          onChange={(e)=> setFilter({...filter,day:e.target.value})}
        >
          {days.map((day)=>{
           return <MenuItem key={day} value={day}>{day}</MenuItem>
          })}
        </Select>
      </FormControl></Box>
        <Box sx={{ gridArea: 'year' }}>
            <TextField
            sx={{minWidth:'100%'}}
          id="outlined-number"
          value={filter.year}
          onChange={(e)=> setFilter({...filter,year:e.target.value})}
          label="Add a year"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        /></Box>
        <Box sx={{ gridArea: 'button' }}><Button variant="contained" className='button' fullWidth>Filter</Button></Box>
      </Box>
    </Box>
    </Box>
    </Item>
        </Grid>
      </Grid>
    </Box>
    </Container>
  );
}