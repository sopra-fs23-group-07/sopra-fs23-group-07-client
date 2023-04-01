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
import "styles/views/TestLobby.scss";
import MultipleSelectChip from "helpers/SelectSport";
import DateRangePicker from "helpers/SelectTime";
import {DatePicker} from "@mui/x-date-pickers";
import DateTimePicker from "helpers/SelectTime";

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
}
const TestLobby = () => {
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

    const users = [
        { playername: 'John', sports: 'Basketball', time: '15:30' },
        { playername: 'Alice', sports: 'Soccer', time: '10:00' },
        { playername: 'Bob', sports: 'Tennis', time: '12:45' },
        { playername: 'Jane', sports: 'Swimming', time: '18:00' },
    ];



    return (
        <BaseContainer className="lobby">
            <h1>Test Lobby</h1>

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
                                    <MultipleSelectChip />
                                </TableCell>
                                <TableCell>
                                    {/*{user.time}*/}
                                   <DateTimePicker />
                                </TableCell>
                                <TableCell> <FormGroup>
                                    <FormControlLabel control={<Switch />} label="Lock your choice" />
                                    {/*<FormControlLabel disabled control={<Switch />} label="Disabled" />*/}
                                </FormGroup></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Button variant="contained" onClick={() => setOpen(true)}>Invite friends to lobby</Button>

            {/* pop-up */}
            <Dialog  maxWidth="md" fullWidth open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Copy Lobby URL</DialogTitle>
                <DialogContent>
                    <input type="text" value={window.location.href} ref={urlRef} readOnly style={{ width: '100%', padding: '8px' }} />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleCopyClick}>Copy</Button>
                    <Button variant="contained" onClick={() => setOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
            <Button variant="contained" color="error"
                    onClick={() => history.push(`/Lobbies`)}>
                Leave Lobby
            </Button>

        </BaseContainer>
    );
};

export default TestLobby;