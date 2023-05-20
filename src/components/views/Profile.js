import * as React from 'react';
import {useEffect, useState} from 'react';
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
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableRow,
    Typography
} from "@mui/material";
import {api, handleError} from "../../helpers/api";
import {useHistory, useParams} from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import {toast} from "react-toastify";
import volley_m from '../../avatars/volley_m.jpg';
import basketball_m from '../../avatars/basketball_m.jpg';
import basketball_w from '../../avatars/basketball_w.jpg';
import soccer_m from '../../avatars/soccer_m.jpg';
import soccer_w from '../../avatars/soccer_w.jpg';
import tennis_m from '../../avatars/tennis_m.jpg';
import tennis_w from '../../avatars/tennis_w.jpg';
import waterpolo_m from '../../avatars/waterpolo_m.jpg';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';

const Profile = () => {
    const history = useHistory();
    const userId = useParams().userId;
    const token = localStorage.getItem("token");
    const avatars = [volley_m, basketball_m, basketball_w, soccer_m, soccer_w, tennis_m, tennis_w, waterpolo_m];
    const [user, setUser] = useState([]);
    const [avatar, setAvatar] = useState(avatars[0]); // Initial avatar is the first in the list
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [noUser, setNoUser] = useState(false);


    const handleAvatarChange = (index) => {
        const fetchData = async () => {
            try {
                const requestBody = {"avatar": index, "userId": userId, "token": token};
                const response = await api.put(`/users/${userId}`, requestBody, {
                    headers: {Authorization: `Bearer ${token}`},
                });
                return response;  // Return the response from the async function.
            } catch (error) {
                toast.error(handleError(error));
            }
        }
        fetchData()
            .then(() => {
                setAvatar(avatars[index]);  // Set avatar only if API call is successful.
            });
    }
    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/users/" + userId)

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
        })
    }, [userId])

    const handleEditProfileClick = (userId) => {
        if (userId == localStorage.getItem("userId")) {
            history.push("/Profile/" + String(userId) + "/edit");
        } else (
            toast.error("You are not allowed to edit this profile")
        )

    };
    let content = <Paper
        sx={{
            p: 4,
            mt: 2,
            maxWidth: 1200,
            flexGrow: 1,

        }}
        elevation={3}
    >
        <Grid container spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="center">
            <Grid container lg={3} md={6} xs={12}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  p={2}>
                <Grid container lg={12} md={6} xs={12}
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      p={2}>
                    <Grid item>
                        <Badge color={user.status === 'OFFLINE' ? 'error' : 'success'}
                               badgeContent={" "}
                               overlap={"circular"}
                               anchorOrigin={{
                                   vertical: 'bottom',
                                   horizontal: 'right',
                               }}>
                            <Avatar src={avatar} sx={{width: 200, height: 200}}/> {/* Use the imported image */}
                        </Badge>
                    </Grid>
                </Grid>
                <Grid container lg={12} md={6} xs={12}
                      direction="row"
                      justifyContent="center"
                      alignItems="center" >
                    <Grid item>
                        <Button variant="outlined"
                                onClick={handleClickOpen}
                                disabled={user.userId != localStorage.getItem("userId")}>

                            <SwitchAccountIcon/>
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
                                                sx={{ width: 50, height: 50, cursor: 'pointer' }}
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
            </Grid>
            <Grid container lg={9} md={12} xs={12}
                  direction="row"
                  justifyContent="center"
                  alignItems="flex-start"
                  p={2}>
                <Grid container lg={5} md={5} xs={12}
                      direction="row"
                      justifyContent="center"
                      alignItems="flex-start"
                      p={2}>
                    <Grid item>
                        <TableContainer>
                            <Table sx={{maxWidth: 100}}>
                                <TableRow>
                                    <TableCell align="right">
                                        <Typography variant={"h6"}>Username</Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Typography>{user.username}</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right">
                                        <Typography variant={"h6"}>Email</Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Typography>{user.email}</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right">
                                        <Typography variant={"h6"}>Birthdate</Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Typography>{user.birthdate}</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right">
                                        <Typography variant={"h6"}>Member since</Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Typography>{user.creationDate}</Typography>
                                    </TableCell>
                                </TableRow>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
                <Grid container lg={4} md={7} xs={12}
                      direction="row"
                      justifyContent="center"
                      alignItems="flex-start"
                      p={2}>
                    <Grid item>
                        <Typography variant={"h5"}>
                            Bio
                        </Typography>
                        <Typography>
                            {user.bio}
                        </Typography>
                    </Grid>
                </Grid>

            </Grid>
            <Button variant={"outlined"}
                    size="lg"
                    startIcon={<EditIcon/>}
                    sx={{mt: 2}}
                    onClick={() => handleEditProfileClick(user.userId)}
                    disabled={user.userId != localStorage.getItem("userId")}>
                Edit Profile
            </Button>
        </Grid>
    </Paper>

    let noUserContent = (
        <Paper
            sx={{
                p: 4,
                mt: 2,
                maxWidth: 400,
                flexGrow: 1,
            }}
            elevation={3}
        >
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{ minHeight: '100%' }}  // or you can set a specific height here
            >
                <p>
                    This User does not exist.
                </p>
                <p>
                    <Button
                        variant="contained"
                        onClick={() => history.goBack()}
                        sx={{ mt: 2 }}
                    >
                        Go Back
                    </Button>
                </p>
                <p>
                    <Button
                        variant="contained"
                        onClick={() => history.push("/Home")}
                        sx={{ mt: 2 }}
                    >
                        Home
                    </Button>
                </p>
            </Grid>
        </Paper>

    );


    return (
        <BaseContainer className="profile">
            <Grid item xs={12}>
                <Typography variant={"h3"}>
                    Profile
                </Typography>
            </Grid>
            {isLoading ? <Spinner/> : (noUser ? noUserContent : content)}
        </BaseContainer>
    );
};

export default Profile;