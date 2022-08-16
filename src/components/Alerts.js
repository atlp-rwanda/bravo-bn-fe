import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export function WarnAlert(props) {

  return (

      <Alert variant="filled" severity="warning">
        <AlertTitle>Warning</AlertTitle>
         <strong>{props.message}</strong>
      </Alert>

    
  );
}

export  function ErrorAlert(props) {

  return ( 

    <Alert variant="filled" severity="error">
      <AlertTitle>Error</AlertTitle>
      <strong>{props.message}</strong>
    </Alert>
  
  );
}
export  function InfoAlert(props) {

  return ( 


    <Alert variant="filled" severity="info">
      <AlertTitle>Info</AlertTitle>
     <strong>{props.message}</strong>
    </Alert>
  
  );
}

export function SuccessAlert(props) {

  return (
        

    <Alert variant="filled" severity="success">
      <AlertTitle>Success</AlertTitle>
      <strong>{props.message}</strong>
    </Alert>
  
  );
}