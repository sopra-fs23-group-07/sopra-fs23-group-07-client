import { useState, useEffect } from 'react';
import {useHistory, useParams} from 'react-router-dom'
import {api, handleError} from 'helpers/api';
import {Button} from 'components/ui/Button';
import 'styles/views/EditProfile.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

//component for Editpage display, defining label,value and onchange as passable values
const FormField = props => {
    return (
        <div className="editProfile field"> <h3><label className="editProfile label"> {props.label} </label></h3>
            <input className="editProfile input" placeholder="enter here.." value={props.value} onChange={e => props.onChange(e.target.value)}/>
        </div>);};

//defining type of passable values to FormField
FormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

const EditProfile = () => { //setting start states of username and birthday
    const history = useHistory();
    const userId = useParams().userId;
    const [user, setUser] = useState([]);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [name, setName] = useState(null);
    const [birthdate, setBirthdate] = useState(null);




    const edit = async () => {

        try {
            if(localStorage.getItem('token') === user.token){

                const requestBody = JSON.stringify({
                    "userId": userId,
                    "name": name,
                    "username": username,
                    "password": password,
                    "birthdate": birthdate

                });
                await api.put("/users/"+ userId, requestBody);
                history.push(`/game/profile/` + userId);
            }
            else{

                alert("You can't access this profile page");}

        } catch (error) {
            alert(`Something went wrong during the edit: \n${handleError(error)}`);}};


    // the effect hook can be used to react to change in your component.
    // in this case, the effect hook is only run once, the first time the component is mounted
    // this can be achieved by leaving the second argument an empty array.
    // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        const fetchData = async () => {
            try {
                const response =  await api.get('/users/'+ userId );

                setUser(response.data);

                console.log('request to:', response.request.responseURL);
                console.log('status code:', response.status);
                console.log('status text:', response.statusText);
                console.log('requested data:', response.data);
            } catch (error) {
                console.error(`Something went wrong while getting the data for the user: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while getting the data for the user! See the console for details.");
            }

        }

        fetchData();
    }, [userId]);

    let content =(

            <div className="editProfile form">
                <FormField label="Username" value={username} onChange={un => setUsername(un)}/>
                <FormField label="Password" value={password} onChange={pa => setPassword(pa)}/>
                <FormField label="Name" value={name} onChange={na => setName(na)}/>
                <FormField label="Birthdate" value={birthdate} onChange={bd => setBirthdate(bd)}/>

                <Button  width="100%" onClick={() => edit()}> &#x1F4BE; Save Profile</Button>
            </div>

    );

    return (
        <BaseContainer className="editProfile container">
            <h2>Edit Profile</h2>
            <p className="editProfile paragraph">
                Here you can edit your profile information:
            </p>
            {content}

        </BaseContainer>
    );
};

export default EditProfile;