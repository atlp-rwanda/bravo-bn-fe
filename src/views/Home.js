import * as React from 'react';
import Container from '@mui/material/Container';
import {  Box, Button, Card, CardMedia, Typography } from '@mui/material';
import background from  '../assets/background.png';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import  Accommodation from '../components/Accommodation';
import { Link } from 'react-router-dom';
import PreLoader from "../components/PreLoader";
import Footer from '../components/dashboard/Footer'
import { useDispatch, useSelector } from 'react-redux';
import { alertActions } from '../redux/alertSlice';
import axios from 'axios';
import { accommodationsActions } from '../redux/accommodationsSlice';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



export default function Home() {
    const [age, setAge] = React.useState('');
    const dispatch = useDispatch();
    const token= useSelector(state=> state.auth.token);
    const accommodations= useSelector(state=> state.accommodations.accommodations);
    const getLocation= useSelector(state=> state.accommodations.getLocation);
    const getReviews= useSelector(state=> state.accommodations.getReviews);

    const handleChange = (event) => {
      setAge(event.target.value);
    };

    React.useEffect(()=>{
        if(!accommodations || accommodations.length == 0  ){
  
          axios.get(`${process.env.API_URL}/accomodation`, {
            headers: { Authorization: `Bearer ${token}` },
          }).then((res)=>{
            dispatch(accommodationsActions.fetchLocation({getLocation:true}));
            dispatch(accommodationsActions.fetchReviews({getReviews:true}));
            dispatch(
                accommodationsActions.getAccommodations({accommodations: res.data.data.rows})
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
      },[accommodations]);

      const getAllLocation = (locationId,index)=>{
        if(getLocation){
        if(!accommodations[index]['location']){
  
          axios.get(`${process.env.API_URL}/location/${locationId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }).then((res)=>{
            dispatch(accommodationsActions.updateAccommodations({index,property:'location',value:res.data.data?.location.locationName}));
            dispatch(accommodationsActions.fetchLocation({getLocation:false}));
          }).catch(err=> console.log(err))
        }
      }
    }
      const getAllReviews = (accommodationId,index)=>{
        if(getReviews){
        if(!accommodations[index]['reviews']){
  
          axios.get(`${process.env.API_URL}/feedback/getAll/${accommodationId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }).then((res)=>{
            dispatch(accommodationsActions.updateAccommodations({index,property:'reviews',value:res.data.feedback.length}));
            dispatch(accommodationsActions.fetchReviews({getReviews:false}));
          }).catch(err=> console.log(err))
        }
      }
    }


    return (
        <>
        <Container maxWidth="xl"  className="book-container" >
              <Card sx={{height: "70vh"}}>
    <div style={{ position: "relative" }}>
      <CardMedia   component="img" sx={{height:'70vh'}} image={background} title="Pancakes" alt="Pancakes"/> 
      <div style={{position: "absolute", textAlign:'center', color: "white",top: '25%',left: "50%",transform: "translateX(-50%)",}}> 
      <Typography sx={{fontSize:'2.5em', letterSpacing: '.3rem',fontWeight:'900'}}>Explore Beautiful Places</Typography>  
      <Typography sx={{fontSize:'1em', maxWidth:'500px', margin:'auto'}}>We always make our customers happy by providing as many choice as possible</Typography>  
      <Link to='/create-request' style={{padding:'10px 15px', marginTop:'40px',textDecoration:'none', color:'white', borderRadius:'5px'}} variant="contained" className='button'>Book Now</Link>
          </div>
  </div>
</Card>
        <Box sx={{boxShadow:'0 5px 15px rgba(0, 0, 0, 0.25)',margin:'auto',borderRadius:'10px', width:'80%', position:'relative', top:'-30px', background:'white',padding:'5px 15px', display:'flex', justifyContent:'space-between'}}>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              margin:'auto 0',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            All hotels
          </Typography>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Sort</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={age}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        <MenuItem value={10}>Most traveled</MenuItem>
        <MenuItem value={20}>Most reviewed</MenuItem>
      </Select>
    </FormControl>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
            { accommodations ? accommodations.length > 0?
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 3, sm: 6, md: 12 }}>
        {accommodations.map((accommodation, index) => {
            getAllLocation(accommodation.locationId,index)
            getAllReviews(accommodation.id,index);
          return(<Grid item xs={2} sm={3} md={3} key={index}>
            <Item sx={{p:0}}>
                <Accommodation 
                image={accommodation.image}
                name={accommodation.name}
                location={accommodation.location}
                reviewsCount={accommodation.reviews}
                ratings={accommodation.reviews >=5? 5 : accommodation.reviews ==0 ? 1 : accommodation.reviews }
                />
            </Item>
          </Grid>)
})}
      </Grid>: 'No Accommodations' : <PreLoader />
      }
    </Box>

        </Container>
    <Footer/>
    </>
    );
}