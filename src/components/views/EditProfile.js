import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {api, handleError} from 'helpers/api';
import 'styles/views/EditProfile.scss';
import BaseContainer from 'components/ui/BaseContainer';
import PropTypes from 'prop-types';
import {Box, Button, Grid, Paper, TextField, Typography} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import ErrorMessage from "../ui/ErrorMessage";

const EditProfile = () => {
    const history = useHistory();
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [error, setError] = useState(null);

    const handleUsernameInputChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordInputChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRepeatPasswordInputChange = (event) => {
        setRepeatPassword(event.target.value);
    };

    const handleEmailInputChange = (event) => {
        setEmail(event.target.value);
    };

    const handleBioInputChange = (event) => {
        setBio(event.target.value);
    }

    const handleUpdateProfile = async () => {
        if (password !== repeatPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!validateInput()) {
            return;
        }

        try {
            const filteredRequestBody = Object.fromEntries(
                Object.entries({
                    userId,
                    username,
                    password,
                    email,
                    bio,
                }).filter(([_, value]) => value !== '')
            );

            await api.put(`/users/${userId}`, filteredRequestBody, {
                headers: { Authorization: `Bearer ${token}` },
            });
            history.push(`/profile/${userId}`);
        } catch (error) {
            setError(handleError(error));
        }
    };

    const validateInput = () => {

        // ToDo: Add some validation rules here

        return true;
    };

    return (
        <BaseContainer className="editProfile">
            <Grid item xs={12}>
                <Typography variant={'h3'}>Edit Profile</Typography>
            </Grid>
            <Paper
                sx={{
                    paddingY: 10,
                    paddingX: 4,
                    mt: 2,
                    maxWidth: 800,
                    flexGrow: 1,
                }}
            >
                <Box sx={{display: 'flex', flexDirection: 'column', width: '60%', margin: '0 auto'}}>
                    <ErrorMessage error={error} onClose={() => setError(null)} />
                    <TextField
                        label="Username"
                        value={username}
                        onChange={handleUsernameInputChange}
                        sx={{mt: 2}}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={handleEmailInputChange}
                        sx={{mt: 2}}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={handlePasswordInputChange}
                        sx={{mt: 2}}
                    />
                    <TextField
                        label="Repeat Password"
                        type="password"
                        value={repeatPassword}
                        onChange={handleRepeatPasswordInputChange}
                        sx={{mt: 2}}
                    />
                    <TextField
                        label={"Bio"}
                        type={"text"}
                        placeholder={"Tell the world something about you!"}
                        value={bio}
                        multiline
                        rows={3}
                        onChange={handleBioInputChange}
                        sx={{mt:2}}
                    />
                    {error && (
                        <Typography color="error" sx={{mt: 2}}>
                            {error}
                        </Typography>
                    )}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '80%',
                            margin: '0 auto',
                            mt: 3
                        }}
                    >
                        <Button variant="contained"
                                startIcon={<SaveOutlinedIcon/>}
                                onClick={handleUpdateProfile}
                                sx={{mt: 2, p: 2, marginX: "5%"}}
                        >
                            Save Changes
                        </Button>
                        <Button variant="contained"
                                color={"error"}
                                startIcon={<CancelIcon/>}
                                onClick={() => history.push(`/Profile/${userId}`)}
                                sx={{mt: 2, p: 2, marginX: "5%" }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </BaseContainer>
    );
};

EditProfile.propTypes = {
    history: PropTypes.object,
};

export default EditProfile;