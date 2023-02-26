import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";

const Player = ({user}) => (
  <div className="player container">
    <div className="player username">{user.username}</div>
    <div className="player name">{user.name}</div>
    <div className="player id">id: {user.id}</div>
  </div>
);

Player.propTypes = {
  user: PropTypes.object
};

const Profile = () => {
  // use react-router-dom's hook to access the history
  const history = useHistory();

  // define a state variable (using the state hook).
  // if this variable changes, the component will re-render, but the variable will
  // keep its value throughout render cycles.
  // a component can have as many state variables as you like.
  // more information can be found under https://reactjs.org/docs/hooks-state.html
  const [users, setUsers] = useState(null);

  const toGamePage = () => {
    history.push('/game');
  }

  // the effect hook can be used to react to change in your component.
  // in this case, the effect hook is only run once, the first time the component is mounted
  // this can be achieved by leaving the second argument an empty array.
  // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchData() {
      try {
        const response = await api.get('/users');

        // delays continuous execution of an async operation for 1 second.
        // This is just a fake async call, so that the spinner can be displayed
        // feel free to remove it :)
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Get the returned users and update the state.
        setUsers(response.data);

        // This is just some data for you to see what is available.
        // Feel free to remove it.
        console.log('request to:', response.request.responseURL);
        console.log('status code:', response.status);
        console.log('status text:', response.statusText);
        console.log('requested data:', response.data);

        // See here to get more data.
        console.log(response);
      } catch (error) {
        console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
        console.error("Details:", error);
        alert("Something went wrong while fetching the users! See the console for details.");
      }
    }

    fetchData();
  }, []);

  let content = <Spinner/>;

  if (users) {
    content = (
      <div className="profile">
          <table>
              <tr>
                  <th>Username</th>
                  <td className="player username">{users[0].username}</td>
              </tr>
              <tr>
                  <th>Name</th>
                  <td className="player name">{users[0].name}</td>
              </tr>
              <tr>
                  <th>Creation Date</th>
                  <td className="player creationDate">{users[0].creationDate}</td>
              </tr>
              <tr>
                  <th>Online Status</th>
                  <td className="player status">{users[0].status}</td>
              </tr>
          </table>
        <Button
          width="100%"
          onClick={() => toGamePage()}
        >
          Dashboard
        </Button>
      </div>
    );
  }

  return (
    <BaseContainer className="game container">
      <h2>User Profile</h2>
      <p className="game paragraph">
        Get all users from secure endpoint:
      </p>
      {content}
    </BaseContainer>
  );
}

export default Profile;
