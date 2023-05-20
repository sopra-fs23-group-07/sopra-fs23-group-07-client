import {BrowserRouter, Redirect, Route, Switch, useLocation} from "react-router-dom";
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
import Test from "../../views/Test";
import Lobby from "../../views/Lobby";
import { CreateLobbyGuard } from "../routeProtectors/CreateLobbyGuard";
import { CreateEventGuard } from "../routeProtectors/CreateEventGuard";
import { HomeGuard } from "../routeProtectors/HomeGuard";
import Event from "../../views/Event";
import FAQ from "../../views/FAQ";
import EditProfile from "../../views/EditProfile";
import { ProfileGuard } from "../routeProtectors/ProfileGuard";
import {LobbyRoute} from "../routeProtectors/LobbyGuard";
import {LobbyInviteGuard} from "../routeProtectors/LobbyInviteGuard";
import {MyEventsGuard} from "../routeProtectors/MyEventsGuard";
import {useEffect} from "react";
import {toast} from "react-toastify";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
const RouterContent = () => {
  const location = useLocation();

  useEffect(() => {
    toast.dismiss();
  }, [location]);

  return (
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

        {/* DONE: Add a Guard to make sure only logged in users can create Lobby */}
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
        {/*
        //TODO: user still has to be redirected to lobby after registration instead of Home
        //<LobbyRoute path="/Lobby/:id" component={Lobby}/>

        <Route exact path="/Test">
          <Test />
        </Route>
//        <Route exact path="/Lobby">
//          <Lobby />
//        </Route>
        <Route exact path="/Lobby">
          <Login />
        </Route> */}
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
  );
};
const AppRouter = () => {

  return (
    <BrowserRouter>
      <Header height="100" />
      <RouterContent/>
    </BrowserRouter>
  );
};

/*
 * Don't forget to export your component!
 */
export default AppRouter;
