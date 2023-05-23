import {useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import {api} from "../../../helpers/api";
import {useEffect, useState} from "react";
import Spinner from "components/ui/Spinner";

export const RegisterGuard = (props) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const [toRegister, setToRegister] = useState(false);

    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
          try {
            const response = await api.get(`/users/${userId}`);

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


};

RegisterGuard.propTypes = {
    children: PropTypes.node,
};
