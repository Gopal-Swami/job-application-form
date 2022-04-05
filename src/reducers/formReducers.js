import {
  FORM_SUBMIT_REQUEST,
  FORM_SUBMIT_SUCCESS,
  FORM_SUBMIT_FAIL,
  FORM_SUBMIT_RESET,
} from '../constants/formConstants';

export const submitApplicationReducer = (state = {}, action) => {
  switch (action.type) {
    case FORM_SUBMIT_REQUEST:
      return { loading: true };
    case FORM_SUBMIT_SUCCESS:
      return { loading: false, success: true, applicationData: action.payload };
    case FORM_SUBMIT_FAIL:
      return { loading: false, success: false, error: action.payload };
    case FORM_SUBMIT_RESET:
      return {};
    default:
      return state;
  }
};
