import React, { useEffect, useState  } from 'react';
import { Autocomplete, Box, Button, Card, CardActions, CardMedia, CardContent, Stack, TextField, Typography } from '@mui/material';
import { getUrl, postUrl } from '../utils/api';

const DogSearch = () => {
    const [dogBreeds, setDogBreeds] = useState([]);
    const [selectedBreeds, setSelectedBreeds] = useState([]);
    const [minAge, setMinAge] = useState("");
    const [maxAge, setMaxAge] = useState("");
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
    }

    useEffect(() => {
        fetchDogBreeds();
        fetchDogs();
    }, []);

    return (
        <Box sx={{ padding: 2 }}>
            <Box>
                <Stack>
                    <Autocomplete
                        multiple
                        id="dog-breed-selector"
                        options={dogBreeds}
                        autoHighlight
                        value={selectedBreeds}
                        onChange={(e, breedValue) => setSelectedBreeds(breedValue)}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Breed"
                        />
                        )}
                    />
                    <TextField
                        label="Min Age"
                        type="number"
                        value={minAge}
                        onChange={(e) => setMinAge(e.target.value)}
                    />
                    <TextField
                        label="Max Age"
                        type="number"
                        value={maxAge}
                        onChange={(e) => setMaxAge(e.target.value)}
                    />
                </Stack>
            </Box>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: 'lightgrey',
                padding: 2,
            }}>
                <Stack spacing={4} sx={{ width: "100%", maxWidth: 500 }}>
                    {dogs.map((dog, index) => (
                        <Card 
                            key={index} 
                            sx={{ 
                                maxWidth: 400, 
                                boxShadow: 2, 
                                borderRadius: 3,
                                transition: "transform 0.2s ease-in-out",
                                "&:hover": {
                                    transform: "scale(1.1)",
                                    boxShadow: 5,
                                }, 
                                }}
                            >
                            <CardMedia
                            sx={{ height: 250 }}
                            image={dog.img}
                            title="dog"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {dog.name}
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                    Breed: {dog.breed}
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                    Age: {dog.age}
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                    Zip Code: {dog.zip_code}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button sx={{ "&:hover": { cursor: "pointer" } }} size="small">Favorite</Button>
                            </CardActions>
                        </Card>
                    ))}
                </Stack>
            </Box>
        </Box> 
    )
}

export default DogSearch;