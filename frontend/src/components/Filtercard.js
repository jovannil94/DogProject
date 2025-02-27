import React, { useEffect, useState  } from 'react';
import { Autocomplete, Button, Card, CardContent, CardActions, Collapse, FormControl, IconButton, MenuItem, Select, styled, TextField, Typography, } from "@mui/material";
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
    const [zipCodes, setZipCodes] = useState([]);
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

    const handleZipCodes = (event, newZipCodes = []) => {
        
    };
    
    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleFilter = async () => {
        const params = new URLSearchParams();
    
        if (selectedBreeds.length) {
            selectedBreeds.forEach(breed => params.append("breeds", breed));
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
                                onChange={(e, breedValue) => setSelectedBreeds(breedValue)}
                                renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Breed(s)"
                                />
                                )}
                            />
                        </Grid>
                        <Grid size={5}>
                            <Autocomplete
                                multiple
                                freeSolo
                                id="zip-code-selector"
                                options={[]}
                                autoHighlight
                                value={zipCodes}
                                onChange={handleZipCodes}
                                renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Zip Code(s)"
                                />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
                        <Grid size={5}>
                            <TextField
                                label="Min Age"
                                type="number"
                                fullWidth
                                value={minAge}
                                onChange={(e) => setMinAge(e.target.value)}
                            />
                        </Grid>
                        <Grid size={5}>
                            <TextField
                                label="Max Age"
                                type="number"
                                fullWidth
                                value={maxAge}
                                onChange={(e) => setMaxAge(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions disableSpacing>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                    <Button type='submit' onClick={handleFilter}>Filter</Button>
                </CardActions>
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
            </FormControl>
        </Card>
    )
};

export default Filtercard;
