import React, { useEffect, useState  } from 'react';
import { Box, } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { getUrl, postUrl } from '../utils/api';
import Filtercard from '../components/Filtercard';
import Dogcard from '../components/Dogcard';

const DogSearch = () => {
    const [dogIds, setDogIds] = useState([])
    const [dogResults, setDogResults] = useState([]);

    useEffect(() => {
        const fetchDogIds = async () => {
            try {
                const response = await getUrl("/dogs/search");
                setDogIds(response.resultIds);
            } catch (error) {
                console.log("Error filtering dogs ids", error)
            }
        };
        fetchDogIds()
    }, []);

    useEffect(() => {
        if (dogIds.length === 0) return;

        const fetchDogs = async () => {
            try {
                const response = await postUrl("/dogs", dogIds);
                setDogResults(response);
            } catch (error) {
                console.log("Error fetching dogs", error);
            }
        };
        fetchDogs();
    }, [dogIds]);

    return (
        <Box>
            <Box 
                sx={{ 
                    padding: 4, 
                    boxShadow: 5, 
                    borderRadius: 3, 
                }}
            >
                <Filtercard setDogIds={setDogIds} />
            </Box>
            <Box sx={{ flexGrow: 1, backgroundColor: 'lightgrey', padding: 3, }}>
                <Grid container spacing={4}>
                    {dogResults.map((dog, index) => (
                        <Grid size={3} key={index}>
                            <Dogcard dog={dog} index={index} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box> 
    )
}

export default DogSearch;
