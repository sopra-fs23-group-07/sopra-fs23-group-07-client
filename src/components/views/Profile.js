import * as React from 'react';
import {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import BaseContainer from "../ui/BaseContainer";
import {Avatar, Badge, Button, Table, TableCell, TableContainer, TableRow} from "@mui/material";
import {api, handleError} from "../../helpers/api";
import {useHistory, useParams} from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import {toast} from "react-toastify";


const Profile = () => {
    const history = useHistory();
    const userId = useParams().userId;
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/users/" + userId)

                setUser(response.data);

                console.log("request to:", response.request.responseURL);
                console.log("status code:", response.status);
                console.log("status text:", response.statusText);
                console.log("requested data:", response.data);
                console.log(response);

            } catch (error) {
                toast.error(handleError(error));
            }
        };
        fetchData()
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
              alignItems="flex-start">
            <Grid item xs={5}>
                <Badge color={user.status == 'OFFLINE' ? 'error' : 'success'}
                       badgeContent={" "}
                       overlap={"circular"}
                       anchorOrigin={{
                           vertical: 'bottom',
                           horizontal: 'right',
                       }}>
                    <Avatar src="src/volleyball_w.jpg" sx={{width: 200, height: 200}}/>
                </Badge>
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
                    <Button variant={"outlined"}
                            size="lg"
                            startIcon={<EditIcon/>}
                            sx={{mt: 2}}
                            onClick={() => handleEditProfileClick(user.userId)}
                            disabled={user.userId != localStorage.getItem("userId")}>
                        Edit Profile
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={7}>
                <Typography variant={"h5"}>
                    Bio
                </Typography>
                <Typography>
                    {user.bio}
                </Typography>
            </Grid>
        </Grid>

    </Paper>

    return (
        <BaseContainer className="profile">
            <Grid item xs={12}>
                <Typography variant={"h3"}>
                    Profile
                </Typography>
            </Grid>
            {content}
        </BaseContainer>
    );
};

export default Profile;