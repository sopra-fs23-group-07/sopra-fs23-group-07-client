import axios from 'axios';
import { getDomain } from 'helpers/getDomain';
import React from 'react';

export const api = axios.create({
  baseURL: getDomain(),
  headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'https://sopra-fs23-group-07-server.oa.r.appspot.com' }
});
export const handleError = error => {
  const response = error.response;

  // catch 4xx and 5xx status codes
  if (response && !!`${response.status}`.match(/^[4|5]\d{2}$/)) {
    let info = ``;

    if (response.data.status) {

      info += `${response.data.message}`;
    } else {
      info += `${response.data}`;
    }

    console.log('The request was made and answered but was unsuccessful.', error.response);
    return info;
  } else {
    if (error.message.match(/Network Error/)) {
      return (
          "The server cannot be reached. Please start the server and reload the page."
      );
    }

    console.log('Something else happened.', error);
    return (
        error.message
    );
  }
};