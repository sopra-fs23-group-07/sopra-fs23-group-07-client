import React, { useRef, useState, useEffect } from "react";
import BaseContainer from "components/ui/BaseContainer";
import { useHistory } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TableHead,
  Typography
} from "@mui/material";
import "styles/views/Events.scss";
import Schedule from "@mui/icons-material/Schedule"; // Alternative icons could be AccessAlarm, Timer, Hourglass
import AddLocation from "helpers/AddLocation";
import {api, handleError} from 'helpers/api';
import { async } from "q";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const generateTableData = (events) => {
  const tableData = [];

  // Calculate the number of columns needed based on the number of users
  const numColumns = events.length;

  // Generate table data for each column
  for (let i = 0; i < numColumns; i++) {
    const columnData = [];

    // Add header row with the user's playername
    columnData.push(events[i].eventname);

    // Add row for Sports
    columnData.push(users[i].canton);

    // Add row for Time
    columnData.push(users[i].sport);

    columnData.push(users[i].numPlayers);

    columnData.push(users[i].date);

    columnData.push(users[i].time);

    tableData.push(columnData);
  }

  return tableData;
};

const Events = () => {
  const history = useHistory();

  const urlRef = useRef(null); // ref for the URL input
  const [events, setEvents] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/events`);

        setEvents(response.data);

        console.log('request to:', response.request.responseURL);
        console.log('status code:', response.status);
        console.log('status text:', response.statusText);
        console.log('requested data:', response.data);

        console.log(response);
      } catch (error) {
        console.error(`Something went wrong while fetching the event: \n${handleError(error)}`);
        console.error("Details:", error);
        alert("Something went wrong while fetching the events! See the console for details.");
      }
    }

    fetchData();
  }, []);

  const handleCopyClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(urlRef.current.value);
    } else {
      urlRef.current.select();
      document.execCommand("copy");
    }
  };

  const handleViewEventClick = (eventId) => {
    history.push("/Events/" + String(eventId));
  };

  // const GetSportEvents = async () => {
  //   try {
  //     sportEvents = await api.get(`/events`);
  //   } catch (error) {
  //     alert(
  //       `Something went wrong while fetching events: \n${handleError(error)}`
  //     );
  //   }
  // };


  return (
    <BaseContainer className="lobby">
      <h1>Events</h1>
      <div className="flex space-x-12">
        <div className="w-[60%]">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight="bold">Event name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Canton</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Sport</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Number of users</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Date</Typography>
                  </TableCell>
                  <TableCell>
                    <Schedule/>
                  </TableCell>
                  <TableCell/>
                </TableRow>
              </TableHead>
              <TableBody>

                {events && events.map((event) => {
                  const dateString = event.eventDate;
                  const date = new Date(dateString);
                  const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
                  return (
                      <TableRow key={event.eventName}>
                        <TableCell>{event.eventName}</TableCell>
                        <TableCell>{event.eventRegion}</TableCell>
                        <TableCell>{event.eventSport}</TableCell>
                        <TableCell>{event.eventMaxParticipants}</TableCell>
                        <TableCell>{formattedDate}</TableCell>
                        <TableCell>{"13min"}</TableCell>
                        <TableCell>
                          <Button
                              onClick={() => handleViewEventClick(event.eventId)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {/*<div className="w-[40%] ">*/}
        {/*  {events &&  <AddLocation events_passed={events} /> }*/}
        {/*</div>*/}
      </div>
    </BaseContainer>
  );
};

export default Events;
