import React, { useEffect, useState  } from 'react';
import { Box, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { getUrlWithParams, postUrl } from '../utils/api';
import Filtercard from '../components/Filtercard';
import Dogcard from '../components/Dogcard';
import PageControls from '../components/PageControls';
import Matchcard from '../components/Matchcard';

const DogSearch = () => {
    const [dogIds, setDogIds] = useState([])
    const [dogResults, setDogResults] = useState([]);
    const [total, setTotal] = useState(0);
    const [nextPage, setNextPage] = useState("");
    const [prevPage, setPrevPage] = useState("");
    const [dogsLoading, setDogsLoading] = useState(false);
    const [favoriteDogs, setFavoriteDogs] = useState([]);

    const onNext = async () => {
        setNextPage("");
        setPrevPage("");
        try {
            const response = await getUrlWithParams(nextPage);
            setDogIds(response.resultIds);
            setTotal(response.total);
            if(response.next) setNextPage(response.next);
            if(response.prev) setPrevPage(response.prev);
        } catch (error) {
            console.log("Error fetching next page:", error)
        };
    };

    const onPrev = async () => {
        setNextPage("");
        setPrevPage("");
        try {
            const response = await getUrlWithParams(prevPage);
            setDogIds(response.resultIds);
            setTotal(response.total);
            if(response.next) setNextPage(response.next);
            if(response.prev) setPrevPage(response.prev);
        } catch (error) {
            console.log("Error fetching next page:", error)
        };
    };

    const toggleFavoriteDog = (dogId) => {
        setFavoriteDogs((prevFavorites) => {
            if (prevFavorites.includes(dogId)) {
                return prevFavorites.filter(id => id !== dogId);
            } else {
                return [...prevFavorites, dogId];
            }
        });
    };

    useEffect(() => {
        const fetchDogIds = async () => {
            try {
                const response = await getUrlWithParams("/dogs/search");
                setDogIds(response.resultIds);
                setTotal(response.total);
                if(response.next) setNextPage(response.next);
                if(response.prev) setPrevPage(response.prev);
            } catch (error) {
                console.log("Error filtering dogs ids", error)
            }
        };
        fetchDogIds()
    }, []);

    useEffect(() => {
        if (dogIds.length === 0) return;

        const fetchDogs = async () => {
            setDogsLoading(true);
            try {
                const response = await postUrl("/dogs", dogIds);
                setDogResults(response);
            } catch (error) {
                console.log("Error fetching dogs", error);
            }
            setDogsLoading(false);
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
                <Filtercard setDogIds={setDogIds} total={total} setTotal={setTotal} setNextPage={setNextPage} setPrevPage={setPrevPage} />
            </Box>
            {favoriteDogs.length ? (
                <Box
                    sx={{ 
                        padding: 4, 
                        boxShadow: 5, 
                        borderRadius: 3, 
                    }}
                >
                    <Matchcard favoriteDogs={favoriteDogs} />
                </Box>
            ) : null}
            <Box sx={{ flexGrow: 1, backgroundColor: 'lightgrey', padding: 3, }}>
                {dogsLoading ? (
                    <CircularProgress />
                ): (
                    <Grid container spacing={4}>
                        {dogResults.map((dog, index) => (
                            <Grid size={3} key={index}>
                                <Dogcard dog={dog} index={index} favoriteDogs={favoriteDogs} toggleFavoriteDog={toggleFavoriteDog} />
                            </Grid>
                        ))}
                    </Grid>
                )}
                <PageControls nextPage={nextPage} prevPage={prevPage} onNext={onNext} onPrev={onPrev} />
            </Box>
        </Box> 
    )
}

export default DogSearch;
