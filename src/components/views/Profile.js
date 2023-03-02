import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory, useParams} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Profile.scss";


const FormField = props => {
    return (
        <div className="title-field">
            <input
                className="title-field"
                placeholder={props.placeholder}
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormField.propTypes = {
  placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

const Profile = () => {
  // use react-router-dom's hook to access the history
  const history = useHistory();
  const userId = useParams().userId;


  // define a state variable (using the state hook).
  // if this variable changes, the component will re-render, but the variable will
  // keep its value throughout render cycles.
  // a component can have as many state variables as you like.
  // more information can be found under https://reactjs.org/docs/hooks-state.html
  const [user, setUser] = useState([]);


  const toGamePage = () => {
    history.push('/game');
  }


  // the effect hook can be used to react to change in your component.
  // in this case, the effect hook is only run once, the first time the component is mounted
  // this can be achieved by leaving the second argument an empty array.
  // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    const fetchData = async() => {
      try {
        const response = await api.get('/users/' + userId);

        // delays continuous execution of an async operation for 1 second.
        // This is just a fake async call, so that the spinner can be displayed
        // feel free to remove it :)
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Get the returned users and update the state.
        setUser(response.data);

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

   // let content = <Spinner/>;

    let content = (
            <div>
                <div>
                    <div>{user.username && user && <h1>username: {user.username}</h1>}</div>
                    <div>{user.userId && user && <h2>ID: {user.userId}</h2>}</div>
                    <div>{user.creationDate && user && <h2>creation date: {user.creationDate}</h2>}</div>
                    <div>{user.status && user && <h2>status: {user.status}</h2>}</div>
                    <div>{user.birthdate && user && <h2>birthdate: {user.birthdate}</h2>}</div>
                </div>

                <Button
                    width="100%"
                    onClick={() => toGamePage()}
                >
                    Dashboard
                </Button>
            </div>
        );


  return (
        <BaseContainer className="game container">
            <h2>User Profile</h2>
            <p className="game paragraph">
                Here you see your profile information:
            </p>
        {content}
    </BaseContainer>
  );
}

export default Profile;
