import { Box, Link } from "@mui/material";


const PageControls = ({ nextPage, prevPage, onNext, onPrev }) => {
    return (
        <Box>
            {prevPage.length ?
                <Link onClick={onPrev} underline="hover">
                    Prev
                </Link>
            : null}
            {nextPage.length ?
                <Link onClick={onNext} underline="hover">
                    Next
                </Link> 
            : null}
        </Box>
    )
};

export default PageControls;
