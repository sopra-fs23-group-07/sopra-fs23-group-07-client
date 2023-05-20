// // Only for styling

import {
  Button,
  Box,
  Container,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Grid,
  Paper,
  FormGroup,
  FormControlLabel,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  urlRef,
  AppBar,
  Toolbar,
  TextField,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { MyButton } from "./MyButton";
import BaseContainer from "components/ui/BaseContainer";
import { CustomHeading } from "./CustomHeading";
import { CustomGrid } from "./CustomGrid";
import InfoIcon from "@mui/icons-material/Info";

// import HourglassTopOutlinedIcon from "@mui/icons-material/HourglassTopOutlined";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { styled } from "@mui/system";
// import { api, handleError } from "../../helpers/api";
// import { useParams } from "react-router-dom";
// import AddLocation from "../../helpers/AddLocation";
// import moment from "moment";
// import LaunchIcon from "@mui/icons-material/Launch";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import { toast } from "react-toastify";
// import background1 from "../../background1.jpg";
// import soccer from "../../soccer.jpg";

// import { useState } from "react";

//   // let buttonSize = "30px";
//   // let componentSize = "800px";
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleChat = () => {
//     setIsOpen(!isOpen);
//   };

// // test new layout
// export default function ResponsiveLayout() {
//   return (
//     <>
// {/* Chat test */}
// <Box
//       sx={{
//         position: "fixed",
//         bottom: 16,
//         right: 16,
//         zIndex: 999,
//         backgroundColor: "white",
//         borderRadius: "4px",
//         boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",
//         width: componentSize,
//         height: componentSize,
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       <Button
//         sx={{
//           alignSelf: "flex-end",
//           marginRight: "8px",
//           marginTop: "8px",
//         }}
//         onClick={toggleChat}
//       >
//         Toggle
//       </Button>

//       <Box
//         sx={{
//           backgroundColor: "red",
//           flexGrow: 1,
//           marginBottom: "8px",
//         }}
//       >
//         {/* Bottom Left Component */}
//       </Box>

//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//         }}
//       >
//         <Box
//           sx={{
//             backgroundColor: "blue",
//             width: buttonSize,
//             height: "100%",
//             marginRight: "8px",
//           }}
//         >
//           {/* Left Button */}
//         </Box>
//         <Box
//           sx={{
//             backgroundColor: "green",
//             width: "calc(100% - 2 * buttonSize - 8px)",
//             height: "100%",
//             marginRight: "8px",
//           }}
//         >
//           {/* Top Left Component */}
//         </Box>
//         <Box
//           sx={{
//             backgroundColor: "yellow",
//             width: buttonSize,
//             height: "100%",
//           }}
//         >
//           {/* Right Button */}
//         </Box>
//       </Box>
//     </Box>

//       {/* final version */}
//       <BaseContainer>
//         {/* white box */}
//         <Box
//           sx={{
//             backgroundColor: "rgba(255, 255, 255, 0.7)",
//             borderRadius: "20px",
//             padding: 4,
//             display: "flex",
//             justifyContent: "space-between",
//             gap: 4,
//           }}
//         >
//           {/* Table Box */}
//           <Box
//             sx={{ flexGrow: 1, boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.7)" }}
//           >
//             {/* Table */}
//             <Table sx={{ minWidth: 300, background: "white" }}>
//               <TableHead>
//                 <TableRow>{/* Add table header cells here */}</TableRow>
//               </TableHead>
//               <TableBody>
//                 {/* Placeholder rows */}
//                 {Array.from(Array(6).keys()).map((index) => (
//                   <TableRow key={index}>
//                     <TableCell>Placeholder</TableCell>
//                     <TableCell>Placeholder</TableCell>
//                     <TableCell>Placeholder</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Box>
//           <Box
//             sx={{
//               width: "30%",
//               boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",
//               background: "brown",
//             }}
//           >
//             Map
//           </Box>
//         </Box>
//       </BaseContainer>

//       {/* Current version MyEvents */}
//       <BaseContainer>
//         {/* Visible Box */}
//         <Grid
//           container
//           sx={{
//             backgroundColor: "rgba(255, 255, 255, 0.7)",
//             borderRadius: "20px",
//             padding: 4,
//             display: "flex",
//             justifyContent: "space-between",
//             gap: 4,
//             minHeight: "400px",
//             // minWidth: "800px",
//             // flexDirection: {
//             //   xs: 'column', // stack vertically on small screens
//             //   sm: 'row', // stack horizontally on medium screens and larger
//             // },
//           }}
//         >

//           {/* Table Box */}
//           <Grid
//             item
//             sx={{
//               flexGrow: 1,
//               boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",
//             }}
//           >
//             {/* Table */}
//             <Table
//               sx={{
//                 background: "white",
//                 minHeight: "100%",
//                 borderCollapse: "separate",
//                 borderSpacing: "0 16px",
//                 // border: "2px solid black"
//               }}
//             >
//               <TableHead>
//                 <TableRow>{/* Add table header cells here */}</TableRow>
//               </TableHead>
//               <TableBody>
//                 {/* Placeholder rows */}
//                 {Array.from(Array(6).keys()).map((index) => (
//                   <TableRow
//                     key={index}
//                     sx={{
//                       // borderColor: "black", // doesn't work
//                       // borderWidth: 3, // doesn't work
//                       // borderStyle: "solid", // doesn't work
//                       // background: "lightblue", // works

//                       "& td, & th": {
//                         background: "rgba(165, 109, 201, 0.1)",
//                         borderTop: "2px black solid", // works
//                         borderBottom: "2px black solid", // works
//                       },
//                     }}
//                   >
//                     <TableCell>Placeholder</TableCell>
//                     <TableCell>Placeholder</TableCell>
//                     <TableCell>Placeholder</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>

//             {/* Map */}
//             <Grid
//               item
//               sx={{
//                 // width: { md: "30%", xs: "100%" },
//                 // maxHeight: "500px",
//                 width: "30%",
//                 boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",
//                 position: "relative",
//               }}
//             >
//               Map
//             </Grid>
//           </Grid>
//         </Grid>
//       </BaseContainer>

//       {/* New version */}
//       <BaseContainer bgcolor={"red"}>
//         <Grid container bgcolor={"yellow"} mt={2} spacing={2}>
//           <Grid
//             item
//             xs={12}
//             bgcolor={"lightblue"}
//             width={"100px"}
//             height={"100px"}
//           >
//             H
//           </Grid>
//           <Grid item bgcolor={"navy"} width={"100px"} height={"100px"}>
//             e
//           </Grid>
//         </Grid>
//       </BaseContainer>
//     </>
//   );
// }

// <BaseContainer>
// {" "}
// <Box sx={{ backgroundColor: "#F0F0F0", padding: 2, mt: 4 }}>
//   <Box sx={{ border: "1px solid #000000", padding: 2 }}>
//     <Grid container spacing={2}>
//       <Grid item xs={12} md={12} sx={{ backgroundColor: "yellow" }}>
//         <TableContainer>
//           <Table
//             sx={{ borderCollapse: "separate", borderSpacing: "0 8px" }} // sacing
//           >
//             <TableHead>
//               <TableRow
//                 sx={
//                   {
//                     // borderBottom: "3px solid green", // doesn't work
//                     // background: "red", // works
//                   }
//                 }
//               >
//                 <TableCell style={{ minWidth: 100, width: "15%" }}>
//                   Player
//                 </TableCell>
//                 <TableCell style={{ minWidth: 200, width: "30%" }}>
//                   Sport
//                 </TableCell>
//                 <TableCell style={{ minWidth: 150, width: "20%" }}>
//                   Time
//                 </TableCell>
//                 <TableCell style={{ minWidth: 80, width: "15%" }}>
//                   13:37
//                 </TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody
//               sx={{
//                 "& > .MuiTableRow-root": {
//                   // border: "3px solid black",
//                   // borderWidth: "2px 2px 2px 2px",
//                   // background: "red",
//                 },
//               }}
//             >
//               {/* Placeholder rows */}
//               {Array.from(Array(6).keys()).map((index) => (
//                 <TableRow
//                   key={index}
//                   sx={{
//                     "& td, & th": {
//                       // padding: "8px",
//                       background: "lightblue", // works
//                       borderTop: "3px black solid", // works
//                       borderBottom: "3px black solid", // works
//                     },
//                   }}
//                 >
//                   <TableCell
//                     sx={{
//                       whiteSpace: "nowrap",
//                       borderLeft: "3px black solid", // works
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                       // sx={{
//                       //                       // "& TableCell": { background: "green" },
//                       //                       "&& .MuiTableCell-root": {
//                       //                         backgroundColor: "yellow",
//                       //                         fontWeight: "bold",
//                       //                         alignItems: "flex-start",
//                       //                         justifyContent: "right",
//                       //                       },
//                     }}
//                   >
//                     Placeholder Placeholder Placeholder Placeholder
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       whiteSpace: "nowrap",
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                     }}
//                   >
//                     Placeholder Placeholder Placeholder Placeholder
//                     Placeholder Placeholder
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       // border: "1px black solid",
//                       // borderWeight: "0px 3px 0px 0px",
//                       // borderTop: "3px black solid", // works
//                       // borderBottom: "3px black solid", // works
//                       whiteSpace: "nowrap",
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                     }}
//                   >
//                     Placeholder Placeholder Placeholder Placeholder
//                     Placeholder
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       whiteSpace: "nowrap",
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                     }}
//                   >
//                     Placeholder Placeholder
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Grid>
//     </Grid>
//   </Box>
// </Box>
// </BaseContainer>

