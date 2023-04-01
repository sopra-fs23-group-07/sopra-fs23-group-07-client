import React, {useRef, useState} from "react";
import BaseContainer from "components/ui/BaseContainer";
import { useHistory } from "react-router-dom";
import {
    Button,
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
    Switch, FormControlLabel, FormGroup
} from '@mui/material';
import "styles/views/Events.scss";
import AddLocation from "helpers/AddLocation";

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
}

const Events = () => {
    const history = useHistory();

    const [open, setOpen] = useState(false); // state for the pop-up
    const urlRef = useRef(null); // ref for the URL input

    const handleCopyClick = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(urlRef.current.value);
        } else {
            urlRef.current.select();
            document.execCommand('copy');
        }
    };

    const sportEvents = [
        {
            eventname: "Lausanne Marathon",
            canton: "Vaud",
            sport: "Running",
            numPlayers: "7/10",
            date: "October 16, 2023",
            time: "9:00"
        },
        {
            eventname: "Swiss Basketball Cup Final",
            canton: "Fribourg",
            sport: "Basketball",
            numPlayers: "4/5",
            date: "March 5, 2024",
            time: "20:00"
        },
        {
            eventname: "Zurich International Chess Festival",
            canton: "Zurich",
            sport: "Chess",
            numPlayers: "1/2",
            date: "August 14, 2024",
            time: "14:30"
        }
    ];



    return (
        <BaseContainer className="lobby">
            <h1>Events</h1>
            <div className="table-map-container">
                <div className="table-container">
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
                                        <Typography fontWeight="bold">Time</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sportEvents.map((sportEvent) => (
                                    <TableRow key={sportEvent.eventname}>
                                        <TableCell>{sportEvent.eventname}</TableCell>
                                        <TableCell>{sportEvent.canton}</TableCell>
                                        <TableCell>{sportEvent.sport}</TableCell>
                                        <TableCell>{sportEvent.numPlayers}</TableCell>
                                        <TableCell>{sportEvent.date}</TableCell>
                                        <TableCell>{sportEvent.time}</TableCell>
                                        <TableCell><Button>View</Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className="map-container">
                    <AddLocation />
                </div>
            </div>
        </BaseContainer>
    );

};


export default Events;