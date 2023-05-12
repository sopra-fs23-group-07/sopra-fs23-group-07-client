import React from "react";
import IconButton from "@mui/material/IconButton";
import PreviewIcon from "@mui/icons-material/Preview";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useHistory } from "react-router-dom";

export const RenderActions = (props) => {
    const history = useHistory();
    const [flyToLocation, setFlyToLocation] = React.useState(null);

    const { hasFocus, id, eventLocationLatitude, eventLocationLongitude } = props;
    const buttonElement1 = React.useRef(null);
    const buttonElement2 = React.useRef(null);
    const rippleRef1 = React.useRef(null);
    const rippleRef2 = React.useRef(null);

    React.useLayoutEffect(() => {
        if (hasFocus) {
            const input = buttonElement1.current?.querySelector('input');
            input?.focus();
        } else if (rippleRef1.current) {
            // Only available in @mui/material v5.4.1 or later
            rippleRef1.current.stop({});
        }
    }, [hasFocus]);
    const handleViewEventClick = (id) => {
        history.push("/Events/" + String(id));
    };
    const handleFlyToLocationClick = (latitude, longitude) => {
        setFlyToLocation({
            latitude: eventLocationLatitude,
            longitude: eventLocationLongitude,
        });
    };

    React.useEffect(() => {
        if (flyToLocation) {
            // perform some action based on the flyToLocation state
            // for example, you can use a library like mapbox-gl to fly to the location
            console.log(flyToLocation);
        }
    }, [flyToLocation]);

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
                tabIndex={hasFocus ? 0 : -1}
                onKeyDown={(event) => {
                    if (event.key === " ") {
                        // Prevent key navigation when focus is on button
                        event.stopPropagation();
                    }
                }}
                onClick={handleViewEventClick(id)}
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
                tabIndex={hasFocus ? 0 : -1}
                onKeyDown={(event) => {
                    if (event.key === " ") {
                        // Prevent key navigation when focus is on button
                        event.stopPropagation();
                    }
                }}
                onClick={handleFlyToLocationClick(eventLocationLatitude, eventLocationLongitude )}
            >
                <LocationOnIcon />
            </IconButton>
        </>
    );
};

//
// export const RenderActions = (props) => {
//     const history = useHistory();
//
//     const {hasFocus, value} = props;
//     const buttonElement = React.useRef(null);
//     const rippleRef = React.useRef(null);
//
//     React.useLayoutEffect(() => {
//         if (hasFocus) {
//             const input = buttonElement.current?.querySelector('input');
//             input?.focus();
//         } else if (rippleRef.current) {
//             // Only available in @mui/material v5.4.1 or later
//             rippleRef.current.stop({});
//         }
//     }, [hasFocus]);
//
//     return (
//         <>
//             <IconButton
//                 color="primary"
//                 component="button"
//                 ref={buttonElement}
//                 touchRippleRef={rippleRef}
//                 variant="contained"
//                 size="small"
//                 style={{marginLeft: 10}}
//                 // Remove button from tab sequence when cell does not have focus
//                 tabIndex={hasFocus ? 0 : -1}
//                 onKeyDown={(event) => {
//                     if (event.key === ' ') {
//                         // Prevent key navigation when focus is on button
//                         event.stopPropagation();
//                     }
//                 }}
//                 onClick={() => history.push("/Events/1")}
//             >
//                 <PreviewIcon/>
//             </IconButton>
//             <IconButton
//                 color="primary"
//                 component="button"
//                 ref={buttonElement}
//                 touchRippleRef={rippleRef}
//                 variant="contained"
//                 size="small"
//                 style={{marginLeft: 16}}
//                 // Remove button from tab sequence when cell does not have focus
//                 tabIndex={hasFocus ? 0 : -1}
//                 onKeyDown={(event) => {
//                     if (event.key === ' ') {
//                         // Prevent key navigation when focus is on button
//                         event.stopPropagation();
//                     }
//                 }}
//
//                 // onClick={() => {
//                 //                    setFlyToLocation({
//                 //                      latitude: event.eventLocationDTO.latitude,
//                 //                      longitude: event.eventLocationDTO.longitude,
//                 //                    });
//                 //                   }}
//             >
//                 <LocationOnIcon/>
//             </IconButton>
//         </>
//     );
// }
