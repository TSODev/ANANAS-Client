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
    //   identifiant: "",
    //   modele_rep_absence: "",
    //   num_bulletin: "",
    //   num_traitement: "",
    //   partition_reglem: "",
    //   position_bu: "",
    //   periode_paie: "",
    //   reglementation: "",
    //   repertoire_absence: "",
    //   source_absence: "",
    //   usage_paie: "",
    //   centre_cout: "",
    //   matricule_GP: "",
    //   abs_month: 0,
    //   abs_year: 0,
    //   createdDate: new Date(),
    // },
  ],
  // for: "",
  // from: new Date(),
  // to: new Date(),
  loading: false,
  error: null,
  loaded: false,
  nbAbs: 0,
  fileName: "",
  lastLoadedDate: null,
};

const initHRAAbsences = (state, action) => {
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
  });
};

const absencesListSuccess = (state, action) => {
  return updateObject(state, {
    error: action.error,
    absences: action.data,
    loading: false,
  });
};

const absencesListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
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
  return updateObject(state, {
    error: "",
    loading: true,
    loaded: false,
    nbAbs: 0,
  });
};

const absencesBulkSaveSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    loaded: true,
  });
};

const absencesBulkSaveFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    loaded: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actiontypes.HRA_ABS_LIST_START:
      return absencesListStart(state, action);
    case actiontypes.HRA_ABS_LIST_SUCCESS:
      return absencesListSuccess(state, action);
    case actiontypes.HRA_ABS_LIST_FAIL:
      return absencesListFail(state, action);
    case actiontypes.HRA_ABS_SAVE_START:
      return absencesSaveStart(state, action);
    case actiontypes.HRA_ABS_SAVE_SUCCESS:
      return absencesSaveSuccess(state, action);
    case actiontypes.HRA_ABS_SAVE_FAIL:
      return absencesSaveFail(state, action);
    case actiontypes.HRA_ABS_BULK_SAVE_START:
      return absencesBulkSaveStart(state, action);
    case actiontypes.HRA_ABS_BULK_SAVE_SUCCESS:
      return absencesBulkSaveSuccess(state, action);
    case actiontypes.HRA_ABS_BULK_SAVE_FAIL:
      return absencesBulkSaveFail(state, action);
    case actiontypes.INIT_HRA_ABSENCES:
      return initHRAAbsences(state, action);
    default:
      return state;
  }
};

export default reducer;
