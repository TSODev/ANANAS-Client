import axios from "../../../axios-atlas";
import * as actions from "../actionTypes";
//import * as utils from '../../../utilities/utils';
//import * as type from '../types/AuthTypes';

export const initMetadata = () => {
  return {
    type: actions.INIT_METADATA,
  };
};

export const metadataListStart = () => {
  return {
    type: actions.LOAD_METADATA_START,
  };
};

export const metadataListSuccess = (data) => {
  return {
    type: actions.LOAD_METADATA_SUCCESS,
    data: { metadata: data.metadata },
  };
};

export const metadataListFail = (error) => {
  return {
    type: actions.LOAD_METADATA_FAIL,
    error: error,
  };
};

export const metadataSaveStart = () => {
  return {
    type: actions.SAVE_METADATA_START,
  };
};

export const metadataSaveSuccess = (data) => {
  return {
    type: actions.SAVE_METADATA_SUCCESS,
    data: data,
  };
};

export const metadataSaveFail = (error) => {
  return {
    type: actions.SAVE_METADATA_FAIL,
    error: error,
  };
};

export const error = (error) => {
  return {
    type: actions.ERROR_SHOW,
    error: { severity: error.severity, message: error.message },
  };
};

export const listAllMetadata = () => {
  return (dispatch) => {
    dispatch(metadataListStart());
    axios
      .get("/metadata/", {
        validateStatus: function (status) {
          return status < 400; // Reject only if the status code is greater than or equal to 400
        },
      })
      .then((response) => dispatch(metadataListSuccess(response.data)))
      .catch((err) => {
        dispatch(metadataListFail(err));
        dispatch(error({ severity: "error", message: err.message }));
      });
  };
};

export const metadataSave = (md) => {
  return (dispatch) => {
    dispatch(metadataSaveStart());
    const userInfo = md;
    const id = md.id;
    axios
      .put("/metadata/" + id, userInfo)
      .then((response) => {
        dispatch(metadataSaveSuccess(response.data));
      })
      .catch((err) => {
        dispatch(metadataSaveFail(err));
        dispatch(error({ severity: "error", message: err.message }));
      });
  };
};

export const setRefreshStateMark = () => {
  return {
    type: actions.MARK_REFRESH_STATE,
  };
};

export const markRefreshState = () => {
  return (dispatch) => {
    dispatch(setRefreshStateMark());
  };
};
