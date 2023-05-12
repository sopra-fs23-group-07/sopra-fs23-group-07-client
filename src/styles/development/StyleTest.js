// Only for styling
import {
  Button,
  Container,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
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

const StyleTest = () => {
  return (
    <>
      <Container className="ct">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My App
            </Typography>
            <MyButton color="inherit">Login</MyButton>
          </Toolbar>
        </AppBar>
        <MyButton> Hello MyButton</MyButton>
        <TableContainer>
          <Table className="myTable" sx={{ borderSpacing: "10" }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ borderSpacing: "10" }}>
              <TableRow sx={{ borderSpacing: "10" }}>
                <TableCell>John Smith</TableCell>
                <TableCell>30</TableCell>
                <TableCell>johnsmith@example.com</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>John Smith</TableCell>
                <TableCell>30</TableCell>
                <TableCell>johnsmith@example.com</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>John Smith</TableCell>
                <TableCell>30</TableCell>
                <TableCell>johnsmith@example.com</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>John Smith</TableCell>
                <TableCell>30</TableCell>
                <TableCell>johnsmith@example.com</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>John Smith</TableCell>
                <TableCell>30</TableCell>
                <TableCell>johnsmith@example.com</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Jane Doe</TableCell>
                <TableCell>25</TableCell>
                <TableCell>janedoe@example.com</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div className="Navbar">
          <Button variant="contained" >
            Primary
          </Button>
          <Button variant="text" >
            Secondary
          </Button>
        </div>
        <form>
          <TextField label="Input 1" name="input1" variant="outlined" />
          <TextField label="Input 2" name="input2" variant="outlined" />
          <TextField label="Input 3" name="input3" variant="outlined" />
          <TextField label="Input 4" name="input4" variant="outlined" />
          <TextField label="Input 5" name="input5" variant="outlined" />
          <TextField label="Input 6" name="input6" variant="outlined" />
          <TextField label="Input 7" name="input7" variant="outlined" />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
          <Paper className="navbarSim">
            <div className="navbar">
              <Button> Test </Button>
              <Button> Test </Button>
              <Button> Test </Button>
              <Button> Test </Button>
              <Button> Test </Button>
            </div>
          </Paper>
        </form>
      </Container>

      <Drawer>
        <List>
          <ListItem>
            <ListItemText>
              <Link to="/">Home</Link>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Link to="/about">About</Link>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Link to="/contact">Contact</Link>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Link to="/about">Faq</Link>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <Container className="ctbt" maxWidth="sm">
        <Button> 1 </Button>
        <Button> 1 </Button>
        <Button> 1 </Button>
        <Button> 1 </Button>
      </Container>
      <Container className="ct cardcontainer" maxWidth="xl">
        <Card>
          <CardContent>
            <Typography>Hello World</Typography>
          </CardContent>
          <CardActions>
            <Button> Now Press Here</Button>
          </CardActions>
        </Card>
        <Card>
          <CardContent>
            <Typography>Hello World</Typography>
          </CardContent>
          <CardActions>
            <Button> Now Press Here</Button>
          </CardActions>
        </Card>
        <Card>
          <CardContent>
            <Typography>Hello World</Typography>
          </CardContent>
          <CardActions>
            <Button> Now Press Here</Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
};
export default StyleTest;
