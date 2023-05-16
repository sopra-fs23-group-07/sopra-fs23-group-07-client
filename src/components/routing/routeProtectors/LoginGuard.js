import {Redirect, useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {api} from "helpers/api.js";
import Spinner from "components/ui/Spinner";


/**
 *
 * Another way to export directly your functional component.
 */
export const LoginGuard = props => {

    const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        console.log(userId);
        console.log(token);
        const [toLogin, setToLogin] = useState(false);

        const history = useHistory();

        //useEffect(() => {
            async function fetchData() {
              try {
                const response = await api.get(`/users/${userId}`);
                console.log(response.data.token);

                if(token === response.data.token) {
                    history.push("/Home"); }
                else {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userId");
                    setToLogin(true);}


              } catch (error) {
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                console.log(error);
                setToLogin(true);
              }
            }

            fetchData();
          //}, []);
        if(setToLogin) { return props.children; }
        return <Spinner />

};

LoginGuard.propTypes = {
    children: PropTypes.node
}