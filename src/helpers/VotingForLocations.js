import {Badge, Button} from "@mui/material";
import React, {useState} from "react";
import {api, handleError} from "./api";


const VotingForLocations = (props) => {

    const [voting, setVoting] = React.useState(0);
    const [UserAlreadyVoted, setUserAlreadyVoted] = useState(false);
    const address = props.address;
    const lobbyId = localStorage.getItem("lobbyId");
    const locationId = props.locationId;
    const memberVotes = props.memberVotes;


    const VoteForLocation = async () => {
        try {

            const requestBody = JSON.stringify({
                "memberId": props.memberId,
                "locationId": locationId
            });
            await api.put(`/lobbies/${lobbyId}/locations/${locationId}/vote`, requestBody);
            setUserAlreadyVoted(true);

        } catch (error) {
            alert(`Something went wrong when joining the lobby: \n${handleError(error)}`);
        }

    };

    React.useEffect(() => {
        return () => {
            setUserAlreadyVoted(false);
        };
    }, []);

    const UnVoteForLocation = async () => {
        try {

            const requestBody = JSON.stringify({
                "memberId": props.memberId,
                "locationId": locationId
            });
            await api.put(`/lobbies/${lobbyId}/locations/${locationId}/unvote`, requestBody);
            setUserAlreadyVoted(false);

        } catch (error) {
            alert(`Something went wrong when joining the lobby: \n${handleError(error)}`);
        }

    };

    const {location} = props;

    return (
        <div>
            {UserAlreadyVoted ?
                <Badge badgeContent={memberVotes} color="error"> <Button disabled={props.hasLockedSelections}
                                                                         variant="contained"
                                                                         onClick={() => UnVoteForLocation(location)}> Unvote</Button>
                </Badge> :
                <Badge badgeContent={memberVotes} color="primary"> <Button disabled={props.hasLockedSelections}
                                                                           variant="contained"
                                                                           onClick={() => VoteForLocation(location)}> Vote</Button>
                </Badge>}
            {/*<Badge badgeContent={memberVotes} color="primary"> <Button variant="contained" onClick={()=> handleVote(location)}> Vote</Button> </Badge>*/}
            &nbsp;&nbsp;{address}
        </div>
    );
}

export default VotingForLocations;
