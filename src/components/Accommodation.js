import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';


export default function Accommodation(props) {
  let stars =[];
  for(let a=0;a< props.ratings;a++){
    stars.push(<StarIcon key={a} sx={{height:'0.7em',width:'0.7em'}}/>)
  }

    return (
           
        <Card sx={{boxShadow:'none',borderRadius:0}}>
        <CardMedia
                component="img" 
                sx={{ width: '100%' }}
                image={props.image}
                alt={props.name}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', textAlign:'start', width:'fit-content%', padding:'30px 15px'}}>
               <Typography sx={{ fontWeight:'900'}}>{props.name}</Typography>
               <Typography sx={{fontSize:'0.8em'}}>{props.location}</Typography>
               <Box sx={{display:'flex', pt:'10px', justifyContent:'space-between'}}>
               <Typography sx={{color:'#046CC6'}}>
                 {stars.map(star=> {return star})}
                </Typography>
               <Typography sx={{fontSize:'0.7em'}}>{props.reviewsCount} Reviews</Typography>
               </Box>
                
                </Box>
        
              </Card>
          
    );
  }