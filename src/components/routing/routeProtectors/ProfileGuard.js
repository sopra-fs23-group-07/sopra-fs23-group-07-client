import {useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import React, {useState} from "react";
import {api} from "../../../helpers/api";
import {toast} from "react-toastify";
import Spinner from "components/ui/Spinner";


export const ProfileGuard = (props) => {


    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const [toProfile, setToProfile] = useState(false);

    const history = useHistory();

    //useEffect(() => {
        async function fetchData() {
          try {
            const response = await api.get(`/users/${userId}`);

            if(token === response.data.token) {
                setToProfile(true); }
            else {
                localStorage.clear();
                window.dispatchEvent(new CustomEvent("localstorage-update"));
                toast.error("You could not be authenticated. Please log in or register.");
                try {await api.post(`/users/logout/${userId}`);}
                catch {}
                history.push("/Login");
            }



          } catch (error) {
            localStorage.clear();
            window.dispatchEvent(new CustomEvent("localstorage-update"));
            try {await api.post(`/users/logout/${userId}`);}
            catch {}
            history.push("/Login");
          }
        }

        fetchData().catch(err => console.log(err));
      //}, []);
    if(setToProfile) { return props.children; }
    return <Spinner />
};

ProfileGuard.propTypes = {
    children: PropTypes.node,
};
