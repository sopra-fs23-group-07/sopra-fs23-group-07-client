import {Route} from "react-router-dom";
import PropTypes from 'prop-types';
import Profile from "components/views/Profile";
import EditProfile from "components/views/EditProfile";
import Lobby from "../../views/Lobby";

const GameRouter = props => {
  /**
   * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
   */
  return (
      <div style={{display: 'flex', flexDirection: 'column'}}>


          <Route exact path={`${props.base}/profile/:userId`}>
              <Profile/>
          </Route>
          <Route exact path={`${props.base}/profile/:userId/edit`}>
              <EditProfile/>
          </Route>
          <Route exact path={`${props.base}/profile/:userId/edit`}>
              <EditProfile/>
          </Route>

        <Route exact path={`${props.base}/Lobby/:lobbyId`} component={LobbyInviteGuard}>
            <LobbyInviteGuard >
                <Lobby />
            </LobbyInviteGuard>
        </Route>


    </div>
  );
};
/*
* Don't forget to export your component!
 */

GameRouter.propTypes = {
  base: PropTypes.string
}

export default GameRouter;
