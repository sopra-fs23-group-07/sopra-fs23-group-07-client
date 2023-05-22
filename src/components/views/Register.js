import React, { useContext, useState } from "react";
import { api, handleError } from "helpers/api";
import User from "models/User";
import { useHistory, useLocation } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import { GlobalContext } from "../../helpers/GlobalState";
import { toast } from "react-toastify";
import { CustomHeading } from "styles/development/CustomHeading";
import { CustomGrid } from "styles/development/CustomGrid";

const Register = (props) => {
  const { setUser } = useContext(GlobalContext);
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  function validateEmail(email) {
    if (email.length > 100){
      return false;
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/i;
      return emailRegex.test(email);
    }
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
    lobbyId = location.state.lobbyId;
  } catch {}

  const doRegister = async () => {
    if (!validateEmail(email)) {
      toast.error(
        "The email address you provided is invalid. Please enter a valid email address."
      );
      setEmailError(true);
      return;
    }
    try {
      const requestBody = JSON.stringify({ username, password, email });
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
        if (lobby) {
          history.push("/Lobby/" + String(lobbyId));
        }
      } catch {}

      history.push(`/Home`);
    } catch (error) {
      toast.error(handleError(error));
      setUsernameError(true);
    }
  };

  return (
    // <BaseContainer>
    //   <Grid item xs={12} sx={{ paddingY: 2, maxWidth: 800, m: "0 auto" }}>
    //     <Typography variant={"h3"}>Register</Typography>
    //   </Grid>
    //   <Paper
    //     sx={{
    //       paddingY: 10,
    //       paddingX: 4,
    //       mt: 2,
    //       maxWidth: 800,
    //       flexGrow: 1,
    //       margin: "0 auto",
    //     }}
    //   >
    //     <Box
    //       sx={{
    //         display: "flex",
    //         flexDirection: "column",
    //         width: "60%",
    //         margin: "0 auto",
    //       }}
    //     >
    //       <TextField
    //         label={"Username"}
    //         placeholder={"Enter your username"}
    //         type={"text"}
    //         value={username}
    //         onChange={handleUsernameInputChange}
    //         sx={{ mt: 2 }}
    //         error={usernameError}
    //       />
    //       <TextField
    //         label={"Email"}
    //         placeholder={"Enter your email"}
    //         type={"email"}
    //         value={email}
    //         onChange={handleEmailInputChange}
    //         sx={{ mt: 2 }}
    //         error={emailError}
    //       />
    //       <TextField
    //         label={"Password"}
    //         placeholder={"Enter your password"}
    //         type={"password"}
    //         value={password}
    //         onChange={handlePasswordInputChange}
    //         sx={{ mt: 2 }}
    //       />
    //       <Button
    //         variant={"contained"}
    //         startIcon={<AppRegistrationIcon />}
    //         disabled={!username || !email || !password}
    //         onClick={() => doRegister()}
    //         sx={{
    //           marginY: 2,
    //           paddingY: 2,
    //           paddingX: 4,
    //           justifySelf: "center",
    //           alignSelf: "center",
    //         }}
    //       >
    //         Register
    //       </Button>

    //       <div>Already a User? Please go to the Login Page.</div>

    //       <Button
    //         variant={"contained"}
    //         startIcon={<LoginIcon />}
    //         onClick={() =>
    //           history.push({
    //             pathname: "/login",
    //             state: { lobby: lobby, lobbyId: lobbyId },
    //           })
    //         }
    //         sx={{
    //           mt: 2,
    //           paddingY: 2,
    //           paddingX: 4,
    //           justifySelf: "center",
    //           alignSelf: "center",
    //         }}
    //       >
    //         Login
    //       </Button>
    //     </Box>
    //   </Paper>
    // </BaseContainer>

    <BaseContainer>
      {/* Container of all content */}
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          direction: "column",
        }}
      >
        {/* title */}
        <Grid item xs={12}>
          <CustomHeading variant="h3">Register</CustomHeading>
        </Grid>
        {/* Visible Box */}
        <CustomGrid sx={{ paddingY: 10, paddingX: 8, mt: 2 }}>
          {/* All form fields */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "70%",
              minWidth: "340px", // this parameter controlls the width of the input field and therefore the width of the whole box
              margin: "0 auto",
            }}
          >
            <TextField
              label={"Username"}
              type={"text"}
              value={username}
              onChange={handleUsernameInputChange}
              sx={{ mt: 2 }}
              error={usernameError}
            />
            <TextField
              label={"Email"}
              type={"email"}
              value={email}
              onChange={handleEmailInputChange}
              sx={{ mt: 2 }}
              error={emailError}
            />
            <TextField
              label={"Password"}
              type={"password"}
              value={password}
              onChange={handlePasswordInputChange}
              sx={{ mt: 2 }}
            />
            {/* Buttons */}
            <Button
              variant="contained"
              startIcon={<AppRegistrationIcon />}
              disabled={!username || !email || !password}
              onClick={() => doRegister()}
              sx={{
                marginY: 2,
                paddingY: 2,
                paddingX: 4,
                justifySelf: "center",
                alignSelf: "center",
              }}
            >
              Register
            </Button>

            <Typography sx={{ alignSelf: "center", mt: 8 }}>
              Known here? Login now!
            </Typography>

            <Button
              variant={"contained"}
              startIcon={<LoginIcon />}
              onClick={() =>
                history.push({
                  pathname: "/login",
                  state: { lobby: lobby, lobbyId: lobbyId },
                })
              }
              sx={{
                mt: 2,
                paddingY: 2,
                paddingX: 4,
                justifySelf: "center",
                alignSelf: "center",
              }}
            >
              Login
            </Button>
          </Box>
        </CustomGrid>
      </Grid>
    </BaseContainer>
  );
};

export default Register;
