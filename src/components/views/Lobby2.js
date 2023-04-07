import React from "react";
import BaseContainer from "components/ui/BaseContainer";
import { useHistory } from "react-router-dom";
import { Spinner } from "components/ui/Spinner";
import "styles/views/Lobby.scss";

const Lobby2 = () => {
  const history = useHistory(); // needed for linking

  const handleHomeClick = () => {
    history.push("/Home");
  };

  let sportselect = <Spinner />;
  sportselect = (
    <select>
      <option value="Basketball">Basketball</option>
      <option value="Football">Football</option>
      <option value="Volleyball">Volleyball</option>
      <option value="Cycling">Cycling</option>
      <option value="Tennis">Tennis</option>
    </select>
  );

  let timeselect = <Spinner />;
  timeselect = (
    <select>
      <option value="12:00-13:00">12:00-13:00</option>
      <option value="13:00-14:00">13:00-14:00</option>
      <option value="14:00-15:00">14:00-15:00</option>
      <option value="15:00-16:00">15:00-16:00</option>
      <option value="16:00-17:00">16:00-17:00</option>
      <option value="17:00-18:00">17:00-18:00</option>
      <option value="18:00-19:00">18:00-19:00</option>
      <option value="19:00-20:00">19:00-20:00</option>
      <option value="20:00-21:00">20:00-21:00</option>
      <option value="21:00-22:00">21:00-22:00</option>
      <option value="22:00-23:00">22:00-23:00</option>
    </select>
  );

  return (
    <BaseContainer className="lobby">
      <h1>Dynamic Heading</h1>
      <button onClick={() => handleHomeClick()}>Leave Lobby</button>
      <table>
        <thead>
          <tr>
            <th>Player Name</th>
            <th>Sports</th>
            <th>Time</th>
            <th>Lock</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Player 1</td>
            <td>{sportselect}</td>
            <td>{timeselect}</td>
            <td>
              <button>Lock</button>
            </td>
          </tr>
          <tr>
            <td>Player 2</td>
            <td>Basketball</td>
            <td>14:00-16:00</td>
            <td>
              <button>Lock</button>
            </td>
          </tr>
          <tr>
            <td>Player 3</td>
            <td>Basketball, Football</td>
            <td>12:00-17:00</td>
            <td>
              <button>Lock</button>
            </td>
          </tr>
          <tr>
            <td>Player 4</td>
            <td>Volleyball, Basketball</td>
            <td>14:00-19:00</td>
            <td>
              <button>Lock</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <h2>Location</h2>
        <img src="https://dummyimage.com/400x400/000/fff" alt="Map" />
        <ol>
          <li>Zentrum</li>
          <li>Höngg</li>
          <li>Irchel</li>
          <li>Oerlikon</li>
        </ol>
      </div>
    </BaseContainer>
  );
};

export default Lobby2;
