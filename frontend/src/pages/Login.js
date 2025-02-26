import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { postUrl } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigatePage = useNavigate();
    
    const setValue = (value, e) => {
        e.preventDefault();

        if(value === "name") {
            setName(e.target.value);
        } else {
            setEmail(e.target.value);
        }
    }

    const logIn = async () => {
        try {
            const response = await postUrl("/auth/login", { name, email });
            if (response.status === 200) {
                navigatePage('/dogSearch');
            }
        } catch (error) {
            console.log("Error logging in:", error);
            alert("Login failed, verify name and email");
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <Stack spacing={4} sx={{ width: '100%', maxWidth: '400px' }}>
                <Typography component="h1" variant="h5">
                    Log In
                </Typography>
                <TextField
                    label="Name"
                    required
                    id="email"
                    variant="outlined"
                    autoComplete="name"
                    autoFocus
                    value={name}
                    onChange={(e) => setValue("name", e)}
                />
                <TextField
                    label="Email"
                    required
                    id="email"
                    variant="outlined"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setValue("email", e)}
                />
                <Button 
                    type="submit"
                    color="primary"
                    variant="contained"
                    onClick={logIn}
                >
                    Log In
                </Button>
            </Stack>
        </Box>
    )
}

export default Login;