// bs event not working
// export default function ResponsiveLayout() {
//   return (
//     <BaseContainer className="event">
//       <Grid
//         container
//         spacing={2}
//         direction="row"
//         justifyContent="center"
//         alignItems="center"
//       >
//         {/* Title */}
//         <Grid item xs={12}>
//           <Typography variant="h2">Event Details</Typography>
//         </Grid>

//         {/* Table */}
//         <Grid item xs={12} md={8}>
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   {/* Table cells usefull */}
//                   <TableCell sx={{ minWidth: 100, width: "15%" }}>
//                     Player
//                   </TableCell>
//                   <TableCell sx={{ minWidth: 200, width: "30%" }}>
//                     Sport
//                   </TableCell>
//                   <TableCell sx={{ minWidth: 150, width: "20%" }}>
//                     Time
//                   </TableCell>
//                   <TableCell sx={{ minWidth: 80, width: "15%" }}>
//                     13:37
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {/* Placeholder rows */}
//                 {Array.from(Array(6).keys()).map((index) => (
//                   <TableRow key={index}>
//                     <TableCell>Placeholder</TableCell>
//                     <TableCell>Placeholder</TableCell>
//                     <TableCell>Placeholder</TableCell>
//                     <TableCell>Placeholder</TableCell>{" "}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           {/* <TableContainer className="table-container" component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>
//                     <Typography fontWeight="bold">Event Name</Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography>{event.eventName}</Typography>
//                   </TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>
//                     <Typography fontWeight="bold">Sport</Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography>{event.eventSport}</Typography>
//                   </TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>
//                     <Typography fontWeight="bold">Date</Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography>
//                       {moment(event.eventDate).format("MMMM DD, YYYY h:mm A")}
//                     </Typography>
//                   </TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>
//                     <Typography fontWeight="bold">Region</Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography>{event.eventRegion}</Typography>
//                   </TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>
//                     <Typography fontWeight="bold">Location</Typography>
//                   </TableCell>
//                   <TableCell>
//                     {event && event.eventLocationDTO && (
//                       <Typography>{event.eventLocationDTO.address}</Typography>
//                     )}
//                   </TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>
//                     <Typography fontWeight="bold">Participants</Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography fontWeight={"bold"}>
//                       {event.eventParticipantsCount}/
//                       {event.eventMaxParticipants}
//                     </Typography>
//                     {event.participantDTOs &&
//                       event.participantDTOs.map((participantDTO) => (
//                         <Typography>
//                           <Link
//                             href={`/Profile/${participantDTO.userId}`}
//                             target={"_blank"}
//                             title={"This opens the profile page in a new tab"}
//                           >
//                             <LaunchIcon fontSize={"inherit"} />
//                             {participantDTO.username}
//                           </Link>
//                         </Typography>
//                       ))}
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody></TableBody>
//             </Table>
//           </TableContainer> */}
//         </Grid>
//         {/* Map */}
//         <Grid item xs={12} md={4}>
//           {/* {
//           eventLocationDTO = {
//             "address": "Schneekasten 3, 5704 Egliswil, Switzerland",
//             "longitude": 8.181561751056591,
//             "latitude": 47.36132136995943
//         };
//         eventLocationDTO && (
//             <AddLocation
//               eventLocationDTO={eventLocationDTO}
//               EventPage={false}
//             />
//           )} */}
//           MAP
//         </Grid>

