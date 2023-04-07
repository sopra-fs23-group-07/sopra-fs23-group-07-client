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
import AddLocation from "../../helpers/AddLocation";

import {useHistory, useParams} from "react-router-dom";
import { Spinner } from "components/ui/Spinner";
import "styles/views/Lobby.scss";


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

  const [lobby, setLobby] = useState([]);

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
  // useEffect(() => {
  //   const intervalId = setInterval(async () => {
  //     try {
  //       const response = await api.get("/testlive");
  //       setTime(response.data);
  //       console.log("time: " + time);
  //       // do something with time
  //     } catch (error) {
  //       alert(`Something went wrong during the login: \n${handleError(error)}`);
  //     }
  //   }, 1000);
  //
  //   // Clear the interval when the component is unmounted
  //   return () => clearInterval(intervalId);
  // }, []);


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

  useEffect(()=> {
      const fetchData = async () => {
          try{
              const response = await api.get("/lobbies/"+lobbyId)

              setLobby(response.data);

              console.log("request to:", response.request.responseURL);
              console.log("status code:", response.status);
              console.log("status text:", response.statusText);
              console.log("requested data:", response.data);
              console.log(response);

          } catch (error){
              console.error(
                  `Something went wrong while fetching the lobby: \n${handleError(
                      error
                  )}`
              );
          }
      };
      fetchData()
  }, [lobbyId])

  return (
    <BaseContainer className="lobby">
      <div className="flex space-x-12">
        <div className="w-[70%]">
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
            {users.map((user) => (
              <TableRow key={user.playername}>
                <TableCell>{user.playername}</TableCell>
                <TableCell>
                  {/*{user.sports}*/}
                  {user.id === 1 ? <MultipleSelectChip /> :

                     user.sports.map((sport) => (sport+", "))}
                </TableCell>
                <TableCell>
                  {/*{user.time}*/}
                  <DateTimePicker />
                </TableCell>
                <TableCell>
                  {" "}
                  <FormGroup>
                    {/*TO DO: check if the user.id I get from backend is the same id as in the local storage!
                    And then also check if it should be disabled or not depending on the choice of the user*/}
                    {user.id === 1 ? <FormControlLabel
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
        onClick={() => history.push(`/Lobbies`)}
      >
        Leave Lobby
      </Button>
          </div>

        <div className="w-[40%]">
          <AddLocation ></AddLocation>
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
