import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { postUrl } from '../utils/api';
import Dogcard from './Dogcard';

const Matchcard = ({ favoriteDogs }) => {
    const [dogMatch, setDogMatch] = useState([]);

    const generateMatch = async () => {
        try{
            const match = await postUrl("/dogs/match", favoriteDogs);
            const response = await postUrl("/dogs", [match.match]);
            setDogMatch(response[0]);
        } catch (error) {
            console.log("Error generating match:", error);
        }
    };

    return (
        <Box sx={{ flexGrow: 1, backgroundColor: 'lightgrey', padding: 3, }}>
            <Button onClick={generateMatch}>Generate Match</Button>
            {dogMatch ? (
                <Grid container spacing={4} sx={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                    <Typography variant="h5">Your Adoption Match! </Typography>
                    <Grid size={3}>
                        <Dogcard dog={dogMatch} />
                     </Grid>
                    <Typography>Please refer to your Fetch agent to procceed in adoption process</Typography>
                </Grid>
            ) : null}
        </Box>
    )
};

export default Matchcard;
