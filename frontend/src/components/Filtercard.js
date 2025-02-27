import React, { useEffect, useState  } from 'react';
import { Autocomplete, Box, Button, Card, CardContent, CardActions, Chip, Collapse, FormControl, IconButton, MenuItem, Select, styled, TextField, Typography, } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid2';
import { getUrl, getUrlWithParams } from '../utils/api';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    variants: [
      {
        props: ({ expand }) => !expand,
        style: {
          transform: 'rotate(0deg)',
        },
      },
      {
        props: ({ expand }) => !!expand,
        style: {
          transform: 'rotate(180deg)',
        },
      },
    ],
}));


const Filtercard = ({ setDogIds }) => {
    const [expanded, setExpanded] = React.useState(false);
    const [dogBreeds, setDogBreeds] = useState([]);
    const [selectedBreeds, setSelectedBreeds] = useState([]);
    const [zipCodeInput, setZipCodeInput] = useState("");
    const [selectedZipCodes, setSelectedZipCodes] = useState([]);
    const [zipCodeError, setZipCodeError] = useState(false);
    const [minAge, setMinAge] = useState("");
    const [maxAge, setMaxAge] = useState("");
    const [searchSize, setSearchSize] = useState("");
    const [fromPage, setFromPage] = useState("");
    const [sortBy, setSortBy] = useState("");

    const fetchDogBreeds = async () => {
        try {
            const response = await getUrl("/dogs/breeds");
            setDogBreeds(response);
        } catch (error) {
            console.log("Error fetching dog breeds", error);
        }
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleAddZipCode = () => {
        let validZipcode = /^\d{5}$/.test(zipCodeInput);
        if(!validZipcode || selectedZipCodes.includes(zipCodeInput)){
            setZipCodeError(true);
        };
        if (zipCodeInput && !selectedZipCodes.includes(zipCodeInput) && validZipcode) {
            setSelectedZipCodes([...selectedZipCodes, zipCodeInput]);
            setZipCodeError(false);
            setZipCodeInput("");
        };
    };

    const handleRemoveZipCode = (removeZipCode) => {
        const newZipCodes = selectedZipCodes.filter(zip => zip !== removeZipCode);
        setSelectedZipCodes(newZipCodes);
    };
    
    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleResetFilter = () => {
    };

    const handleFilter = async () => {
        const params = new URLSearchParams();
    
        if (selectedBreeds.length) {
            selectedBreeds.forEach(breed => params.append("breeds", breed));
        }
        
        if (selectedZipCodes.length) {
            selectedZipCodes.forEach(zipCode => params.append("zipCodes", zipCode));
        }

        if (minAge) {
            params.append("ageMin", minAge);
        }

        if (maxAge) {
            params.append("ageMax", maxAge);
        }
    
        try {
            const response = await getUrlWithParams("/dogs/search", params);
            setDogIds(response.resultIds);
        } catch (error) {
            console.log("Error handling params:", error);
        }
    };
    

    useEffect(() => {
        fetchDogBreeds();
    }, []);

    return (
        <Card
            sx={{ 
                boxShadow: 2, 
                borderRadius: 3,
            }}
        >
            <FormControl fullWidth>
                <CardContent>
                    <Typography>Filter Search</Typography>
                    <Grid container justifyContent="space-between">
                        <Grid size={5}>
                            <Autocomplete
                                multiple
                                id="dog-breed-selector"
                                options={dogBreeds}
                                autoHighlight
                                value={selectedBreeds}
                                onChange={(_e, breedValue) => setSelectedBreeds(breedValue)}
                                renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Breed(s)"
                                />
                                )}
                            />
                        </Grid>
                        <Grid size={3}>
                            <TextField
                                label="Min Age"
                                type="number"
                                fullWidth
                                value={minAge}
                                onChange={(e) => setMinAge(e.target.value)}
                            />
                        </Grid>
                        <Grid size={3}>
                            <TextField
                                label="Max Age"
                                type="number"
                                fullWidth
                                value={maxAge}
                                onChange={(e) => setMaxAge(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
                        <Grid container size={5} alignItems={"center"}>
                            <Grid size={5}>
                                <TextField
                                    label="Zip Code(s)"
                                    type="text"
                                    fullWidth
                                    value={zipCodeInput}
                                    onChange={(e) => setZipCodeInput(e.target.value)}
                                    error={zipCodeError}
                                    helperText={zipCodeError ? "Invalid Zipcode or already added" : null}
                                />
                            </Grid>
                            <Grid size={3}>
                                <Button onClick={handleAddZipCode} variant="contained">Add Zip Code</Button>
                            </Grid>
                            <Grid size={8}>
                                <Box sx={{ marginTop: 2 }}>
                                    {selectedZipCodes.map((zipCode, index) => (
                                        <Chip
                                            key={index}
                                            label={zipCode}
                                            onDelete={() => handleRemoveZipCode(zipCode)}
                                            sx={{ margin: 1 }}
                                        />
                                    ))}
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <TextField
                            label="Size"
                            type="number"
                            value={searchSize}
                            onChange={(e) => setSearchSize(e.target.value)}
                        />
                        <TextField
                            label="From page"
                            type="number"
                            value={fromPage}
                            onChange={(e) => setFromPage(e.target.value)}
                        />
                        <Select
                            value={sortBy}
                            label="Sort"
                            onChange={handleSortChange}
                        >
                            <MenuItem value={"breed"}>Breed</MenuItem>
                            <MenuItem value={"name"}>Name</MenuItem>
                            <MenuItem value={"age"}>Age</MenuItem>
                        </Select>
                    </CardContent>
                </Collapse>
                <CardActions disableSpacing>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                    <Button type='submit' color='error' onClick={handleResetFilter}>Reset</Button>
                    <Button type='submit' onClick={handleFilter}>Filter</Button>
                </CardActions>
            </FormControl>
        </Card>
    )
};

export default Filtercard;
