import React from "react";
import IconButton from "@mui/material/IconButton";
import PreviewIcon from "@mui/icons-material/Preview";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useHistory } from "react-router-dom";

export const RenderActions = (props) => {
    const history = useHistory();

    // const { hasFocus } = props;
    const buttonElement1 = React.useRef(null);
    const buttonElement2 = React.useRef(null);
    const rippleRef1 = React.useRef(null);
    const rippleRef2 = React.useRef(null);

    const latitude = props.latitude;
    const longitude = props.longitude;
    const setFlyToLocation = props.setFlyToLocation;
    const eventId = props.eventId;

    const handleViewEventClick = (eventId) => {
        history.push("/Events/" + String(eventId));
    };


    return (
        <>
            <IconButton
                color="primary"
                component="button"
                ref={buttonElement1}
                touchRippleRef={rippleRef1}
                variant="contained"
                size="small"
                style={{ marginLeft: 10 }}
                // Remove button from tab sequence when cell does not have focus
                // tabIndex={hasFocus ? 0 : -1}
                onKeyDown={(event) => {
                    if (event.key === " ") {
                        // Prevent key navigation when focus is on button
                        event.stopPropagation();
                    }
                }}
                onClick={() => handleViewEventClick(eventId)}
            >
                <PreviewIcon />
            </IconButton>
            <IconButton
                color="primary"
                component="button"
                ref={buttonElement2}
                touchRippleRef={rippleRef2}
                variant="contained"
                size="small"
                style={{ marginLeft: 16 }}
                // Remove button from tab sequence when cell does not have focus
                // tabIndex={hasFocus ? 0 : -1}
                onKeyDown={(event) => {
                    if (event.key === " ") {
                        // Prevent key navigation when focus is on button
                        event.stopPropagation();
                    }
                }}
                onClick={() => {
                    if (!isNaN(latitude) && !isNaN(longitude)) {
                        setFlyToLocation({latitude, longitude});
                    } else {
                        console.log('Invalid latitude or longitude:', latitude, longitude);
                    }
                }}
            >
                <LocationOnIcon />
            </IconButton>
        </>
    );
};