//         {/* Buttons */}
//         <Grid container xs={7} md={7} direction="row" justifyContent={"center"}>
//           <Button
//             variant="contained"
//             color="success"
//             size="large"
//             className="event button"
//             // onClick={() => handleJoinEvent()}
//             // disabled={isParticipant || event.eventParticipantsCount === event.eventMaxParticipants}
//           >
//             Join
//           </Button>
//           <Button
//             variant="contained"
//             color="error"
//             size="large"
//             className="event button"
//             // onClick={() => handleLeaveEvent()}
//             // disabled={!isParticipant}
//           >
//             Leave
//           </Button>
//         </Grid>

//         {/* Pop up */}
//         <Grid container xs={5} md={5} direction="row" justifyContent="center">
//           <Button variant="contained" onClick={() => setOpen(true)}>
//             Share Event with your Friends!
//           </Button>
//           {/* pop-up */}
//           <Dialog
//             maxWidth="md"
//             fullWidth
//             open={open}
//             onClose={() => setOpen(false)}
//           >
//             <DialogTitle>Copy Event URL</DialogTitle>
//             <DialogContent>
//               <input
//                 type="text"
//                 value={window.location.href}
//                 ref={urlRef}
//                 readOnly
//                 style={{ width: "100%", padding: "8px" }}
//               />
//             </DialogContent>
//             <DialogActions>
//               <Button
//                 variant="contained"
//                 onClick={handleCopyClick}
//                 color={isCopied ? "success" : "primary"}
//                 startIcon={isCopied ? <ContentCopyIcon /> : null}
//               >
//                 {isCopied ? "Copied" : "Copy"}
//               </Button>
//               <Button variant="contained" onClick={() => setOpen(false)}>
//                 Close
//               </Button>
//             </DialogActions>
//           </Dialog>
//         </Grid>
//       </Grid>
//     </BaseContainer>
//   );
// }

