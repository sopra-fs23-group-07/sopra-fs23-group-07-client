import {Redirect, useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import {api} from "../../../helpers/api";
import {useEffect, useState} from "react";
import Spinner from "components/ui/Spinner";

export const RegisterGuard = (props) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    console.log(userId);
    console.log(token);
    const [toRegister, setToRegister] = useState(false);

    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
          try {
            const response = await api.get(`/users/${userId}`);
            console.log(response.data.token);

            if(token === response.data.token) {
                history.push("/Home"); }
            else {
                localStorage.clear();
                window.dispatchEvent(new CustomEvent("localstorage-update"));
                setToRegister(true);
                await api.post(`/users/logout/${userId}`);}


          } catch (error) {
              localStorage.clear();
              window.dispatchEvent(new CustomEvent("localstorage-update"));
            setToRegister(true);
            await api.post(`/users/logout/${userId}`);
          }
        }

        fetchData().catch(err => console.log(err));
      }, []);
    if(toRegister) { return props.children; }
    return <Spinner />

    // if user is already logged in, redirects to the main /app
//    if (userId && token) {
//        return <Redirect to="/Home"/>;
//    } else {
//        localStorage.removeItem("token");
//        localStorage.removeItem("userId");
//        return props.children;
//    }



};

RegisterGuard.propTypes = {
    children: PropTypes.node,
};
