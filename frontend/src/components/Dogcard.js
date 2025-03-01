import { Card, CardMedia, CardContent, CardActions, IconButton, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';


const Dogcard = ({ dog, index, favoriteDogs = [], toggleFavoriteDog }) => {
    return (
        <Card 
            key={index} 
            sx={{ 
                boxShadow: 2, 
                borderRadius: 3,
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                    transform: "scale(1.08)",
                    boxShadow: 5,
                },
                position: "relative",
            }}
        >
            <CardMedia
                sx={{
                    height: 'auto',
                    width: '100%',
                    aspectRatio: '1/1',
                }}
                image={dog.img}
                title={dog.name}
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
            {toggleFavoriteDog ? (
                <CardActions>
                    <IconButton onClick={() => toggleFavoriteDog(dog.id)} sx={{ position: "absolute", bottom: 8, right: 8, color: favoriteDogs.includes(dog.id) ? "red" : "grey", "&:hover": { cursor: "pointer" } }} aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                </CardActions>
            ) : null}
        </Card>
    )
};

export default Dogcard;
