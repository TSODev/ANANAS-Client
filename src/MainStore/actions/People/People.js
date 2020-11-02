import axios from "../../../axios-atlas";
import * as actions from "../actionTypes";
//import * as utils from '../../../utilities/utils';
//import * as type from '../types/AuthTypes';

export const peopleListStart = () => {
  return {
    type: actions.PEOPLE_LIST_START,
  };
};

export const peopleListSuccess = (data) => {
  const loadedPeople = [];
  data.people.forEach((people, index) => {
    const record = people;
    record.index = index;
    loadedPeople.push(record);
  });
  //    console.log('[ACTION-USER] - List Success ', loadedPeople, '/', data);
  return {
    type: actions.PEOPLE_LIST_SUCCESS,
    data: { people: loadedPeople },
  };
};

export const peopleListFail = (error) => {
  return {
    type: actions.PEOPLE_LIST_FAIL,
    error: error,
  };
};

export const peopleSaveStart = () => {
  return {
    type: actions.USER_SAVE_START,
  };
};

export const peopleSaveSuccess = (data) => {
  return {
    type: actions.USER_SAVE_SUCCESS,
    data: data,
  };
};

export const peopleSaveFail = (error) => {
  return {
    type: actions.USER_SAVE_FAIL,
    error: error,
  };
};

export const peopleDeleteStart = () => {
  return {
    type: actions.USER_DELETE_START,
  };
};

export const peopleDeleteSuccess = (data) => {
  return {
    type: actions.USER_DELETE_SUCCESS,
    data: data,
  };
};

export const peopleListMustBeUpdated = () => {
  return {
    type: actions.USER_LIST_MUST_BE_UPDATED,
  };
};

export const peopleDeleteFail = (error) => {
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

export const listAllPeople = () => {
  return (dispatch) => {
    dispatch(peopleListStart());
    axios
      .get("/allpeople/", {
        validateStatus: function (status) {
          return status < 400; // Reject only if the status code is greater than or equal to 500
        },
      })
      .then((response) => dispatch(peopleListSuccess(response.data)))
      .catch((err) => {
        dispatch(peopleListFail(err));
        dispatch(error({ severity: "error", message: err.message }));
      });
  };
};

export const peopleSave = (people) => {
  return (dispatch) => {
    dispatch(peopleSaveStart());
    const peopleInfo = people;
    const id = people.people_id;
    axios
      .put("/people/" + id, peopleInfo)
      .then((response) => {
        dispatch(peopleSaveSuccess(response.data));
      })
      .catch((err) => {
        dispatch(peopleSaveFail(err));
        dispatch(error({ severity: "error", message: err.message }));
      });
  };
};

export const peopleDelete = (id) => {
  console.log("User Action Delete", id);
  return (dispatch) => {
    dispatch(peopleDeleteStart());
    axios
      .delete("/people/" + id)
      .then((response) => {
        dispatch(peopleDeleteSuccess(response.data));
      })
      .catch((err) => {
        dispatch(peopleDeleteFail(err));
        dispatch(error({ severity: "error", message: err.message }));
      });
  };
};
