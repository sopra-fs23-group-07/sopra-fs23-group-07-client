import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { GameGuard } from "components/routing/routeProtectors/GameGuard";
import GameRouter from "components/routing/routers/GameRouter";
import { LoginGuard } from "components/routing/routeProtectors/LoginGuard";
import Login from "components/views/Login";
import { RegisterGuard } from "../routeProtectors/RegisterGuard";
import Register from "components/views/Register";
import Profile from "../../views/Profile";
import Events from "components/views/Events";
import MyEvents from "components/views/MyEvents";
import Home from "components/views/Home";
import Lobbies from "components/views/Lobbies";
import Header from "components/views/Header";
import CreateLobby from "components/views/CreateLobby";
import Test from "../../views/Test";
import Lobby from "../../views/Lobby";
import {CreateLobbyGuard} from "../routeProtectors/CreateLobbyGuard";
import {HomeGuard} from "../routeProtectors/HomeGuard";
import Event from "../../views/Event";
import EditProfile from "../../views/EditProfile";
import {ProfileGuard} from "../routeProtectors/ProfileGuard";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header height="100" />
      <Switch>
        <Route exact path="/login">
          <LoginGuard>
            <Login />
          </LoginGuard>
        </Route>

        <Route exact path="/register">
          <RegisterGuard>
            <Register />
          </RegisterGuard>
        </Route>
        <Route exact path={`/Profile/`}>
          <ProfileGuard>
            <Profile />
          </ProfileGuard>
        </Route>
        <Route exact path="/">
          <Redirect to="/register" />
        </Route>

        {/* New routes added for navbar */}
        <Route exact path="/Home">
          <HomeGuard>
          <Home />
        </HomeGuard>
        </Route>

        <Route exact path="/Lobbies">
          <Lobbies />
        </Route>

        <Route exact path="/Events">
          <Events />
        </Route>

        <Route exact path="/MyEvents">
          <MyEvents />
        </Route>

        <Route exact path="/Profile/:userId">
          <ProfileGuard>
            <Profile />
          </ProfileGuard>
        </Route>
        <Route exact path={"/Profile/:userId/Edit"}>
          <ProfileGuard>
            <EditProfile/>
          </ProfileGuard>
        </Route>

        {/* DONE: Add a Guard to make sure only logged in users can create Lobby */}
        <Route exact path="/CreateLobby">
          <CreateLobbyGuard>
            <CreateLobby />
          </CreateLobbyGuard>
        </Route>

        <Route path="/Lobby/:id"  render={() => <Lobby/>}/>

        <Route exact path="/Test">
          <Test />
        </Route>
        <Route exact path="/Lobby">
          <Lobby />
        </Route>
        <Route exact path="/Lobby">
          <Lobby/>
        </Route>
        {/* <Route exact path="/Lobby/:id">
          <Lobby />
        </Route> */}

        <Route exact path="/Events/:eventId">
          <Event />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

/*
 * Don't forget to export your component!
 */
export default AppRouter;
