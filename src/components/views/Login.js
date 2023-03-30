import React, { useState } from "react";
import { api, handleError } from "helpers/api";
//import User from 'models/User';
import { useHistory } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormField = (props) => {
  return (
    <div className="login field">
      <label className="login label">{props.label}</label>
      <input
        className="login input"
        placeholder="enter here.."
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const Login = (props) => {
  const history = useHistory();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const doLogin = async () => {
    try {
      const requestBody = JSON.stringify({ username, password });
      const response = await api.post("/users/login", requestBody);

      // Get the returned user and update a new object.
      const user = response.data;

      // Store the token into the local storage.
      localStorage.setItem("token", user.token);
      localStorage.setItem("userId", user.userId);

      // Login successfully worked --> navigate to the route /game in the GameRouter
      history.push(`/Home`);
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  };

  return (
    <BaseContainer>
      <div className="login container">
        <div className="login form">
          <FormField
            label="Username"
            value={username}
            onChange={(un) => setUsername(un)}
          />
          <FormField
            label="Password"
            value={password}
            onChange={(pw) => setPassword(pw)}
          />
          <div className="login button-container">
            <Button
              disabled={!username || !password}
              width="100%"
              onClick={() => doLogin()}
            >
              &#x1F513; Login
            </Button>
          </div>
          <div>Not a user yet? Please go to the Register Page.</div>
          <div className="login button-container">
            <Button width="100%" onClick={() => history.push("/register")}>
              &#x1F511; Register
            </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Login;
