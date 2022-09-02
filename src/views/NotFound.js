import * as React from 'react';
import Container from '@mui/material/Container';
import notFound from '../assets/not_found.svg';
import Footer from '../components/dashboard/Footer';
import { Box, Typography } from '@mui/material';

export default function NotFound() {
    return (
        <>
        <Container maxWidth="xl"  className="book-container" >
            <Box style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center',
    height: '100vh',
    }}>

              <img style={{width:'50%'}} src={notFound}/>
                  <Typography sx={{pt:3,fontWeight:'900', fontSize:'1.5em'}}>Page not found!</Typography>
            </Box>
        </Container>
    <Footer/>
    </>
    );
}