// Lobby page layout - ...
// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   borderColor: "black",
//   borderWidth: 1,
//   borderStyle: "solid",
//   // wordWrap: "break-word",
//   // maxWidth: 0,
//   // overflow: "hidden",
//   // textOverflow: "ellipsis",

//   // wrapping good, border bad

//   whiteSpace: "normal",
//   wordWrap: "break-word",
// }));

// const Layout = () => {
//   return (
//     <BaseContainer>
//       <Grid container>
//         <Grid item xs={6} sx={{ backgroundColor: "red" }}>
//           Lobby Name
//         </Grid>
//         <Grid
//           item
//           xs={6}
//           sx={{
//             display: "flex",
//             justifyContent: "flex-end",
//             backgroundColor: "green",
//           }}
//         >
//           Inivte Button
//         </Grid>
//       </Grid>

//       <Box sx={{ backgroundColor: "blue", padding: "20px" }}>
//         <Grid container>
//           {/* Table */}
//           <Grid
//             item
//             xs={8}
//             // sx={{ alignItems: "center", backgroundColor: "yellow" }}
//           >
//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     {/* Table cells usefull */}
//                     <StyledTableCell sx={{ minWidth: 100, width: "15%" }}>
//                       Player
//                     </StyledTableCell>
//                     <StyledTableCell sx={{ minWidth: 200, width: "30%" }}>
//                       Sport
//                     </StyledTableCell>
//                     <StyledTableCell sx={{ minWidth: 150, width: "20%" }}>
//                       Time
//                     </StyledTableCell>
//                     <StyledTableCell sx={{ minWidth: 80, width: "15%" }}>
//                       13:37
//                     </StyledTableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {/* Placeholder rows */}
//                   {Array.from(Array(6).keys()).map((index) => (
//                     <TableRow key={index}>
//                       <StyledTableCell>
//                         Placeholder Placeholder Placeholder Placeholder
//                       </StyledTableCell>
//                       <StyledTableCell>
//                         Placeholder Placeholder Placeholder Placeholder
//                       </StyledTableCell>
//                       <StyledTableCell>
//                         Placeholder Placeholder Placeholder Placeholder
//                       </StyledTableCell>
//                       <StyledTableCell>
//                         Placeholder Placeholder Placeholder Placeholder
//                       </StyledTableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Grid>

