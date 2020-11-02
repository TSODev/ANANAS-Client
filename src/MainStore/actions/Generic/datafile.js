import axios from "../../../axios-atlas";
import * as actions from "../actionTypes";
//import * as utils from '../../../utilities/utils';
//import * as type from '../types/AuthTypes';

export const initDatafiles = () => {
  return {
    type: actions.INIT_DATAFILES,
  };
};

export const DatafileListStart = () => {
  return {
    type: actions.LOAD_DATAFILE_START,
  };
};

export const DatafileListSuccess = (data) => {
  return {
    type: actions.LOAD_DATAFILE_SUCCESS,
    data: { datafiles: data.datafiles },
  };
};

export const DatafileListFail = (error) => {
  return {
    type: actions.LOAD_DATAFILE_FAIL,
    error: error,
  };
};

export const deleteDatafileStart = () => {
  return {
    type: actions.DELETE_DATAFILE_START,
  };
};

export const deleteDatafileSuccess = (data) => {
  return {
    type: actions.DELETE_DATAFILE_SUCCESS,
    data: { datafiles: data.datafiles },
  };
};

export const deleteDatafileFail = (error) => {
  return {
    type: actions.DELETE_DATAFILE_FAIL,
    error: error,
  };
};

export const error = (error) => {
  return {
    type: actions.ERROR_SHOW,
    error: { severity: error.severity, message: error.message },
  };
};

export const listAllDatafile = () => {
  return (dispatch) => {
    dispatch(DatafileListStart());
    axios
      .get("/datafiles/", {
        validateStatus: function (status) {
          return status < 400; // Reject only if the status code is greater than or equal to 400
        },
      })
      .then((response) => {
        dispatch(DatafileListSuccess(response.data));
      })
      .catch((err) => {
        dispatch(DatafileListFail(err));
        dispatch(error({ severity: "error", message: err.message }));
      });
  };
};

export const deleteDatafile = (id) => {
  return (dispatch) => {
    dispatch(deleteDatafileStart());
    axios
      .delete("/datafile/" + id, {
        validateStatus: function (status) {
          return status < 400; // Reject only if the status code is greater than or equal to 400
        },
      })
      .then((response) => {
        dispatch(deleteDatafileSuccess(response.data));
        this.listAllDatafile();
      })
      .catch((err) => {
        dispatch(deleteDatafileFail(err));
        dispatch(error({ severity: "error", message: err.message }));
      });
  };
};
