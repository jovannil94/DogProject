import React from 'react';
import { Card, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Dogcard from './Dogcard';
import Confetti from 'react-confetti';

const Matchcard = ({ dogMatch }) => {
    
    return (
        <Card sx={{ boxShadow: 5, borderRadius: 3, margin: 2, padding: 4 }}>
            <Grid container spacing={4} sx={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                <Confetti/>
                <Typography variant="h5">Your Adoption Match! </Typography>
                <Grid size={3}>
                    <Dogcard dog={dogMatch} />
                    </Grid>
                <Typography>Please refer to your Fetch agent to procceed in adoption process</Typography>
            </Grid>
        </Card>
    )
};

export default Matchcard;
