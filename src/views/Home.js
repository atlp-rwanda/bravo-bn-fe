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
import { Accommodation } from '../components/accommodation';
import Footer from '../components/dashboard/footer'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



export default function Home() {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };

    return (
        <>
        <Container maxWidth="xl"  className="book-container" >
              <Card sx={{height: "70vh"}}>
    <div style={{ position: "relative" }}>
      <CardMedia   component="img" sx={{height:'70vh'}} image={background} title="Pancakes" alt="Pancakes"/> 
      <div style={{position: "absolute", textAlign:'center', color: "white",top: '25%',left: "50%",transform: "translateX(-50%)",}}> 
      <Typography sx={{fontSize:'2.5em', letterSpacing: '.3rem',fontWeight:'900'}}>Explore Beautiful Places</Typography>  
      <Typography sx={{fontSize:'1em', maxWidth:'500px', margin:'auto'}}>We always make our customers happy by providing as many choice as possible</Typography>  
      <Button sx={{mt:5, px:3}} variant="contained" className='button'>Book Now</Button>
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
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 3, sm: 6, md: 12 }}>
        {Array.from(Array(6)).map((_, index) => (
          <Grid item xs={2} sm={3} md={3} key={index}>
            <Item sx={{p:0}}>
                <Accommodation 
                image={background}
                name="Selena"
                />
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>

        </Container>
    <Footer/>
    </>
    );
}