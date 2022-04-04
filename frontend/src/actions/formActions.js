import {
  FORM_SUBMIT_REQUEST,
  FORM_SUBMIT_SUCCESS,
  FORM_SUBMIT_FAIL,
} from '../constants/formConstants';
import axios from 'axios';
export const submitApplication = (applicationFormData) => async (dispatch) => {
  try {
    dispatch({
      type: FORM_SUBMIT_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };

    const { data } = await axios.post(`/posts`, applicationFormData, config);

    dispatch({
      type: FORM_SUBMIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FORM_SUBMIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
