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
import "styles/views/Event.scss";
import Schedule from "@mui/icons-material/Schedule"; // Alternative icons could be AccessAlarm, Timer, Hourglass
import {api, handleError} from "../../helpers/api";
import {useHistory, useParams} from "react-router-dom";
import { Spinner } from "components/ui/Spinner";
import AddLocation from "../../helpers/AddLocation";


const Event = () => {

    const history = useHistory(); // needed for linking
    const eventId = useParams().eventId;

    const [event, setEvent] = useState([]);

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


    useEffect(()=> {
        const fetchData = async () => {
            try{
                const response = await api.get("/events/"+eventId)

                setEvent(response.data);

                console.log("request to:", response.request.responseURL);
                console.log("status code:", response.status);
                console.log("status text:", response.statusText);
                console.log("requested data:", response.data);
                console.log(response);

            } catch (error){
                console.error(
                    `Something went wrong while fetching the event: \n${handleError(
                        error
                    )}`
                );
            }
        };
        fetchData()
    }, [eventId])

    return (
        <BaseContainer className="event">
            <h1>Event Details</h1>
            <div className="flex space-x-12">
                <div className="w-[50%]">
                    <TableContainer className="table-container" component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography fontWeight="bold">Event Name</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{event.eventName}</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography fontWeight="bold">Sport</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{event.eventSport}</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography fontWeight="bold">Date</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{event.eventDate}</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography fontWeight="bold">Region</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{event.eventRegion}</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography fontWeight="bold">Location</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{event.eventLocation}</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography fontWeight="bold">Participants</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>1/{event.eventMaxParticipants}</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>

                <div className="w-[40%]">
                   <AddLocation/>
                </div>
            </div>
            <div className="w-[100%]">
                <div className="event button-container">
                    <div>
                    <Button variant="contained" color="success" size ="large" className="event button"
                            >
                        Join
                    </Button>

                    <Button variant="contained" color="error" size ="large" className="event button" disabled
                        >
                        Leave
                    </Button>
                    </div>

                <Button variant="contained"
                        onClick={() => setOpen(true)}>
                    Share Event with your Friends!
                </Button>
            </div>
            </div>
            {/* pop-up */}
            <Dialog
                maxWidth="md"
                fullWidth
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>Copy Event URL</DialogTitle>
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
        </BaseContainer>
    );
};

export default Event;