//           {/* Location */}
//           <Grid item xs={4} sx={{ backgroundColor: "orange" }}>
//             {/* padding for all children? */}
//             <Grid
//               item
//               sx={{
//                 marginBottom: "20px",
//                 padding: "5px",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 backgroundColor: "purple",
//               }}
//             >
//               <Typography>Location (Centered)</Typography>
//             </Grid>
//             <Grid
//               item
//               sx={{
//                 display: "flex",
//                 justifyContent: "left",
//                 backgroundColor: "pink",
//               }}
//             >
//               Region (Aligned Left)
//             </Grid>
//             <Grid
//               item
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 height: "300px",
//                 backgroundColor: "lightblue",
//               }}
//             >
//               Map (Centered)
//             </Grid>
//             <Grid
//               item
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 height: "100px",
//                 backgroundColor: "lightgreen",
//               }}
//             >
//               Confirm Location (Centered)
//             </Grid>
//             <Grid
//               item
//               xs={4}
//               sx={{
//                 display: "flex",
//                 justifyContent: "left",
//                 height: "50px",
//                 backgroundColor: "lightpink",
//               }}
//             >
//               Vote (Aligned Left)
//             </Grid>
//           </Grid>
//         </Grid>
//       </Box>

//       <Grid
//         container
//         direction="column"
//         justifyContent="center"
//         sx={{ backgroundColor: "lightgray" }}
//       >
//         <Grid
//           item
//           xs={4}
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             backgroundColor: "teal",
//           }}
//         >
//           <Button variant="contained" sx={{ width: "fit-content" }}>
//             Leave (Centered)
//           </Button>
//         </Grid>
//         <Grid item xs={4} sx={{ backgroundColor: "coral" }}>
//           Tutorial 1 (Centered)
//         </Grid>
//         <Grid item xs={4} sx={{ backgroundColor: "lime" }}>
//           Tutorial 2 (Centered)
//         </Grid>
//       </Grid>

//       {/* Chat */}
//       <Grid
//         container
//         sx={{
//           position: "absolute",
//           bottom: "0",
//           left: "0",
//           backgroundColor: "brown",
//         }}
//       >
//         <Grid
//           item
//           sx={{
//             width: "fit-content",
//             backgroundColor: "darkcyan",
//             color: "white",
//           }}
//         >
//           Chat (Bottom Left)
//         </Grid>
//       </Grid>
//     </BaseContainer>
//   );
// };

// export default Layout;

// const Layout = () => {
//   return (
//     <>
//       <BaseContainer>
//         {/* Title */}
//         <Grid container sx={{ marginBottom: 2 }}>
//           <Grid item xs={12} sm={8}>
//             <Typography
//               variant="h3"
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "left",
//                 marginLeft: 2, // adaptive to table
//                 color: "white",
//               }}
//             >
//               Lobby: dummyName {/* real code missing */}
//             </Typography>
//           </Grid>
//           <Grid
//             item
//             xs={12}
//             sm={4}
//             sx={{
//               display: "flex",
//               justifyContent: "flex-end",
//               // backgroundColor: "green",
//               paddingRight: 4, // adaptive to table
//             }}
//           >
//             {/* real code missing */}
//             <Button variant="contained">Invite friends</Button>
//           </Grid>
//         </Grid>

