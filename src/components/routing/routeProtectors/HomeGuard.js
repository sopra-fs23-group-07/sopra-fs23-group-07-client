import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";


export const HomeGuard = props => {
    if (!(localStorage.getItem("token")==='null') && localStorage.getItem("token")) {
        return props.children;
    }
    // if user is already logged in, redirects to the main /app
    return <Redirect to="/register"/>;
};

HomeGuard.propTypes = {
    children: PropTypes.node
};