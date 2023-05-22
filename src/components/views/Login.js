import React, { useContext, useState } from "react";
import { api, handleError } from "helpers/api";
import { useHistory, useLocation } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { GlobalContext } from "../../helpers/GlobalState";
import { toast } from "react-toastify";
import { CustomHeading } from "styles/development/CustomHeading";
import { CustomGrid } from "styles/development/CustomGrid";

const Login = (props) => {
  const { setUser } = useContext(GlobalContext);
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);

  const handleUsernameInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordInputChange = (event) => {
    setPassword(event.target.value);
  };

    let lobby = false;
    let lobbyId = 0;

    try {
    const location = useLocation();

    lobby = location.state.lobby;
    lobbyId = location.state.lobbyId;
  } catch {}

  if (props.lobby) {
    lobby = props.lobby;
    lobbyId = props.lobbyId;
  }

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

      if (props.lobby) {
        history.push("/Lobby/" + String(props.lobbyId));
      } else {
          try {
            if (lobby) {
              history.push("/Lobby/" + String(lobbyId));
            }
          } catch {}
      }

      history.push(`/Home`);
    } catch (error) {
      toast.error(handleError(error));
      if (error.response.data.includes("username")) {
        setUsernameError(true);
      }
      if (error.response.data.includes("password")) {
        setPasswordError(true);
      }
    }
  };

  return (
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
          <CustomHeading variant="h3">Login</CustomHeading>
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
              label={"Password"}
              type={"password"}
              value={password}
              onChange={handlePasswordInputChange}
              sx={{ mt: 2 }}
              error={passwordError}
            />
            {/* Buttons */}
            <Button
              variant="contained"
              startIcon={<LoginIcon />}
              onClick={() => doLogin()}
              disabled={!username || !password}
              sx={{
                marginY: 2,
                paddingY: 2,
                paddingX: 4,
                justifySelf: "center",
                alignSelf: "center",
              }}
            >
              Login
            </Button>
            
            <Typography sx={{alignSelf: "center", mt: 8}}>New here? Register now!</Typography>

            <Button
              variant={"contained"}
              startIcon={<AppRegistrationIcon />}
              onClick={() =>
                history.push({
                  pathname: "/register",
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
              Register
            </Button>
          </Box>
        </CustomGrid>
      </Grid>
    </BaseContainer>
  );
};
export default Login;