//         {/* Visible Box */}
//         <Box container sx={{ backgroundColor: "blue", padding: 2 }}>
//           <Grid container spacing={2} flexDirection={{ xs: "row", sm: "column" }} sx={{ backgroundColor: "cyan" }}>
//             {/* Table */}
//             <Grid
//               container
//               item
//               sm={12}
//               md={8}
//               sx={{
//                 display: "flex",
//                 alignItems: "top",
//               }}
//             >
//               <TableContainer
//                 sx={{
//                   // border: "solid 2px black",
//                   background: "pink",
//                 }}
//               >
//                 <Table>
//                   {/* Table Head */}
//                   <TableHead>
//                     <TableRow
//                       sx={{
//                         alignItems: "center",
//                         borderBottom: "solid 2px black",
//                       }}
//                     >
//                       <TableCell
//                         width={"25%"}
//                         sx={{ borderRight: "solid 2px red" }}
//                       >
//                         <Typography variant="h6">Players</Typography>
//                       </TableCell>
//                       <TableCell
//                         width={"25%"}
//                         sx={{ borderRight: "solid 2px red" }}
//                       >
//                         <Typography variant="subtitle1">
//                           <InfoIcon /> Sports
//                         </Typography>
//                       </TableCell>
//                       {/* TimeHeader */}
//                       <TableCell
//                         width={"25%"}
//                         sx={{
//                           borderRight: "solid 2px red",
//                         }}
//                       >
//                         <Typography fontWeight="bold">
//                           Time
//                           <InfoIcon />
//                         </Typography>
//                       </TableCell>
//                       {/* Hourglass Action Header */}
//                       <TableCell
//                         width={"25%"}
//                         sx={{ borderLeft: "solid 2px red" }}
//                       >
//                         <Typography variant="subtitle2">
//                           <HourglassTopOutlinedIcon />
//                           00:00
//                         </Typography>
//                       </TableCell>
//                     </TableRow>
//                   </TableHead>

//                   {/* Table Body */}
//                   <TableBody
//                     sx={{
//                       // "& TableCell": { background: "green" },
//                       "&& .MuiTableCell-root": {
//                         backgroundColor: "yellow",
//                         fontWeight: "bold",
//                         alignItems: "flex-start",
//                         justifyContent: "right",
//                       },
//                       // "& tr": { background: "cyan", "&td": { background: "purple" } },
//                     }}
//                   >
//                     <TableRow
//                       sx={{
//                         alignItems: "center",
//                       }}
//                     >
//                       {/* Player */}
//                       <TableCell>
//                         <p>User 1</p>
//                       </TableCell>

//                       {/* Sport Selection */}
//                       <TableCell sx={{ background: "red" }}>
//                         <Typography sx={{ display: "inline", marginRight: 2 }}>
//                           Sport 1
//                         </Typography>
//                         <Typography sx={{ display: "inline", marginRight: 2 }}>
//                           Sport 2
//                         </Typography>
//                       </TableCell>

//                       {/* Time Selection */}
//                       <TableCell sx={{ background: "orange" }}>
//                         <span
//                           style={{
//                             display: "block",
//                             color: "black",
//                           }}
//                         >
//                           <p>May 16, 2023 9:00 AM</p>
//                         </span>
//                         <span
//                           style={{
//                             display: "block",
//                             color: "blue",
//                           }}
//                         >
//                           <p>May 17, 2023 5:00 PM</p>
//                         </span>
//                       </TableCell>

//                       {/* Toggle Switch */}
//                       <TableCell>
//                         <FormGroup>
//                           <FormControlLabel
//                             control={<Switch />}
//                             label="Save"
//                             checked={true}
//                           />
//                         </FormGroup>
//                       </TableCell>
//                     </TableRow>
//                     <TableRow
//                       sx={{
//                         alignItems: "center",
//                       }}
//                     >
//                       {/* Player */}
//                       <TableCell>
//                         <p>User 2</p>
//                       </TableCell>

//                       {/* Sport Selection */}
//                       <TableCell sx={{ background: "red" }}>
//                         <Typography sx={{ display: "inline", marginRight: 2 }}>
//                           Sport 3
//                         </Typography>
//                       </TableCell>

//                       {/* Time Selection */}
//                       <TableCell sx={{ background: "orange" }}>
//                         <span
//                           style={{
//                             display: "block",
//                             color: "black",
//                           }}
//                         >
//                           <p>May 16, 2023 9:00 AM</p>
//                         </span>
//                       </TableCell>
//                       {/* Toggle Switch */}
//                       <TableCell>
//                         <FormGroup>
//                           <FormControlLabel
//                             control={<Switch />}
//                             label="Save"
//                             checked={false}
//                           />
//                         </FormGroup>
//                       </TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Grid>

