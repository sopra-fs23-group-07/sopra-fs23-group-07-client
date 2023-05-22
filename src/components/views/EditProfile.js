import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { api, handleError } from "helpers/api";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import { Box, Button, Grid, TextField } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { toast } from "react-toastify";
import { CustomHeading } from "styles/development/CustomHeading";

const EditProfile = () => {
  const history = useHistory();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [birthdate, setBirthdate] = useState(null);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  function validateEmail(email) {
      if (!email){return true;}
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

  const handlePasswordInputChange = (event) => {
    setPasswordError(false);
    setPassword(event.target.value);
  };

  const handleRepeatPasswordInputChange = (event) => {
    setRepeatPassword(event.target.value);
  };

  const handleEmailInputChange = (event) => {
    setEmailError(false);
    setEmail(event.target.value);
  };

  const handleBioInputChange = (event) => {
    setBio(event.target.value);
  };
  const handleBirthdateInputChange = (value) => {
    const newBirthdate = dayjs(value);
    setBirthdate(newBirthdate);
  };
  const handleUpdateProfile = async () => {
    if (password !== repeatPassword) {
      toast.error("Passwords do not match");
      setPasswordError(true);
      return;
    }

    if (!validateEmail(email)) {
      toast.error(
        "The email address you provided is invalid. Please enter a valid email address."
      );
      setEmailError(true);
      return;
    }

    try {
      const filteredRequestBody = Object.fromEntries(
        Object.entries({
          token,
          userId,
          username,
          password,
          email,
          bio,
          birthdate,
        }).filter(([_, value]) => value !== "")
      );
      await api.put(`/users/${userId}`, filteredRequestBody, {
        headers: { Authorization: `Bearer ${token}` },
      });
      history.push(`/profile/${userId}`);
    } catch (error) {
      toast.error(handleError(error));
      if (error.response.data.includes("username")) {
        setUsernameError(true);
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
          {/* <Typography
            variant={"h3"}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              //   letterSpacing: "0.2em"
            }}
          >
            Edit Profile
          </Typography> */}
          <CustomHeading variant="h3">Edit Profile</CustomHeading>
        </Grid>
        {/* Visible Box */}
        <Grid
          item
          sx={{
            paddingY: 10,
            paddingX: 4,
            mt: 2,
            maxWidth: 600,
            flexGrow: 1,
            background: "rgba(255, 255, 255, 0.7)",
            borderRadius: "20px",
          }}
        >
          {/* All form fields */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "70%",
              margin: "0 auto",
            }}
          >
            <TextField
              label="Username"
              value={username}
              onChange={handleUsernameInputChange}
              sx={{ mt: 2 }}
              error={usernameError}
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailInputChange}
              sx={{ mt: 2 }}
              error={emailError}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordInputChange}
              sx={{ mt: 2 }}
              error={passwordError}
            />
            <TextField
              label="Repeat Password"
              type="password"
              value={repeatPassword}
              onChange={handleRepeatPasswordInputChange}
              sx={{ mt: 2 }}
              error={passwordError}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Birth"
                value={birthdate}
                onChange={(value) => handleBirthdateInputChange(value)}
                sx={{ mt: 2 }}
                disableFuture
              />
            </LocalizationProvider>

            <TextField
              label={"Bio"}
              type={"text"}
              placeholder={"Tell the world something about you!"}
              value={bio}
              multiline
              rows={3}
              onChange={handleBioInputChange}
              sx={{ mt: 2 }}
              inputProps={{ maxLength: 100 }} // Add this line

            />
            {/* Button Container */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "80%",
                margin: "0 auto",
                mt: 3,
              }}
            >
              <Button
                variant="contained"
                startIcon={<SaveOutlinedIcon />}
                onClick={handleUpdateProfile}
                sx={{ mt: 2, p: 2, marginX: "5%", width: "120px" }}
              >
                Save
              </Button>
              <Button
                variant="contained"
                startIcon={<CancelIcon />}
                onClick={() => history.push(`/Profile/${userId}`)}
                sx={{
                  mt: 2,
                  p: 2,
                  marginX: "5%",
                  width: "120px",
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </BaseContainer>
  );
};

EditProfile.propTypes = {
  history: PropTypes.object,
};

export default EditProfile;
