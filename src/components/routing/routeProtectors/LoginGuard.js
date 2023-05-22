import {useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import React, {useState} from "react";
import {api} from "helpers/api.js";
import Spinner from "components/ui/Spinner";


/**
 *
 * Another way to export directly your functional component.
 */
export const LoginGuard = props => {

    const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        const [toLogin, setToLogin] = useState(false);

        const history = useHistory();

        async function fetchData() {
          try {
            const response = await api.get(`/users/${userId}`);

            if(token === response.data.token) {
                history.push("/Home"); }
            else {
                localStorage.clear();
                window.dispatchEvent(new CustomEvent("localstorage-update"));
                setToLogin(true);
                await api.post(`/users/logout/${userId}`);}



          } catch (error) {
            localStorage.clear();
            window.dispatchEvent(new CustomEvent("localstorage-update"));
            console.log(error);
            setToLogin(true);
            await api.post(`/users/logout/${userId}`);
          }
        }

        fetchData().catch(err => console.log(err));

        if(toLogin) { return props.children; }
        return <Spinner />

};

LoginGuard.propTypes = {
    children: PropTypes.node
}