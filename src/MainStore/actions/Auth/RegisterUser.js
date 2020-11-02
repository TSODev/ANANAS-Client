import axios from "../../../axios-atlas";
import * as actions from "../actionTypes";

export const registerShow = () => {
  return {
    type: actions.SIGNUP_SHOWMODAL,
  };
};

export const registerClose = () => {
  return {
    type: actions.SIGNUP_CLOSEMODAL,
  };
};

export const registerStart = () => {
  return {
    type: actions.SIGNUP_START,
  };
};

export const registerSuccess = (authData) => {
  return {
    type: actions.SIGNUP_SUCCESS,
    authData: authData,
  };
};

export const registerFail = (error) => {
  return {
    type: actions.SIGNUP_FAIL,
    error: error,
  };
};

export const error = (error) => {
  return {
    type: actions.ERROR_SHOW,
    error: { severity: error.severity, message: error.message },
  };
};

export const register = (email, password, firstname, lastname) => {
  return (dispatch) => {
    dispatch(registerStart());
    const authData = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: password,
      company: "EXAMPLE",
      roles: ["USER"],
    };
    axios
      .post("/signup", authData)
      .then((response) => {
        console.log(response.data);
        dispatch(registerSuccess(response.data));
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
        dispatch(registerFail(err));
      });
  };
};

export const showSignUpModal = (show) => {
  return (dispatch) => {
    if (show) {
      dispatch(registerShow());
    } else {
      dispatch(registerClose());
    }
  };
};
