import { Box, Typography } from "@mui/material";


const PageControls = ({ nextPage, prevPage, onNext, onPrev }) => {
    return (
        <Box sx={{ display:"flex", flexDirection:"row", justifyContent:"center", gap: 20 }}>
            {prevPage.length ?
                <Typography variant="h5" color="black" onClick={onPrev} sx={{ textShadow: "1px 1px 2px white", "&:hover": { cursor: "pointer" } }}>
                    Prev
                </Typography>
            : null}
            {nextPage.length ?
                <Typography variant="h5" color="black" onClick={onNext} sx={{ textShadow: "1px 1px 2px white", "&:hover": { cursor: "pointer" } }}>
                    Next
                </Typography> 
            : null}
        </Box>
    )
};

export default PageControls;
