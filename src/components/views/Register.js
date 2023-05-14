import React, {useContext, useState, useEffect} from "react";
import {api, handleError} from "helpers/api";
import User from "models/User";
import {useHistory, useLocation} from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import {Box, Button, Grid, Paper, TextField, Typography} from "@mui/material";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
import {GlobalContext} from "../../helpers/GlobalState";
import {toast} from "react-toastify";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */

const Register = (props) => {
    const {setUser} = useContext(GlobalContext)
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [usernameError, setUsernameError] =useState(false);
    const [emailError, setEmailError] = useState(false);

    function validateEmail(email) {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return (emailRegex.test(email) || email === '');
    }
    const handleUsernameInputChange = (event) => {
        setUsernameError(false);
        setUsername(event.target.value);
    };

    const handleEmailInputChange = (event) => {
        setEmailError(false);
        setEmail(event.target.value);
    };

    const handlePasswordInputChange = (event) => {
        setPassword(event.target.value);
    };

    var lobby = false;
    var lobbyId = 0;


    try {
        const location = useLocation();

        lobby = location.state.lobby;
        //console.log(lobby);
        lobbyId = location.state.lobbyId;

        }
    catch {}




    const doRegister = async () => {


        if (!validateEmail(email)) {
            toast.error("The email address you provided is invalid. Please enter a valid email address.");
            setEmailError(true);
            return;
        }
        try {
            const requestBody = JSON.stringify({username, password, email});
            const response = await api.post("/users", requestBody);

            // Get the returned user and update a new object.
            const user = new User(response.data);

            // Store the token into the local storage.
            localStorage.setItem("token", user.token);
            localStorage.setItem("userId", user.userId);
            setUser(user);

            // Login successfully worked --> navigate to the route /home in the AppRouter
            console.log(lobby);
            try {
                if(lobby) { history.push("/Lobby/" + String(lobbyId)); }
            }
            catch {}

            history.push(`/Home`);
        } catch (error) {
            toast.error(handleError(error));
            setUsernameError(true);
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
                    <TextField
                        label={"Username"}
                        placeholder={"Enter your username"}
                        type={"text"}
                        value={username}
                        onChange={handleUsernameInputChange}
                        sx={{mt: 2}}
                        error={usernameError}
                    />
                    <TextField
                        label={"Email"}
                        placeholder={"Enter your email"}
                        type={"email"}
                        value={email}
                        onChange={handleEmailInputChange}
                        sx={{mt: 2}}
                        error={emailError}
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
                            onClick={() => history.push({pathname: "/login", state: {lobby: lobby, lobbyId: lobbyId}})}
                            sx={{
                                mt: 2,
                                paddingY: 2,
                                paddingX: 4,
                                justifySelf: 'center',
                                alignSelf: 'center'}}
                    >
                        Login + {lobby}
                    </Button>
                </Box>
            </Paper>
        </BaseContainer>
);
};

export default Register;