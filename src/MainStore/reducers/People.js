import * as actiontypes from "../actions/actionTypes";

import { updateObject } from "../../utilities/utils";
//import { act } from 'react-dom/test-utils';

const initialState = {
  people: [
    {
      people_id: "",
      email: "",
      fullname: "",
      lastname: "",
      firstname: "",
    },
  ],
  error: "",
  loading: false,
  peopleListAvailable: false,
  //    selected: {},
  key: null,
  showSelected: false,
  delete_people_id: "",
};

//type State = typeof initialState;

const peopleListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    peopleListAvailable: false,
    showSelected: false,
    //                            selected: {},
  });
};

const peopleListSuccess = (state, action) => {
  return updateObject(state, {
    people: action.data.people,
    error: null,
    loading: false,
    peopleListAvailable: true,
  });
};

const peopleListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    peopleListAvailable: false,
  });
};

const peopleListMustBeUpdated = (state, action) => {
  const updatedPeople = state.users.map(
    (people, index) => (people.key = index)
  );
  return updateObject(state, {
    people: updatedPeople,
  });
};

const peopleDeleteStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const peopleDeleteSuccess = (state, action) => {
  const index = state.key;
  const updatedPeople = state.people
    .filter((people) => people.index !== index)
    .map((people, index) => {
      const updatedPeople = {
        ...people,
        index: index,
      };
      return updatedPeople;
    });
  return updateObject(state, {
    error: null,
    loading: false,
    people: updatedPeople,
    key: null,
  });
};

const peopleDeleteFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const peopleSaveStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const peopleSaveSuccess = (state, action) => {
  const updatedPeople = [...state.people];
  const index = action.data.people.index;
  updatedPeople[index] = action.data.people;
  return updateObject(state, {
    error: null,
    loading: false,
    people: updatedPeople,
  });
};

const peopleSaveFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actiontypes.PEOPLE_LIST_START:
      return peopleListStart(state, action);
    case actiontypes.PEOPLE_LIST_SUCCESS:
      return peopleListSuccess(state, action);
    case actiontypes.PEOPLE_LIST_FAIL:
      return peopleListFail(state, action);
    case actiontypes.PEOPLE_LIST_MUST_BE_UPDATED:
      return peopleListMustBeUpdated(state, action);
    case actiontypes.PEOPLE_DELETE_START:
      return peopleDeleteStart(state, action);
    case actiontypes.PEOPLE_DELETE_SUCCESS:
      return peopleDeleteSuccess(state, action);
    case actiontypes.PEOPLE_DELETE_FAIL:
      return peopleDeleteFail(state, action);
    case actiontypes.PEOPLE_SAVE_START:
      return peopleSaveStart(state, action);
    case actiontypes.PEOPLE_SAVE_SUCCESS:
      return peopleSaveSuccess(state, action);
    case actiontypes.PEOPLE_SAVE_FAIL:
      return peopleSaveFail(state, action);
    default:
      return state;
  }
};

export default reducer;
