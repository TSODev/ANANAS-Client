import axios from "../../../axios-atlas";
import * as actions from "../actionTypes";
//import * as utils from '../../../utilities/utils';
//import * as type from '../types/AuthTypes';

export const signinShow = () => {
  return {
    type: actions.SIGNIN_SHOWMODAL,
  };
};

export const signinClose = () => {
  return {
    type: actions.SIGNIN_CLOSEMODAL,
  };
};

export const signinStart = () => {
  return {
    type: actions.SIGNIN_START,
    loading: true,
  };
};

export const signinSuccess = (authData) => {
  return {
    type: actions.SIGNIN_SUCCESS,
    authData: authData,
    //    loading: false,
  };
};

export const userResetMode = () => {
  return {
    type: actions.USER_MODE_VIEW,
    loading: false,
  };
};

export const signinFail = (error) => {
  return {
    type: actions.SIGNIN_FAIL,
    error: error,
  };
};

export const error = (error) => {
  return {
    type: actions.ERROR_SHOW,
    error: { severity: error.severity, message: error.message },
  };
};

export const refreshMarker = () => {
  return {
    type: actions.MARK_REFRESH_STATE,
  };
};

export const signIn = (email, password) => {
  return (dispatch) => {
    dispatch(signinStart());
    const userInfo = {
      email: email,
      password: password,
    };
    axios
      .post("/login", userInfo)
      .then((response) => {
        //        dispatch(userResetMode());
        dispatch(signinSuccess(response));
        dispatch(refreshMarker());
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
        //        dispatch(error({ severity: "error", message: err.config }));
        dispatch(signinFail(err));
      });
  };
};

export const setToken = (token) => {
  return {
    type: actions.SET_TOKEN,
    token: token,
    error: error,
  };
};

export const showSignInModal = (show) => {
  return (dispatch) => {
    if (show) {
      dispatch(signinShow());
    } else {
      dispatch(signinClose());
    }
  };
};
