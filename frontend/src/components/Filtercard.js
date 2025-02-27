import React, { useState  } from 'react';
import { Autocomplete, Card, CardContent, CardActions, Collapse, IconButton, MenuItem, Select, styled, TextField, Typography, } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid2';

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


const Filtercard = ({ dogBreeds }) => {
    const [expanded, setExpanded] = React.useState(false);
    const [selectedBreeds, setSelectedBreeds] = useState([]);
    const [zipCodes, setZipCodes] = useState([]);
    const [minAge, setMinAge] = useState("");
    const [maxAge, setMaxAge] = useState("");
    const [searchSize, setSearchSize] = useState("");
    const [fromPage, setFromPage] = useState("");
    const [sortBy, setSortBy] = useState("");
    

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleZipCodes = (event, newZipCodes = []) => {
        
    };
    
    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    return (
        <Card
            sx={{ 
                boxShadow: 2, 
                borderRadius: 3,
            }}
        >
            <CardContent>
                <Typography>Filter Search</Typography>
                <Grid container spacing={3} justifyContent="space-around">
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
                <Grid container spacing={3} justifyContent="space-around" sx={{ marginTop: 2 }}>
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
        </Card>
    )
};

export default Filtercard;
