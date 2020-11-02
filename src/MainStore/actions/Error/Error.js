import * as actions from '../actionTypes'


export const errorShow = (error) => {
    return {
        type: actions.ERROR_SHOW,
        error: error                            // error should be {severity (error, warning, info, success), message}
    }
}

export const errorClose = () => {
    return {
        type: actions.ERROR_CLOSE
    }
}

export const showError = (err) => {
    return (dispatch) => {
        dispatch(errorShow(err));
    }
}

export const closeError = () => {
    return (dispatch) => {
        dispatch(errorClose());
    }
}
