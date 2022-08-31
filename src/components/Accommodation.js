import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';


export function Accommodation(props) {

    return (
           
        <Card sx={{boxShadow:'none',borderRadius:0}}>
        <CardMedia
                component="img" 
                sx={{ width: '100%' }}
                image={props.image}
                alt={props.name}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', textAlign:'start', width:'fit-content%', padding:'30px 15px'}}>
               <Typography sx={{ fontWeight:'900'}}>Selena hotel</Typography>
               <Typography sx={{fontSize:'0.8em'}}>Kigali</Typography>
               <Box sx={{display:'flex', pt:'10px', justifyContent:'space-between'}}>
               <Typography sx={{color:'#046CC6'}}><StarIcon sx={{height:'0.7em',width:'0.7em'}}/><StarIcon sx={{height:'0.7em',width:'0.7em'}}/><StarIcon sx={{height:'0.7em',width:'0.7em'}}/><StarIcon sx={{height:'0.7em',width:'0.7em'}}/></Typography>
               <Typography sx={{fontSize:'0.7em'}}>4 Reviews</Typography>
               </Box>
                
                </Box>
        
              </Card>
          
    );
  }