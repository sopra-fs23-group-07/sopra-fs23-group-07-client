import { Badge, Button } from "@mui/material";
import React, { useState } from "react";
import { api, handleError } from "./api";

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
            alert(`Something went wrong when joining the lobby: \n${handleError(error)}`);
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
            alert(`Something went wrong when joining the lobby: \n${handleError(error)}`);
        }
    };

    const { location, lobby } = props;

    const addressStyle = {
        color: lobby.lobbyDecidedLocation.address === address ? "blue" : "inherit",
    };

    return (
        <div>
            {UserAlreadyVoted ? (
                <Badge badgeContent={memberVotes} color="error">
                    <Button disabled={props.hasLockedSelections} variant="contained" onClick={() => UnVoteForLocation(location)}>
                        Unvote
                    </Button>
                </Badge>
            ) : (
                <Badge badgeContent={memberVotes} color="primary">
                    <Button disabled={props.hasLockedSelections} variant="contained" onClick={() => VoteForLocation(location)}>
                        Vote
                    </Button>
                </Badge>
            )}
            {/*<Badge badgeContent={memberVotes} color="primary"> <Button variant="contained" onClick={()=> handleVote(location)}> Vote</Button> </Badge>*/}
            &nbsp;&nbsp;
            <span style={addressStyle}>{address}</span>
            <Button
                // fly to the location
                onClick={() => {
                    setFlyToLocation({ latitude, longitude });
                }}
            >
                Show on Map
            </Button>
        </div>
    );
};

export default VotingForLocations;
