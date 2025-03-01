import React, { useEffect, useState  } from 'react';
import { Autocomplete, Box, Button, Card, CardContent, CardActions, Chip, FormControl, MenuItem, Select, TextField, Typography, } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { getUrlWithParams } from '../utils/api';

const Filtercard = ({ setDogIds, total, setTotal, setNextPage, setPrevPage }) => {
    const [dogBreeds, setDogBreeds] = useState([]);
    const [selectedBreeds, setSelectedBreeds] = useState([]);
    const [zipCodeInput, setZipCodeInput] = useState("");
    const [selectedZipCodes, setSelectedZipCodes] = useState([]);
    const [zipCodeError, setZipCodeError] = useState(false);
    const [minAge, setMinAge] = useState("");
    const [maxAge, setMaxAge] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [searchSize, setSearchSize] = useState("25");
    const [resetLoading, setResetLoading] = useState(false);
    const [filterLoading, setFilterLoading] = useState(false);

    const fetchDogBreeds = async () => {
        try {
            const response = await getUrlWithParams("/dogs/breeds");
            setDogBreeds(response);
        } catch (error) {
            console.log("Error fetching dog breeds", error);
        }
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

    const handleResetFilter = async () => {
        setResetLoading(true);
        setSelectedBreeds([]);
        setZipCodeInput("");
        setSelectedZipCodes([]);
        setZipCodeError(false);
        setMinAge("");
        setMaxAge("");
        setSortBy("");
        setSortOrder("");
        setSearchSize("25");
        try {
            const response = await getUrlWithParams("/dogs/search");
            setDogIds(response.resultIds);
            setTotal(response.total);
            if(response.next) setNextPage(response.next);
            if(response.prev) setPrevPage(response.prev);
        } catch (error) {
            console.log("Error handling params:", error);
        }
        setResetLoading(false);
    };    

    const handleFilter = async () => {
        setFilterLoading(true);
        const params = new URLSearchParams();
    
        if (selectedBreeds.length) {
            selectedBreeds.forEach(breed => params.append("breeds", breed));
        };
        
        if (selectedZipCodes.length) {
            selectedZipCodes.forEach(zipCode => params.append("zipCodes", zipCode));
        };

        if (minAge) {
            params.append("ageMin", minAge);
        };

        if (maxAge) {
            params.append("ageMax", maxAge);
        };

        if(searchSize) {
            params.append("size", searchSize);
        };

        if (sortBy) {
            params.append("sort", `${sortBy}:${sortOrder || "asc"}`);
        } else {
            params.append("sort", "breed:asc");
        };
    
        try {
            const response = await getUrlWithParams("/dogs/search", params);
            setDogIds(response.resultIds);
            setTotal(response.total);
            if(response.next) setNextPage(response.next);
            if(response.prev) setPrevPage(response.prev);
        } catch (error) {
            console.log("Error handling params:", error);
        };
        setFilterLoading(false);
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
                    <Typography variant="h5">Filters</Typography>
                    <Grid container sx={{ marginTop: 2 }}>
                        <Grid size={4}>
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
                        <Grid size={3} sx={{ marginLeft: 2, marginRight:2 }}>
                            <TextField
                                label="Min Age"
                                type="number"
                                fullWidth
                                value={minAge}
                                onChange={(e) => setMinAge(e.target.value)}
                            />
                        </Grid>
                        <Grid size={3} sx={{ marginLeft: 2, marginRight:2 }}>
                            <TextField
                                label="Max Age"
                                type="number"
                                fullWidth
                                value={maxAge}
                                onChange={(e) => setMaxAge(e.target.value)}
                            />
                        </Grid>
                        <Grid size={4} sx={{ marginTop: 2 }}>
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
                        <Grid size={8}>
                            <Box sx={{ marginTop: 2 }}>
                                {selectedZipCodes.length ? <Typography>Current Zipcodes:</Typography> : null}
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
                        <Grid size={2} sx={{ marginTop: 2 }}>
                            <Button onClick={handleAddZipCode} variant="contained">Add Zip Code</Button>
                        </Grid>
                    </Grid>
                    <Typography variant="h5">Sort By</Typography>
                    <Grid container sx={{ marginTop: 2, display: "flex", alignItems: "left" }}>
                        <Grid item xs={3}>
                            <Select
                                value={sortBy}
                                label="Sort By"
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <MenuItem value={"breed"}>Breed</MenuItem>
                                <MenuItem value={"name"}>Name</MenuItem>
                                <MenuItem value={"age"}>Age</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={3}>
                            {sortBy !== "" ? 
                                <Select
                                    value={sortOrder}
                                    label="Sort Order"
                                    onChange={(e) => setSortOrder(e.target.value)}
                                >
                                    <MenuItem value={"asc"}>Asc</MenuItem>
                                    <MenuItem value={"desc"}>Desc</MenuItem>
                                </Select>
                            : null}
                        </Grid>
                        <Grid item xs={3}>
                            <Select
                                value={searchSize}
                                label="Dogs by page"
                                onChange={(e) => setSearchSize(e.target.value)}
                            >
                                <MenuItem value={25}>25</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                                <MenuItem value={75}>75</MenuItem>
                                <MenuItem value={100}>100</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                    <Typography>Total Dogs: {total}</Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Button type='submit' color='error' loading={resetLoading} loadingPosition="end" onClick={handleResetFilter}>Reset</Button>
                    <Button type='submit' loading={filterLoading} loadingPosition="end" onClick={handleFilter}>Filter</Button>
                </CardActions>
            </FormControl>
        </Card>
    )
};

export default Filtercard;
