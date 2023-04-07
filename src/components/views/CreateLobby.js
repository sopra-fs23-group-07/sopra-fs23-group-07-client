import React, { useState } from "react";
import BaseContainer from "components/ui/BaseContainer";
import { useHistory } from "react-router-dom";
import { api, handleError } from "helpers/api";

// On this page the host chooses different attributes of his lobby
// TODO: Make sure that only loggedin users can open this page. (Guard)
const CreateLobby = () => {
  const history = useHistory();
  // Set up state variables for each input field.
  const [lobbyName, setLobbyName] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [region, setRegion] = useState("");
  const [lobby, setLobby] = useState(null);

  const handleLobbyClick = async () => {
    try {
      // Validate the input fields.
      if (!lobbyName || !maxParticipants || isNaN(maxParticipants) || !region) {
        alert("Please fill in all fields with valid data.");
        return;
      }

      const userId = localStorage.getItem("userId");

      // send lobby to backend
      const requestBody = JSON.stringify({
        lobbyName: lobbyName,
        lobbyRegion: region,
        lobbyMaxMembers: maxParticipants,
        lobbyTimeLimit: "100",
        hostMemberId: userId,
      });

      // TODO: uncomment when Backend is ready and check REST specifications again then

      const response = await api.post("/lobbies", requestBody);
      console.log(response.data)
      setLobby(response.data);


      // TODO: Make sure that always a new lobby with the correct Id is created. Probably get LobbyId from Backend response.

        history.push(`/Lobby/${response.data.lobbyId}`);

    } catch (error) {
      alert(
        `Something went wrong during lobby creation (Check if you filled in all fields): \n${handleError(
          error
        )}`
      );
    }
  };

  // displays the three input fields
  return (
    <BaseContainer className="game container">
      <h1>Create a new Lobby </h1>
      <div className="LobbyNameSelection">
        <h3>Select lobby name:</h3>
        <input
          type="text"
          id="lobbyName"
          value={lobbyName}
          onChange={(e) => setLobbyName(e.target.value)}
        />
      </div>
      <br />
      <div className="ParticipantsMaxSelection" style={{textAlign: 'center'}}>
        <h3> Enter maximum number of participants:</h3>
        <input
          type="text"
          id="maxParticipants"
          value={maxParticipants}
          onChange={(e) => setMaxParticipants(e.target.value)}
        />
      </div>
      <br />
      <div className="RegionSelection">
        <h3>Choose Region:</h3>
        <select
          id="region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="" selected disabled>
            Choose a canton
          </option>
          <option value="AG">Aargau</option>
          <option value="AI">Appenzell Innerrhoden</option>
          <option value="AR">Appenzell Ausserrhoden</option>
          <option value="BE">Bern</option>
          <option value="BL">Basel-Landschaft</option>
          <option value="BS">Basel-Stadt</option>
          <option value="FR">Fribourg</option>
          <option value="GE">Geneva</option>
          <option value="GL">Glarus</option>
          <option value="GR">Graubünden</option>
          <option value="JU">Jura</option>
          <option value="LU">Luzern</option>
          <option value="NE">Neuchâtel</option>
          <option value="NW">Nidwalden</option>
          <option value="OW">Obwalden</option>
          <option value="SG">St. Gallen</option>
          <option value="SH">Schaffhausen</option>
          <option value="SO">Solothurn</option>
          <option value="SZ">Schwyz</option>
          <option value="TG">Thurgau</option>
          <option value="TI">Ticino</option>
          <option value="UR">Uri</option>
          <option value="VD">Vaud</option>
          <option value="VS">Valais</option>
          <option value="ZG">Zug</option>
          <option value="ZH">Zürich</option>
        </select>
      </div>
      <br />
      <button onClick={() => handleLobbyClick()}>Create Lobby</button>
    </BaseContainer>
  );
};

export default CreateLobby;