//             {/* Location */}
//             <Grid
//               container
//               item
//               sm={12}
//               md={4}
//               sx={{
//                 backgroundColor: "orange",
//                 display: "flex",
//                 alignItems: "top",
//               }}
//             >
//               <Grid
//                 item
//                 sx={{
//                   marginBottom: "20px",
//                   padding: "5px",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   backgroundColor: "purple",
//                 }}
//               >
//                 <Typography>Location (Centered)</Typography>
//               </Grid>
//               <Grid
//                 item
//                 sx={{
//                   display: "flex",
//                   justifyContent: "left",
//                   backgroundColor: "pink",
//                 }}
//               >
//                 Region (Aligned Left)
//               </Grid>
//               <Grid
//                 item
//                 sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   height: "300px",
//                   backgroundColor: "lightblue",
//                 }}
//               >
//                 Map (Centered)
//               </Grid>
//               <Grid
//                 item
//                 sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   height: "100px",
//                   backgroundColor: "lightgreen",
//                 }}
//               >
//                 Confirm Location (Centered)
//               </Grid>
//               <Grid
//                 item
//                 xs={4}
//                 sx={{
//                   display: "flex",
//                   justifyContent: "left",
//                   height: "50px",
//                   backgroundColor: "lightpink",
//                 }}
//               >
//                 Vote (Aligned Left)
//               </Grid>
//             </Grid>
//           </Grid>
//         </Box>

//         <Grid
//           container
//           direction="column"
//           justifyContent="center"
//           sx={{ backgroundColor: "lightgray" }}
//         >
//           <Grid
//             item
//             xs={4}
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               backgroundColor: "teal",
//             }}
//           >
//             <Button variant="contained" sx={{ width: "fit-content" }}>
//               Leave (Centered)
//             </Button>
//           </Grid>
//           <Grid item xs={4} sx={{ backgroundColor: "coral" }}>
//             Tutorial 1 (Centered)
//           </Grid>
//           <Grid item xs={4} sx={{ backgroundColor: "lime" }}>
//             Tutorial 2 (Centered)
//           </Grid>
//         </Grid>

//         {/* Chat */}
//         <Grid
//           container
//           sx={{
//             position: "absolute",
//             bottom: "0",
//             left: "0",
//             backgroundColor: "brown",
//           }}
//         >
//           <Grid
//             item
//             sx={{
//               width: "fit-content",
//               backgroundColor: "darkcyan",
//               color: "white",
//             }}
//           >
//             Chat (Bottom Left)
//           </Grid>
//         </Grid>
//       </BaseContainer>
//       {/*  next iteration of lobby table */}
//     </>
//   );
// };

// export default Layout;

// const StyleTest = () => {
//   return (
//     <>
//       <Container>
//         <Grid container direction="column" alignItems="center">
//           <Grid item>
//             <CustomHeading>Hello World</CustomHeading>
//           </Grid>
//           <CustomGrid></CustomGrid>
//           <CustomGrid item>
//             <Button> Hello </Button>
//             <Button> Hello </Button>

//             <Button> Hello </Button>

//             <Button> Hello </Button>

