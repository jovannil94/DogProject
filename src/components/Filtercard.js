import React, { useEffect, useState  } from 'react';
import { Autocomplete, Button, Card, CardContent, CardActions, Chip, FormControl, InputLabel, MenuItem, Select, TextField, Typography, } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { getUrlWithParams, postUrl } from '../utils/api';

const Filtercard = ({ setDogIds, total, setTotal, setNextPage, setPrevPage, favoriteDogs, generateMatch }) => {
    const [dogBreeds, setDogBreeds] = useState([]);
    const [selectedBreeds, setSelectedBreeds] = useState([]);
    const [zipCodeInput, setZipCodeInput] = useState("");
    const [selectedZipCodes, setSelectedZipCodes] = useState([]);
    const [zipCodeError, setZipCodeError] = useState(false);
    const [minAge, setMinAge] = useState("");
    const [maxAge, setMaxAge] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
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
        <Card sx={{ boxShadow: 5, borderRadius: 3, margin: 2, padding: 4 }}>
            <CardContent>
                <Typography variant="h5">Filters</Typography>
                <Grid container sx={{ marginTop: 2 }}>
                    <Grid size={4} sx={{ marginRight:2 }}>
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
                    <Grid size={3} sx={{ marginRight:2 }}>
                        <TextField
                            label="Min Age"
                            type="number"
                            fullWidth
                            value={minAge}
                            InputProps={{ inputProps: { min: 0, max: 30 } }}
                            onChange={(e) => setMinAge(e.target.value)}
                        />
                    </Grid>
                    <Grid size={3}>
                        <TextField
                            label="Max Age"
                            type="number"
                            fullWidth
                            value={maxAge}
                            InputProps={{ inputProps: { min: 0, max: 30 } }}
                            onChange={(e) => setMaxAge(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid container sx={{ marginTop: 2, alignItems: "center" }}>
                    <Grid size={2}>
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
                    <Grid size={2}>
                        <Button onClick={handleAddZipCode} variant="contained">Add Zip Code</Button>
                    </Grid>
                    <Grid size={8}>
                        <Grid sx={{ display:"flex", flexDirection:"row", alignItems: "center" }}>
                            {selectedZipCodes.length ? <Typography>Current Zipcodes:</Typography> : null}
                            {selectedZipCodes.map((zipCode, index) => (
                                <Chip
                                    key={index}
                                    label={zipCode}
                                    onDelete={() => handleRemoveZipCode(zipCode)}
                                    sx={{ margin: 1 }}
                                />
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
                <Typography variant="h5">Sort By</Typography>
                <Grid container sx={{ marginTop: 2, display: "flex", alignItems: "left" }}>
                    <TextField
                        label="Total Dogs"
                        value={total}
                        slotProps={{
                            input: {
                            readOnly: true,
                            },
                        }}
                        sx={{ marginRight:2 }}
                    />
                    <Grid size={2} sx={{ marginRight:2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="sortBy">Sort By</InputLabel>
                            <Select
                                labelId="sortBy"
                                id="sortBy"
                                value={sortBy}
                                label="Sort By"
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <MenuItem value={"breed"}>Breed</MenuItem>
                                <MenuItem value={"name"}>Name</MenuItem>
                                <MenuItem value={"age"}>Age</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={2} sx={{ marginRight:2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="sortOrder">Sort Order</InputLabel>
                            <Select
                                labelId="sortOrder"
                                id="sortOrder"
                                value={sortOrder}
                                label="Sort Order"
                                onChange={(e) => setSortOrder(e.target.value)}
                            >
                                <MenuItem value={"asc"}>Asc</MenuItem>
                                <MenuItem value={"desc"}>Desc</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={2}>
                        <FormControl fullWidth>
                            <InputLabel id="dogSize">Dogs per page</InputLabel>
                            <Select
                                labelId="dogSize"
                                id="dogSize"
                                value={searchSize}
                                label="Dogs per page"
                                onChange={(e) => setSearchSize(e.target.value)}
                            >
                                <MenuItem value={25}>25</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                                <MenuItem value={75}>75</MenuItem>
                                <MenuItem value={100}>100</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions 
                sx={{ 
                    justifyContent: "flex-end", 
                    marginTop: "auto", 
                    "&:hover": { cursor: "pointer" },
                 }}>
                <Button type='submit' color='error' loading={resetLoading} loadingPosition="end" onClick={handleResetFilter}>Reset</Button>
                <Button type='submit' loading={filterLoading} loadingPosition="end" onClick={handleFilter}>Filter</Button>
            </CardActions>
            <Grid container sx={{ display:"flex", flexDirection:"column", alignItems:"center", gap: 3}}>
                <Typography variant='h6'>Favorite dogs to see a possible adoption match</Typography>
                {favoriteDogs.length ? <Button onClick={generateMatch} variant='contained'>Adoption Match</Button> : null}
            </Grid>
        </Card>
    )
};

export default Filtercard;
