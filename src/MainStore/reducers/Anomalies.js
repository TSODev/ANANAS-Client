import * as actiontypes from "../actions/actionTypes";

import { updateObject } from "../../utilities/utils";
//import { act } from 'react-dom/test-utils';

const initialState = {
  anomalies: [],
  error: "",
  loading: false,
  loaded: false,
  listloaded: false,
  updating: false,
  updated: false,
};

//type State = typeof initialState;

const anomaliesAnalyseStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    loaded: false,
    //    anomalies: [],
    //                            selected: {},
  });
};

const anomaliesAnalyseSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    loaded: true,
    //    anomalies: action.data,
    //                            selected: {},
  });
};

const anomaliesAnalyseFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    loaded: false,
    //                            selected: {},
  });
};

const anomalieUpdateStart = (state, action) => {
  return updateObject(state, {
    error: null,
    updating: true,
    updated: false,
    //    anomalies: [],
    //                            selected: {},
  });
};

const anomalieUpdateSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    updating: false,
    updated: true,
    //    anomalies: action.data,
    //                            selected: {},
  });
};

const anomalieUpdateFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    updating: false,
    updated: false,
    //                            selected: {},
  });
};

const anomaliesListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    listloaded: false,
    anomalies: [],
    //                            selected: {},
  });
};

const anomaliesListSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    listloaded: true,
    anomalies: action.data,
    //                            selected: {},
  });
};

const anomaliesListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    listloaded: false,
    //                            selected: {},
  });
};

const anomaliescleared = (state, action) => {
  return updateObject(state, {
    anomalies: [],
    error: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actiontypes.ANOMALIES_ANALYSE_START:
      return anomaliesAnalyseStart(state, action);
    case actiontypes.ANOMALIES_ANALYSE_SUCCESS:
      return anomaliesAnalyseSuccess(state, action);
    case actiontypes.ANOMALIES_ANALYSE_FAIL:
      return anomaliesAnalyseFail(state, action);
    case actiontypes.ANOMALIES_LIST_START:
      return anomaliesListStart(state, action);
    case actiontypes.ANOMALIES_LIST_SUCCESS:
      return anomaliesListSuccess(state, action);
    case actiontypes.ANOMALIES_LIST_FAIL:
      return anomaliesListFail(state, action);
    case actiontypes.ANOMALIE_UPDATE_START:
      return anomalieUpdateStart(state, action);
    case actiontypes.ANOMALIE_UPDATE_SUCCESS:
      return anomalieUpdateSuccess(state, action);
    case actiontypes.ANOMALIE_UPDATE_FAIL:
      return anomalieUpdateFail(state, action);
    case actiontypes.ANOMALIES_CLEAR:
      return anomaliescleared(state, action);
    default:
      return state;
  }
};

export default reducer;
