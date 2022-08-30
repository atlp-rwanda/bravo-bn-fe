
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Stack, Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import TextareaAutosize from '@mui/material/TextareaAutosize';

import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { alertActions } from '../redux/alertSlice';
import axios from 'axios';
import { tripsActions } from '../redux/tripsSlice';
import PreLoader, { PreLoaderSmall } from './PreLoader'; 

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  width:'60%',
  bgcolor: 'background.paper',
  border: '4px solid #046CC6',
  borderRadius: 2,
  boxShadow: 24,
};

export  function CommentsModal(props) {
  const [newComment, setNewComment] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState('');
  const tripId = useSelector(state=> state.trips.tripRequest);
  const allTrips = useSelector(state=> state.trips.trips);
  const comments = useSelector(state=> state.trips.comments);
  const token= useSelector(state=> state.auth.token);
  const user = useSelector(state=> state.login.user.id);
  const dispatch = useDispatch();

  const bottomRef = React.useRef(null);

  React.useEffect(()=>{
    if(typeof(tripId) == 'number'){
      const trip =  allTrips[tripId];

      trip.status == 'pending' ? setStatus('pending') : setStatus('');

      axios.get(`${process.env.API_URL}/user/trip/${trip.id}/comments`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res)=>{
        dispatch(
          tripsActions.comments({comments: res.data.comments.rows})
          );
        }).catch(err=> {
          console.log(err)
          dispatch(
            alertActions.error({message: err.response.data.message })
            );

            setTimeout(()=>{
              dispatch(
                alertActions.error({message: 'none'}));
              },10000)
            })
          }
            },[tripId]);

 React.useEffect(() => {
   bottomRef.current?.scrollIntoView({behavior: 'smooth'});
 }, [comments]);


  const sendComment = (e)=>{
            e.preventDefault();

            if(newComment.trim().length == 0) return;
            
            setLoading(true)
            axios.post(`${process.env.API_URL}/user/trip/${allTrips[tripId]['id']}/comment`,{
              comment: newComment
            }, {
              headers: { Authorization: `Bearer ${token}` },
            }).then((res)=>{

              let date = new Date().toISOString();
              setNewComment('')

              setLoading(false)
               dispatch(
                tripsActions.comments({comments:[...comments, {
                  comment: res.data.comment,
                  createdAt: date,
                  userId: user
                }]})
                ); 
                window.scroll(0,0)
              }).catch(err=> {
                console.log(err)
                setLoading(false)
                dispatch(
                  alertActions.error({message: err.response.data.message })
                  );
                })
        setTimeout(()=>{
          dispatch(
            alertActions.error({message: 'none'}));
          },10000)
  }

  return (
         <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <CardContent sx={{ background: '#046CC6',  padding:'10px 20px'}}>
          <Typography id="modal-modal-title" sx={{ color:'#fff', fontSize:'1rem'}} variant="h5" >
          Comments
          </Typography>
        </CardContent>

          <CardContent sx={{  padding:'20px', maxHeight:'350px', overflowY:'scroll'}}>
            { !comments ?  <PreLoader/>: comments.length > 0 ? comments.map((comment,index)=>{
              return comment.userId != user ? <Box key={index} sx={{ mb:1, width:'fit-content',maxWidth:'80%'}}>
              <Box sx={{display:'flex', justifyContent:'space-between'}}>
            <Typography id="modal-modal-title" sx={{   fontSize:'0.7rem'}} variant="h5" > Admin</Typography>
            <Typography id="modal-modal-title" sx={{   fontSize:'0.5em', pl:2}} variant="h5" > {comment.createdAt.slice(0,10)} {comment.createdAt.slice(12,16)}</Typography>
              </Box>
            <Typography id="modal-modal-title" sx={{  bgcolor:'#D9D9D9', textAlign:'center', color:'#000', borderRadius:'5px', padding:'10px 20px', fontWeight:'900', fontSize:'0.8rem'}} variant="h5" >{comment.comment}</Typography>
            </Box> :           <CardContent key={index} sx={{  display:'flex',flexDirection:'column',alignItems:'end',p:0, width:'100%'}}>
            <Box sx={{ mb:1, width:'fit-content', maxWidth:'80%'  }}>
              <Box sx={{display:'flex', justifyContent:'end'}}>
            <Typography id="modal-modal-title" sx={{   fontSize:'0.5em', pl:2}} variant="h5" > {comment.createdAt.slice(0,10)} {comment.createdAt.slice(12,16)}</Typography>
              </Box>
            <Typography id="modal-modal-title" sx={{  bgcolor:'#046CC6', textAlign:'center', color:'#fff', borderRadius:'5px', padding:'10px 20px', fontSize:'0.8rem'}} variant="h5" >{comment.comment}</Typography>
            </Box>
          </CardContent>
            }): 'No comments yet'
          }
          <Stack ref={bottomRef}></Stack>
          </CardContent>

          {status == 'pending' ?<CardContent sx={{ display:'flex'}}>
          <TextareaAutosize
      aria-label="minimum height"
      onChange={(e)=> setNewComment(e.target.value)}
      value={newComment}
      minRows={1}
      placeholder="Leave a comment..."
      style={{ width: '100%',    marginRight: '10px',
      border: 'none',
      padding: '10px',
      outline: 'none',
      borderRadius: '5px',
      background: '#D9D9D9',
      height: 'auto', }}
    />
          <Button variant="contained" size="medium" onClick={sendComment}  sx={{ float:'right',textTransform:'none'}}>
          {loading ? <PreLoaderSmall/> : 'Send'}
        </Button>
          </CardContent>:''}
        </Box>
      </Modal>
         
        
  );
}
 