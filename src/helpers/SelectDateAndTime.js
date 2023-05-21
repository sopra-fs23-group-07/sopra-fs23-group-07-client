import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import moment from "moment";
import { api, handleError } from "./api";
import { toast } from "react-toastify";
import { Box } from "@mui/material";

const today = new Date();
const SelectDateAndTime = (props) => {
  const [startDate, setStartDate] = useState();
  const [chosenDate, setChosenDate] = useState(props.selectedDatesServer);
  const removeDate = (dateToRemove) => {
    setChosenDate(chosenDate.filter((date) => date !== dateToRemove));
    // UpdateSelectedTime(chosenDate);
  };
  const lobbyId = localStorage.getItem("lobbyId");

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    // Check if selectedDate is present in chosenDate array
    const isDateSelected = chosenDate.some((date) => {
      return new Date(date).getTime() === selectedDate.getTime();
    });

    return currentDate.getTime() < selectedDate.getTime() && !isDateSelected;
  };

  useEffect(() => {
    UpdateSelectedTime(chosenDate).catch(err => console.log(err));
    // console.log(chosenDate);
  }, [chosenDate]);

  const handleClick = () => {
    if (startDate) {
      const formattedDate = moment(startDate).format("YYYY-MM-DDTHH:mm:ss");

      // Check if the selected date is in the past
      const currentDate = new Date();
      const selectedDate = new Date(startDate);
      if (currentDate.getTime() >= selectedDate.getTime()) {
        toast.error(
          "You cannot choose a date in the past! Please choose a future date."
        );
        return;
      }

      if (chosenDate.includes(formattedDate) === false) {
        setChosenDate((prevState) => [...prevState, formattedDate]);
      } else {
        toast.error(
          "You already chose this date and time! Please choose another one!"
        );
      }
    }
  };

  //As an Alternative here you would filter in a way that a user can only choose 5 days in advance!
  // const filterPassedTime = (time) => {
  //     const currentDate = new Date();
  //     const selectedDate = new Date(time);
  //     const maxDate = new Date();
  //     maxDate.setDate(currentDate.getDate() + 5);
  //
  //     return (
  //         currentDate.getTime() < selectedDate.getTime() &&
  //         selectedDate.getTime() < maxDate.getTime()
  //     );
  // };

  const UpdateSelectedTime = async (selectedDates) => {
    try {
      const requestBody = JSON.stringify({
        memberId: props.memberId,
        selectedDates: selectedDates,
      });
      await api.put(`/lobbies/${lobbyId}/date`, requestBody);
    } catch (error) {
      toast.error(handleError(error));
    }
  };

  return (
  
    <div>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
     
        <Box sx={{ marginRight: 2 }}>
          <DatePicker
            disabled={props.hasLockedSelections}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeIntervals={30}
            minDate={new Date()}
            maxDate={new Date(today.setDate(today.getDate() + 5))} // 5 days from now
            filterTime={filterPassedTime}
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText="Add a date and time"
            isClearable={false}
          />
        </Box>
        <Box >
          <IconButton
            disabled={props.hasLockedSelections}
            aria-label="delete"
            onClick={handleClick}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Box>

      <div>
        {chosenDate.map((date) => (
          <div
            key={date}
            style={{ display: "flex", alignItems: "center", marginBottom: 2 }}
          >
            
            <span
            // sx={{ marginRight: 2 }}
              style={{
                marginRight: 12,
                display: "block",
                color: props.chosenDateServer.includes(date) ? "blue" : "black",
              }}
            >
              {<p>{moment(date).format("MMMM DD, YYYY h:mm A")}</p>}
            </span>
            <Box >
              <IconButton
                disabled={props.hasLockedSelections}
                aria-label="delete"
                onClick={() => removeDate(date)}
              >
                <ClearIcon />
              </IconButton>
            </Box>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SelectDateAndTime;
