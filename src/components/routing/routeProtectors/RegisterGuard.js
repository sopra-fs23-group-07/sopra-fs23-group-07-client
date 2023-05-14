import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { api } from "../../../helpers/api";
import { useEffect, useState } from "react";
import { Spinner } from "../../ui/Spinner";

export const RegisterGuard = (props) => {
  const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const [loggedIn, setLoggedIn] = useState(null);

    useEffect( () => {
                  async function fetchData() {
                      try {

                          const response = await api.get(`/users/${userId}`);
                          if(token != response.data.token) { setLoggedIn(false); }

                      } catch (err) {
                          console.log(err);
                      }
                  }
                  fetchData();


              }, []);

    // if user is already logged in, redirects to the main /app
    if(!loggedIn) {return props.children;}
    else {return <Redirect to="/Home"/>;}

};

RegisterGuard.propTypes = {
  children: PropTypes.node,
};
