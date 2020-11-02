import * as actiontypes from "../actions/actionTypes";

import { updateObject } from "../../utilities/utils";
//import { act } from 'react-dom/test-utils';

const initialState = {
  users: [
    {
      roles: [""],
      _id: "",
      user_id: "",
      email: "",
      passwordDigest: "",
      lastname: "",
      firstname: "",
      company: "",
      domain: "",
      __v: 0,
    },
  ],
  error: "",
  loading: false,
  userListAvailable: false,
  //    selected: {},
  key: null,
  showSelected: false,
  modeView: true,
  modeEdit: false,
  // user: {
  //     index: 0,
  //     roles: [''],
  //     _id: '',
  //     user_id: '',
  //     email: '',
  //     passwordDigest: '',
  //     lastname: '',
  //     firstname: '',
  //     company: '',
  //     domain: '',
  //     __v: 0
  //   },
  delete_user_id: "",
};

//type State = typeof initialState;

const usersListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    userListAvailable: false,
    showSelected: false,
    //                            selected: {},
  });
};

const usersListSuccess = (state, action) => {
  return updateObject(state, {
    users: action.data.users,
    error: null,
    loading: false,
    userListAvailable: true,
  });
};

const usersListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    userListAvailable: false,
  });
};

const usersListMustBeUpdated = (state, action) => {
  const updatedUsers = state.users.map((user, index) => (user.key = index));
  return updateObject(state, {
    users: updatedUsers,
  });
};

const userShow = (state, action) => {
  return updateObject(state, {
    //        selected: action.user,
    showSelected: true,
    key: action.key,
  });
};

const userHide = (state, action) => {
  return updateObject(state, {
    //        selected: {},
    showSelected: false,
  });
};

const userModeView = (state, action) => {
  return updateObject(state, {
    modeEdit: false,
    modeView: true,
  });
};

const userModeEdit = (state, action) => {
  return updateObject(state, {
    modeEdit: true,
    modeView: false,
  });
};

const userDeleteStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const userDeleteSuccess = (state, action) => {
  const index = state.key;
  const updatedUsers = state.users
    .filter((user) => user.index !== index)
    .map((user, index) => {
      const updatedUser = {
        ...user,
        index: index,
      };
      return updatedUser;
    });
  return updateObject(state, {
    error: null,
    loading: false,
    users: updatedUsers,
    key: null,
  });
};

const userDeleteFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const userSaveStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const userSaveSuccess = (state, action) => {
  const updatedUsers = [...state.users];
  const index = action.data.user.index;
  updatedUsers[index] = action.data.user;
  return updateObject(state, {
    error: null,
    loading: false,
    users: updatedUsers,
  });
};

const userSaveFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actiontypes.USERS_LIST_START:
      return usersListStart(state, action);
    case actiontypes.USERS_LIST_SUCCESS:
      return usersListSuccess(state, action);
    case actiontypes.USERS_LIST_FAIL:
      return usersListFail(state, action);
    case actiontypes.USER_LIST_MUST_BE_UPDATED:
      return usersListMustBeUpdated(state, action);
    case actiontypes.USER_SHOW:
      return userShow(state, action);
    case actiontypes.USER_HIDE:
      return userHide(state, action);
    case actiontypes.USER_MODE_VIEW:
      return userModeView(state, action);
    case actiontypes.USER_MODE_EDIT:
      return userModeEdit(state, action);
    case actiontypes.USER_DELETE_START:
      return userDeleteStart(state, action);
    case actiontypes.USER_DELETE_SUCCESS:
      return userDeleteSuccess(state, action);
    case actiontypes.USER_DELETE_FAIL:
      return userDeleteFail(state, action);
    case actiontypes.USER_SAVE_START:
      return userSaveStart(state, action);
    case actiontypes.USER_SAVE_SUCCESS:
      return userSaveSuccess(state, action);
    case actiontypes.USER_SAVE_FAIL:
      return userSaveFail(state, action);
    default:
      return state;
  }
};

export default reducer;
