import * as actiontypes from "../actions/actionTypes";

import { updateObject } from "../../utilities/utils";

const initialState = {
  refresh: true,
  metadata: [
    {
      group: "",
      key: "",
      value: "",
    },
  ],
  datafiles: [
    {
      datafile_id: "",
      datafilename: "",
      datafileloadeddate: "",
    },
  ],
  loading: false,
  loaded: false,
  error: false,
};

const initMetadata = (state, action) => {
  return updateObject(state, {
    metadata: [],
    loading: false,
    error: false,
    loading: false,
    loaded: false,
    error: false,
  });
};

const initDatafiles = (state, action) => {
  return updateObject(state, {
    datafiles: [],
  });
};

const loadMetadataStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const loadMetadataSuccess = (state, action) => {
  //   const updatedMD = [...state.metadata];
  //   const index = action.data.metadata.index;
  //   updatedMD[index] = action.data.metadata;
  return updateObject(state, {
    error: null,
    loading: false,
    loaded: true,
    metadata: action.data.metadata,
  });
};

const loadMetadataFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    loaded: false,
  });
};

const loadDataFileStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const loadDataFileSuccess = (state, action) => {
  //  const prevDatafiles = [...state.datafile];
  const newDatafiles = action.data.datafiles;
  return updateObject(state, {
    error: null,
    loading: false,
    datafiles: action.data.datafiles,
  });
};

const loadDataFileFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const deleteDataFileStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const deleteDataFileSuccess = (state, action) => {
  //  const prevDatafiles = [...state.datafile];
  const newDatafiles = action.data.datafiles;
  return updateObject(state, {
    error: null,
    loading: false,
    //    datafiles: action.data.datafiles,
  });
};

const deleteDataFileFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const markRefreshState = (state, action) => {
  return updateObject(state, {
    refresh: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actiontypes.INIT_METADATA:
      return initMetadata(state, action);
    case actiontypes.INIT_DATAFILES:
      return initDatafiles(state, action);
    case actiontypes.LOAD_METADATA_START:
      return loadMetadataStart(state, action);
    case actiontypes.LOAD_METADATA_SUCCESS:
      return loadMetadataSuccess(state, action);
    case actiontypes.LOAD_METADATA_FAIL:
      return loadMetadataFail(state, action);
    case actiontypes.LOAD_DATAFILE_START:
      return loadDataFileStart(state, action);
    case actiontypes.LOAD_DATAFILE_SUCCESS:
      return loadDataFileSuccess(state, action);
    case actiontypes.LOAD_DATAFILE_FAIL:
      return loadDataFileFail(state, action);
    case actiontypes.DELETE_DATAFILE_START:
      return deleteDataFileStart(state, action);
    case actiontypes.DELETE_DATAFILE_SUCCESS:
      return deleteDataFileSuccess(state, action);
    case actiontypes.DELETE_DATAFILE_FAIL:
      return deleteDataFileFail(state, action);
    case actiontypes.MARK_REFRESH_STATE:
      return markRefreshState(state, action);
    default:
      return state;
  }
};

export default reducer;
