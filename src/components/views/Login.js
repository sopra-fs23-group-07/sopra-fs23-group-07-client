import React, { useContext, useState } from "react";
import { api, handleError } from "helpers/api";
import { useHistory } from "react-router-dom";
import "styles/views/Login.scss";
import BaseContainer from "components/ui/BaseContainer";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { GlobalContext } from "../../helpers/GlobalState";
import {toast} from "react-toastify";


const Login = () => {
    const { setUser } = useContext(GlobalContext)
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);

    const handleUsernameInputChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordInputChange = (event) => {
        setPassword(event.target.value);
    };

    const doLogin = async () => {
        setUsernameError(false);
        setPasswordError(false);
        try {
            const requestBody = JSON.stringify({ username, password });
            const response = await api.post("/users/login", requestBody);

            // Get the returned user and update a new object.
            const user = response.data;

            // Store the token into the local storage.
            localStorage.setItem("token", user.token);
            localStorage.setItem("userId", user.userId);
            setUser(user);

            // Login successfully worked --> navigate to the route /game in the GameRouter
            history.push(`/Home`);
        } catch (error) {
            toast.error(handleError(error));
            if (error.response.data.includes("username")){
                setUsernameError(true);
            }
            if (error.response.data.includes("password")){
                setPasswordError(true);
            }
        }
    };


    return (
        <BaseContainer>
            <Grid item xs={12} sx={{ paddingY: 2, maxWidth: 800, m: '0 auto' }}>
                <Typography variant={"h3"}>Login</Typography>
            </Grid>
            <Paper
                sx={{
                    paddingY: 10,
                    paddingX: 4,
                    mt: 2,
                    maxWidth: 800,
                    flexGrow: 1,
                    margin: '0 auto'
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '60%', margin: '0 auto' }}>
                    <TextField
                        label={"Username"}
                        placeholder={"Enter your username"}
                        type={"text"}
                        value={username}
                        onChange={handleUsernameInputChange}
                        sx={{ mt: 2 }}
                        error={usernameError}
                    />
                    <TextField
                        label={"Password"}
                        placeholder={"Enter your password"}
                        type={"password"}
                        value={password}
                        onChange={handlePasswordInputChange}
                        sx={{ mt: 2 }}
                        error={passwordError}
                    />
                    <Button
                        variant="contained"
                        startIcon={<LoginIcon />}
                        onClick={() => doLogin()}
                        disabled={!username || !password}
                        sx={{
                            marginY: 2,
                            paddingY: 2,
                            paddingX: 4,
                            justifySelf: 'center',
                            alignSelf: 'center'
                        }}
                    >
                        Login
                    </Button>
                    <div>Not a User yet? Please go to the Register Page.</div>

                    <Button
                        variant={"contained"}
                        startIcon={<AppRegistrationIcon />}
                        onClick={() => history.push("/register")}
                        sx={{
                            mt: 2,
                            paddingY: 2,
                            paddingX: 4,
                            justifySelf: 'center',
                            alignSelf: 'center'}}
                    >
                        Register
                    </Button>
                </Box>
            </Paper>
        </BaseContainer>
    )
}
export default Login;
