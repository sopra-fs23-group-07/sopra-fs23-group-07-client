import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
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
import CreateEvent from "components/views/CreateEvent";
import Lobby from "../../views/Lobby";
import { CreateLobbyGuard } from "../routeProtectors/CreateLobbyGuard";
import { CreateEventGuard } from "../routeProtectors/CreateEventGuard";
import { HomeGuard } from "../routeProtectors/HomeGuard";
import Event from "../../views/Event";
import FAQ from "../../views/FAQ";
import EditProfile from "../../views/EditProfile";
import { ProfileGuard } from "../routeProtectors/ProfileGuard";
import {LobbyInviteGuard} from "../routeProtectors/LobbyInviteGuard";
import {MyEventsGuard} from "../routeProtectors/MyEventsGuard";

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
          <MyEventsGuard>
          <MyEvents />
            </MyEventsGuard>
        </Route>

        <Route exact path="/Profile/:userId">
          <ProfileGuard>
            <Profile />
          </ProfileGuard>
        </Route>
        <Route exact path={"/Profile/:userId/Edit"}>
          <ProfileGuard>
            <EditProfile />
          </ProfileGuard>
        </Route>

        <Route exact path="/CreateLobby">
          <CreateLobbyGuard>
            <CreateLobby />
          </CreateLobbyGuard>
        </Route>

        <Route exact path="/CreateEvent">
          <CreateEventGuard>
            <CreateEvent />
          </CreateEventGuard>
        </Route>
        <Route exact path="/Lobby/:lobbyId">
          <LobbyInviteGuard >
            <Lobby />
          </LobbyInviteGuard>
        </Route>

        <Route exact path="/Events/:eventId">
          <Event />
        </Route>

        <Route exact path={"/FAQ"}>
          <FAQ/>
        </Route>

        <Route path="*">
            <Redirect to="/Home" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

/*
 * Don't forget to export your component!
 */
export default AppRouter;
