import React, { useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { postUrl } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [nameValid, setNameValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const navigatePage = useNavigate();

    const handleChange = (field, value) => {
        if (field === "name") {
            setName(value);
        } else {
            setEmail(value);
        }
    };

    const logIn = async () => {
        const isNameValid = /^[A-Za-z\s]+$/.test(name.trim());
        const isEmailValid = /\S+@\S+\.\S+/.test(email);

        setNameValid(isNameValid);
        setEmailValid(isEmailValid);

        if (isNameValid && isEmailValid) {
            try {
                const response = await postUrl("/auth/login", { name, email });
                if (response) {
                    navigatePage('/dogSearch');
                }
            } catch (error) {
                console.log("Error logging in:", error);
                alert("Login failed, verify name and email");
            }
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <Stack spacing={4} 
                sx={{ 
                    boxShadow: 5,
                    borderRadius: 3,
                    margin: 2,
                    padding: 4, 
                    bgcolor: 'white',
                    width: 500,
                }}>
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
                    error={!nameValid && name.length}
                    helperText={!nameValid && name.length ? "Invalid name format" : null}
                    onChange={(e) => handleChange("name", e.target.value)}
                />
                <TextField
                    label="Email"
                    required
                    id="email"
                    variant="outlined"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    error={!emailValid && email.length}
                    helperText={!emailValid && email.length  ? "Invalid email format" : null}
                    onChange={(e) => handleChange("email", e.target.value)}
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
};

export default Login;
