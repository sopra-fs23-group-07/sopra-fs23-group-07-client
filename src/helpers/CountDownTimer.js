import { useState, useEffect } from "react";

const CountDownTimer = ({ initialSeconds = 10 * 60 }) => {
  // set seconds to argument passed, when no arg is passed it sets it to 10 mins
  const [seconds, setSeconds] = useState(initialSeconds);

  // set interval to count down the seconds and update state, render when ever seconds change
  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => setSeconds(seconds - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [seconds]);

  // format time as mm:ss from the only seconds as input
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Display the time left in seconds
  return <div>{formatTime(seconds)}</div>;
};

export default CountDownTimer;
