import * as actiontypes from "../actions/actionTypes";

import { updateObject } from "../../utilities/utils";

const initialState = {
  absences: [
    // {
    //   absence_id: "",
    //   people_id: "",
    //   code: "",
    //   libelle: "",
    //   debut: new Date(),
    //   fin: new Date(),
    //   abs_month: 0,
    //   abs_year: 0,
    //   createdDate: new Date(),
    // },
  ],
  // for: "",
  // from: new Date(),
  // to: new Date(),
  loading: false,
  error: "",
  loaded: false,
  nbAbs: 0,
  fileName: "",
  lastLoadedDate: null,
};

const initLNAbsences = (state, action) => {
  return updateObject(state, {
    absences: [],
    loading: false,
    loaded: false,
    nbAbs: 0,
    fileName: "",
    error: null,
  });
};

const absencesListStart = (state, action) => {
  return updateObject(state, {
    error: "",
    loading: true,
    loaded: false,
  });
};

const absencesListSuccess = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    loaded: true,
    absences: action.data,
  });
};

const absencesListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    loaded: false,
  });
};

const absencesSaveStart = (state, action) => {
  return updateObject(state, {
    error: "",
    loading: true,
  });
};

const absencesSaveSuccess = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const absencesSaveFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const absencesBulkSaveStart = (state, action) => {
  //  console.log("ABS_REDUCER :", action);
  return updateObject(state, {
    error: "",
    loading: true,
    loaded: false,
    nbAbs: 0,
    fileName: action.data.fileName,
  });
};

const absencesBulkSaveSuccess = (state, action) => {
  //  console.log("ABS_REDUCER :", action);
  return updateObject(state, {
    error: action.error,
    loading: false,
    loaded: true,
    nbAbs: action.data.nbAbsences.nbRecord,
    lastLoadedDate: new Date(),
  });
};

const absencesBulkSaveFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    loaded: false,
    nbAbs: 0,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actiontypes.LN_ABS_LIST_START:
      return absencesListStart(state, action);
    case actiontypes.LN_ABS_LIST_SUCCESS:
      return absencesListSuccess(state, action);
    case actiontypes.LN_ABS_LIST_FAIL:
      return absencesListFail(state, action);
    case actiontypes.LN_ABS_SAVE_START:
      return absencesSaveStart(state, action);
    case actiontypes.LN_ABS_SAVE_SUCCESS:
      return absencesSaveSuccess(state, action);
    case actiontypes.LN_ABS_SAVE_FAIL:
      return absencesSaveFail(state, action);
    case actiontypes.LN_ABS_BULK_SAVE_START:
      return absencesBulkSaveStart(state, action);
    case actiontypes.LN_ABS_BULK_SAVE_SUCCESS:
      return absencesBulkSaveSuccess(state, action);
    case actiontypes.LN_ABS_BULK_SAVE_FAIL:
      return absencesBulkSaveFail(state, action);
    case actiontypes.INIT_LN_ABSENCES:
      return initLNAbsences(state, action);
    default:
      return state;
  }
};

export default reducer;
