import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { postUrl } from '../utils/api';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigatePage = useNavigate();
    const location = useLocation();

    const onLoginPage = location.pathname === '/login' || location.pathname === "/";

    const logOut = async () => {
        try {
            const response = await postUrl("/auth/logout");
            if (response) {
                navigatePage('/login');
            } else {
                navigatePage('/');
            }
        } catch (error) {
            console.log("Error logging out:", error);
            alert("Log out failed");
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ bgcolor: "#300D38" }}>
                <Toolbar>
                    <img src="/fetch.svg" alt="Logo" width="40" height="40" style={{ marginRight: 10 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: "#FFA900",
                            textDecoration: 'none',
                        }}
                    >
                        Fetch Dog App
                    </Typography>
                    <Typography variant='subtitle1'>Created by Jovanni Luna</Typography>
                    {!onLoginPage && (
                        <Box sx={{ marginLeft: 'auto' }}>
                            <Button
                                type="submit"
                                color="error"
                                variant="contained"
                                onClick={logOut}
                            >
                                Log out
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
        </Box>  
    )
};

export default Navbar;
