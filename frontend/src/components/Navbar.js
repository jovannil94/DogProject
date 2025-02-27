import React from 'react';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { postUrl } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigatePage = useNavigate();

    const logOut = async () => {
        try {
            const response = await postUrl("/auth/logout");
            if (response) {
                navigatePage('/login');
            }
        } catch (error) {
            console.log("Error logging out:", error);
            alert("Log out failed");
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                <Button
                    type="submit"
                    color="error"
                    variant="contained"
                    onClick={logOut}
                >
                    Log out
                </Button>
                </Toolbar>
            </AppBar>
        </Box>  
    )
};

export default Navbar;
