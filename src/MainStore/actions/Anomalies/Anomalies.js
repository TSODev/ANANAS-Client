import axios from "../../../axios-atlas";
import * as actions from "../actionTypes";

export const anomaliesAnalyseStart = () => {
  return {
    type: actions.ANOMALIES_ANALYSE_START,
  };
};

export const anomaliesAnalyseSuccess = (data) => {
  return {
    type: actions.ANOMALIES_ANALYSE_SUCCESS,
    data: data,
  };
};

export const anomaliesAnalyseFail = (error) => {
  return {
    type: actions.ANOMALIES_ANALYSE_FAIL,
    error: error,
  };
};

export const error = (error) => {
  return {
    type: actions.ERROR_SHOW,
    error: { severity: error.severity, message: error.message },
  };
};

export const anomaliesAnalyse = (peopleId) => {
  return (dispatch) => {
    dispatch(anomaliesAnalyseStart());
    axios
      .get("/anomaliesForPeople/" + peopleId.toString(), {
        validateStatus: function (status) {
          return status < 400; // Reject only if the status code is greater than or equal to 500
        },
      })
      .then((response) => dispatch(anomaliesAnalyseSuccess(response.data)))
      .catch((err) => {
        dispatch(anomaliesAnalyseFail(err));
        dispatch(error({ severity: "error", message: err.message }));
      });
  };
};

export const anomaliesBulkAnalyse = () => {
  return (dispatch) => {
    dispatch(anomaliesAnalyseStart());
    axios
      .get("/anomaliesForAllPeople/", {
        validateStatus: function (status) {
          return status < 400; // Reject only if the status code is greater than or equal to 500
        },
      })
      .then((response) => dispatch(anomaliesAnalyseSuccess(response.data)))
      .catch((err) => {
        dispatch(anomaliesAnalyseFail(err));
        dispatch(error({ severity: "error", message: err.message }));
      });
  };
};

export const anomaliescleared = () => {
  return {
    type: actions.ANOMALIES_CLEAR,
  };
};

export const clearAnomalies = () => {
  return (dispatch) => {
    axios
      .get("/clearanomalies")
      .then((response) => dispatch(anomaliescleared()))
      .catch((err) => {});
  };
};

export const anomaliesListStart = () => {
  return {
    type: actions.ANOMALIES_LIST_START,
  };
};

export const anomaliesListSuccess = (data) => {
  return {
    type: actions.ANOMALIES_LIST_SUCCESS,
    data: data,
  };
};

export const anomaliesListFail = (error) => {
  return {
    type: actions.ANOMALIES_LIST_FAIL,
    error: error,
  };
};

export const anomaliesList = () => {
  return (dispatch) => {
    dispatch(anomaliesListStart());
    axios
      .get("/allanomaliesfromview/", {
        validateStatus: function (status) {
          return status < 400; // Reject only if the status code is greater than or equal to 500
        },
      })
      .then((response) => dispatch(anomaliesListSuccess(response.data)))
      .catch((err) => {
        dispatch(anomaliesListFail(err));
        dispatch(error({ severity: "error", message: err.message }));
      });
  };
};

export const anomalieUpdateStart = () => {
  return {
    type: actions.ANOMALIE_UPDATE_START,
  };
};

export const anomalieUpdateSuccess = (data) => {
  return {
    type: actions.ANOMALIE_UPDATE_SUCCESS,
    data: data,
  };
};

export const anomalieUpdateFail = (error) => {
  return {
    type: actions.ANOMALIE_UPDATE_FAIL,
    error: error,
  };
};

export const anomalieUpdate = (dataToUpdate) => {
  return (dispatch) => {
    dispatch(anomalieUpdateStart());
    axios
      .put("/updateanomaliewithetatandcomment/", dataToUpdate, {
        validateStatus: function (status) {
          return status < 400; // Reject only if the status code is greater than or equal to 500
        },
      })
      .then((response) => {
        dispatch(anomalieUpdateSuccess(response.data));
      })
      .then((response) => dispatch(anomaliesList()))
      .catch((err) => {
        dispatch(anomalieUpdateFail(err));
        dispatch(error({ severity: "error", message: err.message }));
      });
  };
};
