import { Badge, Button, IconButton, Box, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { api, handleError } from "./api";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {toast} from "react-toastify";

const VotingForLocations = (props) => {

    const address = props.address;
    const lobbyId = localStorage.getItem("lobbyId");
    const locationId = props.locationId;
    const memberVotes = props.memberVotes;
    const latitude = props.latitude;
    const longitude = props.longitude;
    const setFlyToLocation = props.setFlyToLocation;

    const VoteForLocation = async () => {
        try {
            const requestBody = JSON.stringify({
                memberId: props.memberId,
                locationId: locationId,
            });
            await api.put(`/lobbies/${lobbyId}/locations/${locationId}/vote`, requestBody);
            setUserAlreadyVoted(true);
        } catch (error) {

            if(!(error.response.status === 404 && error.response.data === "The lobbyId provided was not found"))

            {
                toast.error(`Something went wrong when joining the lobby: \n${handleError(error)}`);
            }


        }
    };

    // Function to check if the user voted for this location
    const hasVotedForThisLocation = () => {
        // Find the current location in the lobbyLocationDTOs array
        const currentLocation = props.lobby.lobbyLocationDTOs.find(location => location.locationId === props.locationId);

        // If we found the current location and the memberVotesIds includes the memberId, return true
        if (currentLocation && currentLocation.memberVotesIds.includes(props.memberId)) {
            return true;
        }

        // If we didn't find the location or the memberId is not included in memberVotesIds, return false
        return false;
    }


    const [UserAlreadyVoted, setUserAlreadyVoted] = useState(hasVotedForThisLocation);

    // console.log(props.lobby.lobbyLocationDTOs[0].locationId);

    // React.useEffect(() => {
    //     return () => {
    //         setUserAlreadyVoted(false);
    //     };
    // }, []);

    React.useEffect(() => {
        setUserAlreadyVoted(hasVotedForThisLocation());
    }, [props.lobby, props.locationId]);


    const UnVoteForLocation = async () => {
        try {
            const requestBody = JSON.stringify({
                memberId: props.memberId,
                locationId: locationId,
            });
            await api.put(`/lobbies/${lobbyId}/locations/${locationId}/unvote`, requestBody);
            setUserAlreadyVoted(false);
        } catch (error) {
            if(!(error.response.status === 404 && error.response.data === "The lobbyId provided was not found"))

            {
                toast.error(`Something went wrong when joining the lobby: \n${handleError(error)}`);
            }
        }
    };

    const { location, lobby } = props;

    const addressStyle = lobby.lobbyDecidedLocation && lobby.lobbyDecidedLocation.address
        ? { color: lobby.lobbyDecidedLocation.address === address ? "blue" : "inherit" }
        : {}; // or your default style object

    return (
        <Box>
             <Tooltip title="Show on Map">
              <IconButton
                // fly to the location
                onClick={() => {
                    setFlyToLocation({ latitude, longitude });
                }}
                sx={{marginRight: 1}}
                
            >
                <LocationOnIcon />
            </IconButton>
            </Tooltip>
            {UserAlreadyVoted ? (
                <Badge badgeContent={memberVotes} color="error" sx={{mr: 1}}>
                    <Button disabled={props.hasLockedSelections} variant="contained" onClick={() => UnVoteForLocation(location)}>
                        Unvote
                    </Button>
                </Badge>
            ) : (
                <Badge badgeContent={memberVotes} color="primary" sx={{mr: 1}}>
                    <Button disabled={props.hasLockedSelections} variant="contained" onClick={() => VoteForLocation(location)}>
                        Vote
                    </Button>
                </Badge>
            )}
            {/* &nbsp;&nbsp; */}
            <span style={addressStyle}>{address}</span>
          
        </Box>
    );
};

export default VotingForLocations;
