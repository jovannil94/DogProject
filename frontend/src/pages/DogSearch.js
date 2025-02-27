import React, { useEffect, useState  } from 'react';
import { Box, } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { getUrl, postUrl } from '../utils/api';
import Filtercard from '../components/Filtercard';
import Dogcard from '../components/Dogcard';

const DogSearch = () => {
    const [dogBreeds, setDogBreeds] = useState([]);
    const [dogs, setDogs] = useState([]);

    const fetchDogBreeds = async () => {
        try {
            const response = await getUrl("/dogs/breeds");
            setDogBreeds(response);
        } catch (error) {
            console.log("Error fetching dog breeds", error);
        }
    };

    const fetchDogs = async () => {
        try {
            const fitleredDogs = await getUrl(`/dogs/search`);
            let dogIds = fitleredDogs.resultIds
            const dogResponse = await postUrl('/dogs', dogIds)
            setDogs(dogResponse);
        } catch (error) {
            console.log("Eror fetching dogs", error)
        }
    };     

    useEffect(() => {
        fetchDogBreeds();
        fetchDogs();
    }, []);

    return (
        <Box>
            <Box 
                sx={{ 
                    padding: 4, 
                    boxShadow: 5, 
                    borderRadius: 3, 
                }}
            >
                <Filtercard dogBreeds={ dogBreeds }/>
            </Box>
            <Box sx={{ flexGrow: 1, backgroundColor: 'lightgrey', padding: 3, }}>
                <Grid container spacing={4}>
                    {dogs.map((dog, index) => (
                        <Grid size={3}>
                            <Dogcard dog={dog} index={index}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box> 
    )
}

export default DogSearch;
