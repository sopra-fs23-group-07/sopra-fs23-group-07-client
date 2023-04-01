import React, { useState } from 'react';
import { DatePicker, TimePicker } from '@mui/lab';
import {TextField} from "@mui/material";

function DateTimePicker() {
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [selectedStartTime, setSelectedStartTime] = useState(null);
    const [selectedEndTime, setSelectedEndTime] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleStartTimeChange = (time) => {
        setSelectedStartTime(time);
    };

    const handleEndTimeChange = (time) => {
        setSelectedEndTime(time);
    };

    return (
        <div>
            <DatePicker
                label="Date"
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
            />
            <TimePicker
                label="Start Time"
                value={selectedStartTime}
                onChange={handleStartTimeChange}
                disabled={!selectedDate}
                minTime={selectedDate && new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())}
                maxTime={selectedEndTime || new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 23, 59, 59)}
                renderInput={(params) => <TextField {...params} />}
            />
            <TimePicker
                label="End Time"
                value={selectedEndTime}
                onChange={handleEndTimeChange}
                disabled={!selectedDate || !selectedStartTime}
                minTime={selectedStartTime}
                maxTime={new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 23, 59, 59)}
                renderInput={(params) => <TextField {...params} />}
            />
        </div>
    );
}

export default DateTimePicker;