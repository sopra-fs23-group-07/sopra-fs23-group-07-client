import React, {useContext, useState} from "react";
import {api, handleError} from "helpers/api";
import User from "models/User";
import {useHistory} from "react-router-dom";
import "styles/views/Register.scss";
import BaseContainer from "components/ui/BaseContainer";
import {Box, Button, Grid, Paper, TextField, Typography} from "@mui/material";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
import {GlobalContext} from "../../helpers/GlobalState";
import ErrorMessage from "../ui/ErrorMessage";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */

const Register = () => {
    const {setUser} = useContext(GlobalContext)
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);

    const handleUsernameInputChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailInputChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordInputChange = (event) => {
        setPassword(event.target.value);
    };

    const doRegister = async () => {
        try {
            const requestBody = JSON.stringify({username, password, email});
            const response = await api.post("/users", requestBody);

            // Get the returned user and update a new object.
            const user = new User(response.data);

            // Store the token into the local storage.
            localStorage.setItem("token", user.token);
            localStorage.setItem("userId", user.userId);
            setUser(user);

            // Login successfully worked --> navigate to the route /game in the GameRouter
            history.push(`/Home`);
        } catch (error) {
            setError(handleError(error));
        }
    };


    return (
        <BaseContainer>
            <Grid item xs={12} sx={{paddingY: 2, maxWidth: 800, m: '0 auto'}}>
                <Typography variant={"h3"}>Register</Typography>
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
                <Box sx={{display: 'flex', flexDirection: 'column', width: '60%', margin: '0 auto'}}>
                    <ErrorMessage error={error} onClose={() => setError(null)} />
                    <TextField
                        label={"Username"}
                        placeholder={"Enter your username"}
                        type={"text"}
                        value={username}
                        onChange={handleUsernameInputChange}
                        sx={{mt: 2}}
                    />
                    <TextField
                        label={"Email"}
                        placeholder={"Enter your email"}
                        type={"email"}
                        value={email}
                        onChange={handleEmailInputChange}
                        sx={{mt: 2}}
                    />
                    <TextField
                        label={"Password"}
                        placeholder={"Enter your password"}
                        type={"password"}
                        value={password}
                        onChange={handlePasswordInputChange}
                        sx={{mt: 2}}
                    />
                    <Button variant={"contained"}
                            startIcon={<AppRegistrationIcon/>}
                            disabled={!username || !email || !password}
                            onClick={() => doRegister()}
                            sx={{
                                marginY: 2,
                                paddingY: 2,
                                paddingX: 4,
                                justifySelf: 'center',
                                alignSelf: 'center'}}
                    >
                        Register
                    </Button>

                    <div>Already a User? Please go to the Login Page.</div>

                    <Button variant={"contained"}
                            startIcon={<LoginIcon/>}
                            onClick={() => history.push("/login")}
                            sx={{
                                mt: 2,
                                paddingY: 2,
                                paddingX: 4,
                                justifySelf: 'center',
                                alignSelf: 'center'}}
                    >
                        Login
                    </Button>
                </Box>
            </Paper>
        </BaseContainer>
    );
};

export default Register;