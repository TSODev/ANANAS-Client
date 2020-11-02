import axios from "../../../axios-atlas";
import * as actions from "../actionTypes";

export const error = (error) => {
  return {
    type: actions.ERROR_SHOW,
    error: { severity: error.severity, message: error.message },
  };
};

export const LN_absences_Init = () => {
  return {
    type: actions.INIT_LN_ABSENCES,
  };
};
export const LN_absencesListStart = () => {
  return {
    type: actions.LN_ABS_LIST_START,
  };
};

export const LN_absencesListSuccess = (data) => {
  return {
    type: actions.LN_ABS_LIST_SUCCESS,
    data: data,
  };
};

export const LN_absencesListFail = (error) => {
  return {
    type: actions.LN_ABS_LIST_FAIL,
    error: error,
  };
};

export const LN_absencesBulkSaveStart = (LNData) => {
  //  const dataLN = JSON.parse(LNData);
  return {
    type: actions.LN_ABS_BULK_SAVE_START,
    data: { fileName: JSON.parse(LNData).name },
  };
};

export const LN_absencesBulkSaveSuccess = (nbRecord) => {
  console.log("[ACTION-ABSENCES] - Bulk Success ", nbRecord);
  return {
    type: actions.LN_ABS_BULK_SAVE_SUCCESS,
    data: { nbAbsences: nbRecord },
  };
};

export const LN_absencesBulkSaveFail = (error) => {
  return {
    type: actions.LN_ABS_BULK_SAVE_FAIL,
    error: error,
  };
};

export const LN_listAllAbsences = () => {
  return (dispatch) => {
    dispatch(LN_absencesListStart());
    axios
      .get("/LN/allabsencesview")
      .then((response) => {
        dispatch(LN_absencesListSuccess(response.data));
      })
      .catch((err) => {
        dispatch(LN_absencesListFail(err));
        dispatch(error({ severity: "error", message: err.message }));
      });
  };
};

export const LN_absencesBulkSave = (data) => {
  return (dispatch) => {
    dispatch(LN_absencesBulkSaveStart(data));

    axios
      .post("/LN/absence/bulkinsert", data)
      .then((response) => {
        dispatch(LN_absencesBulkSaveSuccess(response.data));

        //        dispatch(LN_listAllAbsences());
      })
      .catch((err) => {
        console.log(err);
        dispatch(LN_absencesBulkSaveFail(err));
        dispatch(error({ severity: "error", message: err.message }));
      });
  };
};
