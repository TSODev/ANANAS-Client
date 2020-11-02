import axios from "../../../axios-atlas";
import * as actions from "../actionTypes";
//import * as utils from '../../../utilities/utils';
//import * as type from '../types/AuthTypes';

export const usersListStart = () => {
  return {
    type: actions.USERS_LIST_START,
  };
};

export const usersListSuccess = (data) => {
  const loadedUsers = [];
  data.users.forEach((user, index) => {
    const record = user;
    record.index = index;
    loadedUsers.push(record);
  });
  //    console.log('[ACTION-USER] - List Success ', loadedUsers, '/', data);
  return {
    type: actions.USERS_LIST_SUCCESS,
    data: { users: loadedUsers },
  };
};

export const usersListFail = (error) => {
  return {
    type: actions.USERS_LIST_FAIL,
    error: error,
  };
};

export const userSaveStart = () => {
  return {
    type: actions.USER_SAVE_START,
  };
};

export const userSaveSuccess = (data) => {
  return {
    type: actions.USER_SAVE_SUCCESS,
    data: data,
  };
};

export const userSaveFail = (error) => {
  return {
    type: actions.USER_SAVE_FAIL,
    error: error,
  };
};

export const userDeleteStart = () => {
  return {
    type: actions.USER_DELETE_START,
  };
};

export const userDeleteSuccess = (data) => {
  return {
    type: actions.USER_DELETE_SUCCESS,
    data: data,
  };
};

export const userListMustBeUpdated = () => {
  return {
    type: actions.USER_LIST_MUST_BE_UPDATED,
  };
};

export const userDeleteFail = (error) => {
  return {
    type: actions.USER_DELETE_FAIL,
    error: error,
  };
};

export const error = (error) => {
  return {
    type: actions.ERROR_SHOW,
    error: { severity: error.severity, message: error.message },
  };
};

export const userShow = (user, key) => {
  return {
    type: actions.USER_SHOW,
    user: user,
    key: key,
  };
};

export const userHide = () => {
  return {
    type: actions.USER_HIDE,
    key: null,
  };
};

export const userModeView = () => {
  return {
    type: actions.USER_MODE_VIEW,
  };
};

export const userModeEdit = () => {
  return {
    type: actions.USER_MODE_EDIT,
  };
};

export const listAllUsers = () => {
  return (dispatch) => {
    dispatch(usersListStart());
    axios
      .get("/users/", {
        validateStatus: function (status) {
          return status < 400; // Reject only if the status code is greater than or equal to 500
        },
      })
      .then((response) => dispatch(usersListSuccess(response.data)))
      .catch((err) => {
        dispatch(usersListFail(err));
        dispatch(error({ severity: "error", message: err.message }));
      });
  };
};

export const userSave = (user) => {
  return (dispatch) => {
    dispatch(userSaveStart());
    const userInfo = user;
    const id = user.user_id;
    axios
      .put("/user/" + id, userInfo)
      .then((response) => {
        dispatch(userSaveSuccess(response.data));
      })
      .catch((err) => {
        dispatch(userSaveFail(err));
        dispatch(error({ severity: "error", message: err.message }));
      });
  };
};

export const userDelete = (id) => {
  console.log("User Action Delete", id);
  return (dispatch) => {
    dispatch(userDeleteStart());
    axios
      .delete("/user/" + id)
      .then((response) => {
        dispatch(userDeleteSuccess(response.data));
      })
      .catch((err) => {
        dispatch(userDeleteFail(err));
        dispatch(error({ severity: "error", message: err.message }));
      });
  };
};

export const showUser = (user, key) => {
  //    console.log('Action User: ', user, key);
  return (dispatch) => {
    dispatch(userShow(user, key));
  };
};

export const hideUser = () => {
  return (dispatch) => {
    dispatch(userHide());
  };
};

export const modeView = () => {
  return (dispatch) => {
    dispatch(userModeView());
  };
};

export const modeEdit = () => {
  return (dispatch) => {
    dispatch(userModeEdit());
  };
};
