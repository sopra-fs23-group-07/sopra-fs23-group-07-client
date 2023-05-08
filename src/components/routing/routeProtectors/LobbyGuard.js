import { Route, Redirect } from 'react-router-dom';

export const LobbyRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem("token") ? <Component {...props}{...rest} /> : <Redirect to='/register' />

    )} />
);

