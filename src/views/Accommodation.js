import React from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import VolcanoBackground from '../assets/volcanoes-park.png'
import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";

const Accommodation = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container style={{padding: '3rem'}}>
                <Grid item xs={12} style={{background: `linear-gradient(90deg, #046CC6, rgba(0, 0, 0, 0)), url(${VolcanoBackground})` , marginRight:"3rem", borderRadius:"1.5rem", backgroundRepeat: 'no-repeat', backgroundSize: 'cover', overflow:'hidden' }}>
                    <div style={{padding: "5rem"}}>
                        <Typography variant="h3" style={{ color: "#fff", fontWeight:'bold'}}>Five to Five hotel</Typography>
                        <p style={{ width: "30rem", color: "#fff", fontSize:'medium', marginTop: '3rem',marginBottom:'4rem' }}> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores deleniti fuga illum nemo odio rerum temporibus. Aspernatur cupiditate, deserunt dolore est eum ex exercitationem, facilis in modi mollitia omnis sint. </p>
                        <Button style={{ backgroundColor: "#fff"}}>Book now</Button>
                    </div>
                </Grid>

                <Grid item xs={6}>
                    <div style={{display: 'flex'}}>
                        <div className="avatar" style={{ width: '10rem'}}>
                            Avatar
                        </div>
                        <div className="content">
                            <p>Title</p>
                            <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid hic iusto nam neque quasi voluptatibus. Distinctio eius expedita fugiat ipsam magni obcaecati odit? Aperiam excepturi harum laudantium, non reiciendis saepe.</p>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <p>and here</p>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Accommodation;