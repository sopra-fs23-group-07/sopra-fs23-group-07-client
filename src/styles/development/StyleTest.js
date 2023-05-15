import { Grid, Box, Paper, Button, Typography } from "@mui/material";
import BaseContainer from "components/ui/BaseContainer";
import { CustomHeading } from "./CustomHeading";
import { CustomGrid } from "./CustomGrid";


// Layout test for Custom Components
const Layout = () => {
  return (
    <BaseContainer>
      {/* Container of all content */}
      <Grid container direction="column" sx={{ alignItems: "center" }}>
        {/* title */}
        <Grid item xs={12}>
          <CustomHeading variant="h3">Create Lobby</CustomHeading>
        </Grid>
        {/* Visible Box */}
        <Grid
          item
          sx={{
            paddingY: 10,
            //   paddingX: 4,
            paddingX: 8,
            mt: 2,
            maxWidth: 600,
            flexGrow: 1,
            background: "rgba(255, 255, 255, 0.7)",
            borderRadius: "20px",
          }}
        >
          <Button variant={"contained"}>Hello World</Button>
          <Typography>Content</Typography>
          <Typography>
            very very very very very very very long long Content
          </Typography>
          <Typography>Content</Typography>
          <Typography>Content</Typography>
          <Typography>Content</Typography>
          <Typography>Content</Typography>
        </Grid>
        <CustomGrid item sx={{p:8, mt: 2}}>
          <Button variant={"contained"}>Hello World</Button>
          <Typography>Content</Typography>
          <Typography>
            very very very very very very very long long Content
          </Typography>
          <Typography>Content</Typography>
          <Typography>Content</Typography>
          <Typography>Content</Typography>
          <Typography>Content</Typography>
        </CustomGrid>
      </Grid>
    </BaseContainer>
  );
};

export default Layout;

// This is the Layout for the Lobby
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
//             sx={{ alignItems: "center", backgroundColor: "yellow" }}
//           >
//             Table
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
//       <Grid container sx={{ position: "absolute", bottom: "0", left: "0", backgroundColor: "brown" }}>
//         <Grid item sx={{ width: "fit-content", backgroundColor: "darkcyan", color: "white" }}>
//           Chat (Bottom Left)
//         </Grid>
//       </Grid>
//     </BaseContainer>
//   );
// };

// export default Layout;

// // Only for styling
// import {
//   Button,
//   Container,
//   Card,
//   CardActions,
//   CardMedia,
//   CardContent,
//   Grid,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   AppBar,
//   Toolbar,
//   TextField,
//   Drawer,
//   Link,
//   List,
//   ListItem,
//   ListItemText,
// } from "@mui/material";
// import { MyButton } from "./MyButton";
// import { CustomHeading } from "./CustomHeading";
// import { CustomGrid } from "./CustomGrid";

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
