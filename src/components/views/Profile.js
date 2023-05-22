import * as React from "react";
import { useEffect, useState } from "react";
import BaseContainer from "../ui/BaseContainer";
import Spinner from "../ui/Spinner";
import {
  Avatar,
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Table,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { api, handleError } from "../../helpers/api";
import { useHistory, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import volley_m from "../../avatars/volley_m.jpg";
import basketball_m from "../../avatars/basketball_m.jpg";
import basketball_w from "../../avatars/basketball_w.jpg";
import soccer_m from "../../avatars/soccer_m.jpg";
import soccer_w from "../../avatars/soccer_w.jpg";
import tennis_m from "../../avatars/tennis_m.jpg";
import tennis_w from "../../avatars/tennis_w.jpg";
import waterpolo_m from "../../avatars/waterpolo_m.jpg";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";

const Profile = () => {
  const history = useHistory();
  const userId = useParams().userId;
  const token = localStorage.getItem("token");
  const avatars = [
    volley_m,
    basketball_m,
    basketball_w,
    soccer_m,
    soccer_w,
    tennis_m,
    tennis_w,
    waterpolo_m,
  ];
  const [user, setUser] = useState([]);
  const [avatar, setAvatar] = useState(avatars[0]); // Initial avatar is the first in the list
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [noUser, setNoUser] = useState(false);

  const handleAvatarChange = (index) => {
    const fetchData = async () => {
      try {
        const requestBody = { avatar: index, userId: userId, token: token };
        const response = await api.put(`/users/${userId}`, requestBody, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response; // Return the response from the async function.
      } catch (error) {
        toast.error(handleError(error));
      }
    };
    fetchData().then(() => {
      setAvatar(avatars[index]); // Set avatar only if API call is successful.
    }).catch(err => console.log(err));
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/users/" + userId);

        setUser(response.data);
        setAvatar(avatars[response.data.avatar]);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setNoUser(true);
        toast.error(handleError(error));
      }
    };
    fetchData().then(() => {
      console.log("Data fetched successfully"); // This will be executed after fetchData is complete.
    }).catch(err => console.log(err));
  }, [userId]);

  const handleEditProfileClick = (userId) => {
    if (userId === localStorage.getItem("userId")) {
      history.push("/Profile/" + String(userId) + "/edit");
    } else toast.error("You are not allowed to edit this profile");
  };

  // render content of valid profile page
  let content = (
    <Grid
      item
      container
      xs={12}
      md={12}
      sx={{
        flexGrow: 1,
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",
        background: "white",
        flexdirection: "row",
        display: "flex",
        justifyContent: "center",
        p: 2,
      }}
    >
      {/* Avatar */}
      <Grid
        item
        container
        md={4}
        xs={12}
        sx={{
          direction: "row",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Avatar Picture with status */}
        <Grid item xs={12} sx={{display: "flex", justifyContent: "center"}}>
          <Badge
            color={user.status === "OFFLINE" ? "error" : "success"}
            badgeContent={" "}
            overlap={"circular"}
            anchorOrigin={{ 
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            {/* Use the imported image */}
            <Avatar src={avatar} sx={{ width: 200, height: 200 }} />
          </Badge>
        </Grid>

        {/*  Change avatar Button & Popup */}
        <Grid item>
          <Button
            variant="contained"
            onClick={handleClickOpen}
            disabled={user.userId !== localStorage.getItem("userId")}
          >
            <SwitchAccountIcon sx={{mr: 1}} />
             Change Avatar
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Choose an Avatar</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                {avatars.map((avatarSrc, index) => (
                  <Grid item xs={4} key={index}>
                    <Avatar
                      src={avatarSrc}
                      sx={{ width: 50, height: 50, cursor: "pointer" }}
                      onClick={() => {
                        handleAvatarChange(index);
                        handleClose();
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>

      {/* User data */}
      <Grid
        item
        container
        md={8}
        xs={12}
        sx={{flexDirection: "column", display: "flex", justifyContent: "flex-start", alignItems: "center" }}
      >
        {/* Data */}
        <Grid item > 
        {/* Table */}
        <Table sx={{
                        "& td, & th": {
                          background: "rgba(165, 109, 201, 0.1)",
                          border: "1px black solid", // works
                        },
                      }}>
                <TableRow >
                  <TableCell >
                    <Typography variant={"h6"}>Username</Typography>
                  </TableCell>
                  <TableCell >
                    <Typography>{user.username}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell >
                    <Typography variant={"h6"}>Email</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{user.email}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell >
                    <Typography variant={"h6"}>Birthdate</Typography>
                  </TableCell>
                  <TableCell >
                    <Typography>{user.birthdate}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell >
                    <Typography variant={"h6"}>Member since</Typography>
                  </TableCell>
                  <TableCell >
                    <Typography>{user.creationDate}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell >
                    <Typography variant={"h6"}>Bio</Typography>
                  </TableCell>
                  <TableCell >
                    <Typography>{user.bio}</Typography>
                  </TableCell>
                </TableRow>
              </Table>
        </Grid>
        
        {/* Edit Button */}
        <Grid item > 
        <Button
          variant={"contained"}
          size="lg"
          startIcon={<EditIcon />}
          sx={{ mt: 2 }}
          onClick={() => handleEditProfileClick(user.userId)}
          disabled={user.userId !== localStorage.getItem("userId")}
        >
          Edit Profile
        </Button>
        </Grid>
      </Grid>


    </Grid>
  );

  // catch user trying to access profile that doesn't exist
  let noUserContent = (
    <Grid
      item
      container
      xs={12}
      md={12}
      sx={{
        flexGrow: 1,
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",
        background: "white",
        flexdirection: "row",
        display: "flex",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100%" }}
      >
        <p>This User does not exist.</p>
        <p>
          <Button
            variant="contained"
            onClick={() => history.goBack()}
            // sx={{ mt: 2 }}
          >
            Go Back
          </Button>
        </p>
        <p>
          <Button
            variant="contained"
            onClick={() => history.push("/Home")}
            // sx={{ mt: 2 }}
          >
            Home
          </Button>
        </p>
      </Grid>
    </Grid>
  );

    let displayContent;

    if(isLoading) {
        displayContent = <Spinner />;
    } else if(noUser) {
        displayContent = noUserContent;
    } else {
        displayContent = content;
    }

  return (
    <BaseContainer>
      {/* Title */}
      <Grid container sx={{ marginBottom: 4 }}>
        <Grid item xs={12}>
          <Typography
            variant="h3"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            Profile
          </Typography>
        </Grid>
      </Grid>

      {/* Visible Box */}
      <Grid
        container
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          borderRadius: "20px",
          padding: 4,
          display: "flex",
          justifyContent: "space-between",
          gap: 4,
          minHeight: "400px",
        }}
      >
          {displayContent}
      </Grid>
    </BaseContainer>
  );
};

export default Profile;
