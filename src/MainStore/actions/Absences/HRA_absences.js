import axios from "../../../axios-atlas";
import * as actions from "../actionTypes";

export const error = (error) => {
  return {
    type: actions.ERROR_SHOW,
    error: { severity: error.severity, message: error.message },
  };
};

export const HRA_absences_Init = () => {
  return {
    type: actions.INIT_HRA_ABSENCES,
  };
};

export const absencesListStart = () => {
  return {
    type: actions.HRA_ABS_LIST_START,
  };
};

export const absencesListSuccess = (data) => {
  // const loadedAbsences = [];
  // data.absences.forEach((absence, index) => {
  //   const record = absence;
  //   absence.index = index;
  //   loadedAbsences.push(record);
  // });
  return {
    type: actions.HRA_ABS_LIST_SUCCESS,
    data: data,
  };
};

export const absencesListFail = (error) => {
  return {
    type: actions.HRA_ABS_LIST_FAIL,
    error: error,
  };
};

export const absencesBulkSaveStart = () => {
  return {
    type: actions.HRA_ABS_BULK_SAVE_START,
  };
};

export const absencesBulkSaveSuccess = (data) => {
  // const loadedAbsences = [];
  // data.absences.forEach((absence, index) => {
  //   const record = absence;
  //   absence.index = index;
  //   loadedAbsences.push(record);
  // });
  //    console.log('[ACTION-USER] - List Success ', loadedUsers, '/', data);
  console.log("HRASuccess : ", data);
  return {
    type: actions.HRA_ABS_BULK_SAVE_SUCCESS,
    data: data.datafile,
    //
  };
};

export const absencesBulkSaveFail = (error) => {
  return {
    type: actions.HRA_ABS_BULK_SAVE_FAIL,
    error: error,
  };
};

export const HRA_listAllAbsences = () => {
  return (dispatch) => {
    dispatch(absencesListStart());
    axios
      .get("/HRA/allabsencesview/", {
        validateStatus: function (status) {
          return status < 400; // Reject only if the status code is greater than or equal to 500
        },
      })
      .then((response) => dispatch(absencesListSuccess(response.data)))
      .catch((err) => {
        dispatch(absencesListFail(err));
        dispatch(error({ severity: "error", message: err.message }));
      });
  };
};

export const HRA_absencesBulkSave = (data) => {
  return (dispatch) => {
    dispatch(absencesBulkSaveStart());

    axios
      .post("/HRA/absence/bulkinsert", data, {
        validateStatus: function (status) {
          return status < 400; // Reject only if the status code is greater than or equal to 500
        },
      })
      .then((response) => {
        dispatch(absencesBulkSaveSuccess(response.data));
      })
      .catch((err) => {
        dispatch(absencesBulkSaveFail(err));
        dispatch(error({ severity: "error", message: err.message }));
      });
  };
};
