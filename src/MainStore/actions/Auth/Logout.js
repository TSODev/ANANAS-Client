import axios from "../../../axios-atlas";
import * as actions from "../actionTypes";
//import * as type from '../types/AuthTypes';

export const logoutStart = () => {
  return {
    type: actions.LOGOUT_START,
  };
};

export const logoutSuccess = (authData) => {
  return {
    type: actions.LOGOUT_SUCCESS,
  };
};

export const logoutFail = (error) => {
  return {
    type: actions.LOGOUT_FAIL,
  };
};

export const initHRAAbsences = () => {
  return {
    type: actions.INIT_HRA_ABSENCES,
  };
};

export const initLNAbsences = () => {
  return {
    type: actions.INIT_LN_ABSENCES,
  };
};

export const error = (error) => {
  return {
    type: actions.ERROR_SHOW,
    error: { severity: error.severity, message: error.message },
  };
};

export const logOut = (token) => {
  return (dispatch) => {
    dispatch(logoutStart());
    const logoutInfo = {
      headers: {
        "x-xsrf-token": token,
      },
    };
    //    console.log(logoutInfo);
    axios
      //      .post("/logout", {}, logoutInfo)
      .post("/logout", {})
      .then((response) => {
        dispatch(logoutSuccess(response.data));
        dispatch(initHRAAbsences());
        dispatch(initLNAbsences());
        sessionStorage.clear();
      })
      .catch((err) => {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          dispatch(
            error({
              severity: "error",
              message: JSON.stringify(err.response.data),
            })
          );
        } else if (err.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          dispatch(
            error({ severity: "error", message: JSON.stringify(err.request) })
          );
        } else {
          // Something happened in setting up the request that triggered an Error
          dispatch(error({ severity: "error", message: err.message }));
        }
        dispatch(logoutFail(err));
      });
  };
};
