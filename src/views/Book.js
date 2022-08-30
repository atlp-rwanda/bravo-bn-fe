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
import { CommentsModal } from '../components/Models';
import { TripRequest } from '../components/TripRequest';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { tripsActions } from '../redux/tripsSlice';
import PreLoader from "../components/PreLoader";
import { ErrorAlert, InfoAlert, SuccessAlert, WarnAlert } from '../components/Alerts';
import { alertActions } from '../redux/alertSlice';


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
    const [filter, setFilter] = React.useState({year:'',month:'',day:''});
    const dispatch = useDispatch();
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
    const token= useSelector(state=> state.auth.token);
    const trips= useSelector(state=> state.trips.trips);
    const {warnMessage, infoMessage, errorMessage,successMessage }= useSelector(state=> state.alert);

    React.useEffect(()=>{
      if(!trips || trips.length == 0 && searchValue.length ==0 ){

        axios.get(`${process.env.API_URL}/user/trip/get`, {
          headers: { Authorization: `Bearer ${token}` },
        }).then((res)=>{
          dispatch(
            tripsActions.getTripRequests({trips: res.data.data})
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

    

    const getLocation = (locationId,index)=>{
      if(!trips[index]['location']){

        axios.get(`${process.env.API_URL}/location/${locationId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }).then((res)=>{
          dispatch(
            tripsActions.updateTripRequests({index,property:'location',value:res.data.data?.location.locationName}));
          }).catch(err=> console.log(err))
        }
    }
    const getComments = (tripId,index)=>{
        axios.get(`${process.env.API_URL}/user/trip/${tripId}/comments`, {
          headers: { Authorization: `Bearer ${token}` },
        }).then((res)=>{
          dispatch(tripsActions.updateTripRequests({index,property:'commentsCount',value:res.data.comments.count}));
          }).catch(err=> console.log(err))
        
    }
    

  return (
    <Container maxWidth="xl"  className="book-container" >
      <Stack sx={alertStyle} spacing={2} >
        { warnMessage && warnMessage != 'none' && <WarnAlert message={warnMessage}/> }
        { infoMessage && infoMessage != 'none' && <InfoAlert message={infoMessage}/> }
        { errorMessage &&  errorMessage != 'none' && <ErrorAlert message={errorMessage}/> }
        { successMessage && successMessage != 'none' && <SuccessAlert message={successMessage}/> }
      </Stack>

         <CommentsModal
         open={comments}
         onClose={closeComments}
         />

    <Box sx={{ flexGrow: 1 }} >
      <Grid container spacing={3} >
        <Grid item xs={8} >
          <Item className="book-grid" >
          <Stack spacing={2} direction="row" sx={{ display: { justifyContent: 'space-between' }}}>
      <Button variant="contained" className='button'>Create a trip request</Button>
      <Search>
            <StyledInputBase
              placeholder="search here..."
              inputProps={{ 'aria-label': 'search' }}
              value={searchValue}
              sx={{padding:'0'}}
              onChange={(e)=>{setSearchValue(`${e.target.value}`);}}
            />
              <SearchIcon sx={{cursor:'pointer', mb:'-8px'}} />
          </Search>
    </Stack>
    <Typography variant="h6" component="h6" pt={8} sx={{ textAlign:'start', fontWeight:600}}>
          My trip requests
</Typography>
{!trips && !errorMessage ? <PreLoader />:  trips?.length > 0? 
trips.map((trip,index)=>{
  getLocation(trip.accomodation?.locationId,index)
  getComments(trip.id,index)
return(
  <TripRequest
  key={index}
  location={trip.location}
  status={trip.status}
  commentsCount = {trip.commentsCount}
  accomodation={trip.accomodation}

   openComments={() => {
    dispatch(tripsActions.openTripRequest({value: index}) );
    setComments(true)
  }}
   />
)
})

:<Typography variant="h5"  sx={{ textAlign:'center', fontWeight:600}}>
No records 
</Typography>
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
