import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CheckIcon from '@mui/icons-material/Check';
import { PreLoaderSmallDanger } from './PreLoader';


export function TripRequest(props) {
const statusColor = props.status == 'pending' ? '#FFC107' : props.status == 'approved' ? '#4CAF50' : '#FF0000';

    return (
           
        <Card sx={{ display: 'flex', boxShadow:'none',   padding: '30px 0',borderRadius:0, borderBottom:'1px solid #CCCCCC'}}>
        <CardMedia
                component="img"
                sx={{ width: 250, borderRadius:'5px' }}
                image={props.accomodation.image}
                alt={props.accomodation.name}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', width:'100%', padding:'0 0 0 10px'}}>
                <CardContent sx={{  padding:'0 0 15px 0', display:'flex', justifyContent:'space-between'}}>
                  <Box>
                  <Typography component="div" variant="h6" color="primary.main" sx={{textAlign:'start'}}>
                  { props.accomodation.name}
                  </Typography>
                  <Typography variant="p" color="text.secondary" component="div" sx={{textAlign:'start'}}>
                  <ion-icon name="location"></ion-icon> { props.location }
                  </Typography>
                  </Box>
                  <Box>
                  <Typography  sx={{ border:`1px solid ${statusColor}`, color:`${statusColor}`, borderRadius:'20px', padding:'2px 10px', fontSize:'0.8rem', textTransform:'none'}}>
                  {props.status}
                </Typography>
                  </Box>
                </CardContent>
                <Box sx={{ float: 'left', pl: 1, pb: 2, textAlign:'start',maxWidth:'500px' }}>
                { props.accomodation.amenitiesList.map((eminity,index)=>{

                return <Typography key={index} variant="p" color="text.secondary" component="div" sx={{textAlign:'start', display:'inline-block',paddingRight:'30px'}}>
                  <CheckIcon sx={{ padding:0, marginBottom:'-3px', fontSize:'18px' ,color:'primary.main'}} /> {eminity}
                  </Typography>
                })}
                </Box>
                <Button onClick={props.openDetails} sx={{ width:'120px', textTransform:'none', fontSize:'0.7rem', fontWeight:'600', border:'1px solid #046CC6'}}>Trip details</Button>
                <Box sx={{ display:'flex', justifyContent:'space-between', padding:'20px 0 0 0'}}>
                <Typography onClick={props.openComments} variant="p" color="text.secondary" component="div" sx={{textAlign:'start', margin:' auto 0 0 0', fontWeight:'600', cursor:'pointer'}}>
                   {props.commentsCount} Comments
                  </Typography>
                <Box>
                  {props.status == 'pending' ?<><Button onClick={props.openUpdate} variant="contained" size="medium"  sx={{ marginRight:'10px',textTransform:'none'}}>
                  Update
                </Button>
                  <Button onClick={props.onDelete}  sx={{ textTransform:'none'}} variant="outlined" color='error' size="medium">
                  {props.loading ? <PreLoaderSmallDanger /> : 'Delete'}
                </Button></>
                :''}
                </Box>
                </Box>
              </Box>
        
              </Card>
          
    );
  }