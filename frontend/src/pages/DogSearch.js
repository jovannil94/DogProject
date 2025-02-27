import React, { useEffect, useState  } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { getUrl } from '../utils/api';

const DogSearch = () => {
    const [dogBreeds, setDogBreeds] = useState([]);
    const [selectedBreed, setSelectedBreed] = useState('');

    const fetchDogBreeds = async () => {
        try {
            const response = await getUrl("/dogs/breeds");
            setDogBreeds(response);
        } catch (error) {
            console.log("Error fetching dog breeds", error);
        }
    };

    const handleBreed = (e) => {
        setSelectedBreed(e.target.value);
    }

    console.log("breed", selectedBreed);

    useEffect(() => {
        fetchDogBreeds();
    }, []);

    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ marginBottom: 2 }}>
            <FormControl fullWidth>
                <InputLabel id="breed-label">Dog Breed</InputLabel>
                <Select
                id="breed-select"
                value={selectedBreed}
                label="Select Breed"
                onChange={handleBreed}
                >
                    {dogBreeds.length > 0 ? (
                        dogBreeds.map((breed, i) => (
                            <MenuItem key={i} value={breed}>{breed}</MenuItem>
                        ))
                    )
                    : null}
                </Select>
            </FormControl>
            </Box>
        </Box> 
    )
}

export default DogSearch;