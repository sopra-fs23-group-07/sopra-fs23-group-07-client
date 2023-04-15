import React, {useEffect, useRef, useState} from "react";
import BaseContainer from "components/ui/BaseContainer";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TableHead,
  Typography,
  Switch,
  FormControlLabel,
  FormGroup, Button, Badge
} from "@mui/material";
import "styles/views/TestLobby.scss";
import MultipleSelectChip from "helpers/SelectSport";
import DateRangePicker from "helpers/SelectTime";
import { DatePicker } from "@mui/x-date-pickers";
import DateTimePicker from "helpers/SelectTime";
import Schedule from "@mui/icons-material/Schedule"; // Alternative icons could be AccessAlarm, Timer, Hourglass
import CountDownTimer from "helpers/CountDownTimer";
import {api, handleError} from "../../helpers/api";
import User from "../../models/User";

import {useHistory, useParams} from "react-router-dom";
import { Spinner } from "components/ui/Spinner";
import "styles/views/Lobby.scss";
import SelectDateAndTime from "../../helpers/SelectDateAndTime";
import moment from "moment/moment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import AddLocationForLobby from "../../helpers/AddLocationForLobby";


const generateTableData = (users) => {
  const tableData = [];

  // Calculate the number of columns needed based on the number of users
  const numColumns = users.length;

  // Generate table data for each column
  for (let i = 0; i < numColumns; i++) {
    const columnData = [];

    // Add header row with the user's playername
    columnData.push(users[i].playername);

    // Add row for Sports
    columnData.push(users[i].sports);

    // Add row for Time
    columnData.push(users[i].time);

    tableData.push(columnData);
  }

  return tableData;
};
const Lobby = () => {

  const history = useHistory(); // needed for linking
  const lobbyId = localStorage.getItem("lobbyId");
  const userId = localStorage.getItem("userId");

  const [lobby, setLobby] = useState([]);
  const [selectedSports, setSelectedSports] = React.useState([]);
  const handleSelectedSports = (sports) => {
    setSelectedSports(sports);
  };

  const timeleft = "350";

  const [open, setOpen] = useState(false); // state for the pop-up
  const urlRef = useRef(null); // ref for the URL input

  const handleCopyClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(urlRef.current.value);
    } else {
      urlRef.current.select();
      document.execCommand("copy");
    }
  };


  const [time, setTime] = useState(false); // state for the pop-up
  const [members, setMembers] = useState([]); // state for the pop-up

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/lobbies/"+lobbyId)
        setLobby(response.data);
        setMembers(response.data.memberDTOs);
        // console.log("request to:", response.request.responseURL);
        // console.log("status code:", response.status);
        // console.log("status text:", response.statusText);
        // console.log("requested data:", response.data);
        // console.log("memberDTO array:", response.data.memberDTOs[0].username);
        // console.log("members:",members);
        // console.log("lobby:",lobby);
      } catch (error) {
        alert(`Something went wrong during the login: \n${handleError(error)}`);
      }
    }
    fetchData(); // Make initial request immediately
    const intervalId = setInterval(fetchData, 1000); // Update data every second
    return () => clearInterval(intervalId); // Clear the interval when the component is unmounted
  }, []);


  const users = [
    { id: 1, playername: "John", sports: ["Basketball"], time: "15:30" },
    { id: 2, playername: "Alice", sports: ["Soccer", "Help"], time: "10:00" },
    { id: 3, playername: "Bob", sports: ["Tennis"], time: "12:45" },
    { id: 4, playername: "Jane", sports: ["Swimming"], time: "18:00" },
  ];

  const locations = ["Jurastrasse 10, 2558 Aegerten", "Luegislandstrasse 10, 8051 Zürich"];

  const [voting, setVoting] = useState(0);

  //TODO: when you vote then the value for that location should be increased by 1
  function handleVote(location) {
    // TODO: send the data to the backend
    setVoting(voting + 1);
    console.log(voting);
  }



    const handleLeaveLobby = async () => {
        try {
            const requestBody = JSON.stringify({userId});
            await api.put("/lobbies/" + lobbyId + "/leave", requestBody);

            history.push(`/Lobbies`);


        } catch (error) {
            alert(`Something went wrong during the leave of the lobby: \n${handleError(error)}`);
        }
    };



    return (
    <BaseContainer className="lobby">
      <div className="flex space-x-12">
        <div className="w-[100%]">
      {time}
      <Schedule />
      <CountDownTimer initialSeconds={timeleft} />

      <TableContainer className="table-container" component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography fontWeight="bold">Players</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Sports</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Time</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((user) => (
              <TableRow key={user.username}>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  {/*{user.sports}*/}
                  {user.userId == userId ? <MultipleSelectChip onSelectedSports={handleSelectedSports} memberId={user.memberId} /> :

                     user.selectedSports.map((sport) => (sport+", "))}
                </TableCell>
                <TableCell>
                  {/*{user.time}*/}
                  {/*<DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />*/}
                  {user.userId == userId ?   <SelectDateAndTime memberId={user.memberId}></SelectDateAndTime> :

                      user.selectedDates.map((time) => (<p>{moment(time).format("MMMM DD, YYYY h:mm A")}</p>))}
                  {/*{chosenDate.map((date) => (*/}
                  {/*    <div key={date} className="flex items-center space-x-2">*/}
                  {/*      <p className="flex-grow">{moment(date).format("MMMM DD, YYYY h:mm A")}</p>*/}
                  {/*      <IconButton*/}
                  {/*          aria-label="delete"*/}
                  {/*          onClick={() => removeDate(date)}*/}
                  {/*      >*/}
                  {/*        <ClearIcon />*/}
                  {/*      </IconButton>*/}
                  {/*    </div>*/}
                  {/*))}*/}
                </TableCell>
                <TableCell>
                  {" "}
                  <FormGroup>
                    {/*TO DO: check if the user.id I get from backend is the same id as in the local storage!
                    And then also check if it should be disabled or not depending on the choice of the user*/}
                    {user.userId == userId ? <FormControlLabel
                        control={<Switch />}
                        label="Lock your choice"
                    /> : <FormControlLabel disabled control={ <Switch />} label="Disabled " />}


                  </FormGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained" onClick={() => setOpen(true)}>
        Invite friends to lobby
      </Button>

      {/* pop-up */}
      <Dialog
        maxWidth="md"
        fullWidth
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>Copy Lobby URL</DialogTitle>
        <DialogContent>
          <input
            type="text"
            value={window.location.href}
            ref={urlRef}
            readOnly
            style={{ width: "100%", padding: "8px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCopyClick}>
            Copy
          </Button>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        variant="contained"
        color="error"
        onClick={() => handleLeaveLobby() }
      >
        Leave Lobby
      </Button>
          </div>

        <div className="w-[40%]">
          <AddLocationForLobby ></AddLocationForLobby>
          {locations.map((location) => (
              <div class="my-8" key={location}>
                <Badge badgeContent={voting} color="primary"> <Button variant="contained" onClick={()=> handleVote(location)}> Vote</Button> </Badge>
                &nbsp;&nbsp;{location} </div>
          ))}
        </div>
      </div>
    </BaseContainer>
  );
};

export default Lobby;
