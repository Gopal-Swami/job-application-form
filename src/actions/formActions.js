import {
  FORM_SUBMIT_REQUEST,
  FORM_SUBMIT_SUCCESS,
  FORM_SUBMIT_FAIL,
  FORM_SUBMIT_RESET,
} from '../constants/formConstants';

// Form Action To Post The Application Form Data To Json placeholder API end point
// Access Public
// Route https://jsonplaceholder.typicode.com/posts
//Method Post
export const submitApplication = (applicationFormData) => async (dispatch) => {
  dispatch({
    type: FORM_SUBMIT_REQUEST,
  });

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(applicationFormData),
  };
  await fetch('https://jsonplaceholder.typicode.com/posts', requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Something went wrong. Please try again.');
      }
      return response.json();
    })
    .then((data) => {
      dispatch({
        type: FORM_SUBMIT_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FORM_SUBMIT_FAIL,
        payload: error.message,
      });
    });
};

// Method to clear the previous state of submitApplicationState from store
// It sets the state to empty object so  clearing form fields will also set this state to empty
export const clearSubmitFormApplicationState = () => (dispatch) => {
  dispatch({
    type: FORM_SUBMIT_RESET,
  });
};
