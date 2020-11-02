import * as actiontypes from "../actions/actionTypes";

import { updateObject } from "../../utilities/utils";

const initialState = {
  open: false,
  severity: "error",
  message: "This is a default eror message",
};

const errorShow = (state, action) => {
  return updateObject(state, {
    open: true,
    severity: action.error.severity,
    message: action.error.message,
  });
};

const errorClose = (state, action) => {
  return updateObject(state, { open: false, message: "", severity: "info" });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actiontypes.ERROR_SHOW:
      return errorShow(state, action);
    case actiontypes.ERROR_CLOSE:
      return errorClose(state, action);
    default:
      return state;
  }
};

export default reducer;