//             <Button> Hello </Button>
//           </CustomGrid>
//         </Grid>
//       </Container>
//     </>
//   );
//   //   return (
//   //     <>
//   //       <Container className="ct">
//   //         <AppBar position="static">
//   //           <Toolbar>
//   //             <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//   //               My App
//   //             </Typography>
//   //             <MyButton color="inherit">Login</MyButton>
//   //           </Toolbar>
//   //         </AppBar>
//   //         <MyButton> Hello MyButton</MyButton>
//   //         <TableContainer>
//   //           <Table className="myTable" sx={{ borderSpacing: "10" }}>
//   //             <TableHead>
//   //               <TableRow>
//   //                 <TableCell>Name</TableCell>
//   //                 <TableCell>Age</TableCell>
//   //                 <TableCell>Email</TableCell>
//   //               </TableRow>
//   //             </TableHead>
//   //             <TableBody sx={{ borderSpacing: "10" }}>
//   //               <TableRow sx={{ borderSpacing: "10" }}>
//   //                 <TableCell>John Smith</TableCell>
//   //                 <TableCell>30</TableCell>
//   //                 <TableCell>johnsmith@example.com</TableCell>
//   //               </TableRow>
//   //               <TableRow>
//   //                 <TableCell>John Smith</TableCell>
//   //                 <TableCell>30</TableCell>
//   //                 <TableCell>johnsmith@example.com</TableCell>
//   //               </TableRow>
//   //               <TableRow>
//   //                 <TableCell>John Smith</TableCell>
//   //                 <TableCell>30</TableCell>
//   //                 <TableCell>johnsmith@example.com</TableCell>
//   //               </TableRow>
//   //               <TableRow>
//   //                 <TableCell>John Smith</TableCell>
//   //                 <TableCell>30</TableCell>
//   //                 <TableCell>johnsmith@example.com</TableCell>
//   //               </TableRow>
//   //               <TableRow>
//   //                 <TableCell>John Smith</TableCell>
//   //                 <TableCell>30</TableCell>
//   //                 <TableCell>johnsmith@example.com</TableCell>
//   //               </TableRow>
//   //               <TableRow>
//   //                 <TableCell>Jane Doe</TableCell>
//   //                 <TableCell>25</TableCell>
//   //                 <TableCell>janedoe@example.com</TableCell>
//   //               </TableRow>
//   //             </TableBody>
//   //           </Table>
//   //         </TableContainer>
//   //         <div className="Navbar">
//   //           <Button variant="contained" >
//   //             Primary
//   //           </Button>
//   //           <Button variant="text" >
//   //             Secondary
//   //           </Button>
//   //         </div>
//   //         <form>
//   //           <TextField label="Input 1" name="input1" variant="outlined" />
//   //           <TextField label="Input 2" name="input2" variant="outlined" />
//   //           <TextField label="Input 3" name="input3" variant="outlined" />
//   //           <TextField label="Input 4" name="input4" variant="outlined" />
//   //           <TextField label="Input 5" name="input5" variant="outlined" />
//   //           <TextField label="Input 6" name="input6" variant="outlined" />
//   //           <TextField label="Input 7" name="input7" variant="outlined" />
//   //           <Button variant="contained" color="primary" type="submit">
//   //             Submit
//   //           </Button>
//   //           <Paper className="navbarSim">
//   //             <div className="navbar">
//   //               <Button> Test </Button>
//   //               <Button> Test </Button>
//   //               <Button> Test </Button>
//   //               <Button> Test </Button>
//   //               <Button> Test </Button>
//   //             </div>
//   //           </Paper>
//   //         </form>
//   //       </Container>

//   //       <Drawer>
//   //         <List>
//   //           <ListItem>
//   //             <ListItemText>
//   //               <Link to="/">Home</Link>
//   //             </ListItemText>
//   //           </ListItem>
//   //           <ListItem>
//   //             <ListItemText>
//   //               <Link to="/about">About</Link>
//   //             </ListItemText>
//   //           </ListItem>
//   //           <ListItem>
//   //             <ListItemText>
//   //               <Link to="/contact">Contact</Link>
//   //             </ListItemText>
//   //           </ListItem>
//   //           <ListItem>
//   //             <ListItemText>
//   //               <Link to="/about">Faq</Link>
//   //             </ListItemText>
//   //           </ListItem>
//   //         </List>
//   //       </Drawer>
//   //       <Container className="ctbt" maxWidth="sm">
//   //         <Button> 1 </Button>
//   //         <Button> 1 </Button>
//   //         <Button> 1 </Button>
//   //         <Button> 1 </Button>
//   //       </Container>
//   //       <Container className="ct cardcontainer" maxWidth="xl">
//   //         <Card>
//   //           <CardContent>
//   //             <Typography>Hello World</Typography>
//   //           </CardContent>
//   //           <CardActions>
//   //             <Button> Now Press Here</Button>
//   //           </CardActions>
//   //         </Card>
//   //         <Card>
//   //           <CardContent>
//   //             <Typography>Hello World</Typography>
//   //           </CardContent>
//   //           <CardActions>
//   //             <Button> Now Press Here</Button>
//   //           </CardActions>
//   //         </Card>
//   //         <Card>
//   //           <CardContent>
//   //             <Typography>Hello World</Typography>
//   //           </CardContent>
//   //           <CardActions>
//   //             <Button> Now Press Here</Button>
//   //           </CardActions>
//   //         </Card>
//   //       </Container>
//   //     </>
//   //   );
// };
// export default StyleTest;
