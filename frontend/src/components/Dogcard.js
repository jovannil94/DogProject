import { Card, CardMedia, CardContent, CardActions, IconButton, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';


const Dogcard = ({ dog, index }) => {
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
            }}
        >
            <CardMedia
            sx={{ height: 250 }}
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
            <CardActions>
                <IconButton sx={{ "&:hover": { cursor: "pointer" } }} aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
};

export default Dogcard;
