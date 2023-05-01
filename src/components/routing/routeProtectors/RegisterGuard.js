import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { api } from "../../../helpers/api";
import { useEffect, useState } from "react";
import { Spinner } from "../../ui/Spinner";

export const RegisterGuard = (props) => {
  const userId = localStorage.getItem("userId");
  const [TokenServer, setTokenServer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await api.get(`/users/${userId}`);
        setTokenServer(true);
      } catch (error) {
        setTokenServer(false);
      }
    };
    fetchData();
  }, []);

  if (!localStorage.getItem("token")) {
    return props.children;
  }

  if (localStorage.getItem("token")) {
    if (TokenServer === true) {
      return <Redirect to="/Home" />;
    } else if (TokenServer === false) {
      localStorage.clear();
      return props.children;
    }
    return <Spinner></Spinner>;
  }
};

RegisterGuard.propTypes = {
  children: PropTypes.node,
};
