import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";

/**
 *
 * Another way to export directly your functional component.
 */
export const CreateLobbyGuard = props => {
    if (!(localStorage.getItem("token")==='null') && localStorage.getItem("token")) {
        return props.children;
    }
    // if user is already logged in, redirects to the main /app
    return <Redirect to="/Lobbies"/>;
};

CreateLobbyGuard.propTypes = {
    children: PropTypes.node
}