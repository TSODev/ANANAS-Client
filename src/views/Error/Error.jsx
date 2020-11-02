import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
//import { Alert, AlertTitle } from "@material-ui/lab";

import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Clearfix from "components/Clearfix/Clearfix.js";
import * as actions from "../../MainStore/actions/index";

import * as utils from "../../utilities/utils";
import { useTheme } from "@material-ui/core/styles";

import snackBarContentStyle from "assets/jss/material-kit-pro-react/components/snackbarContentStyle.js";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 900,
    minWidth: 600,
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  ...snackBarContentStyle,
}));

const Error = React.forwardRef((props, ref) => {
  const theme = useTheme();
  const classes = useStyles();

  const [open, setopen] = useState(false);
  const [severity, setseverity] = useState("");

  useEffect(() => {
    setopen(props.open);
    return () => {};
  }, [props.open]);

  useEffect(() => {
    setseverity(utils.capitalize(props.severity));
    return () => {};
  }, [props.severity]);

  const closeHandler = () => {
    setopen(false);
    props.onClose();
  };

  const anchorOrigin = { vertical: "bottom", horizontal: "center" };
  //  const severityMessage = utils.capitalize(props.severity);

  if (open)
    return (
      <div ref={ref} className={classes.root}>
        <Snackbar
          anchorOrigin={anchorOrigin}
          open={props.open}
          // autoHideDuration={props.duration}
          onClose={closeHandler}
        >
          <SnackbarContent
            message={
              <span>
                <b>
                  {severity}
                  {" - "}
                </b>
                <span>{props.message}</span>
              </span>
            }
            close
            color="danger"
            icon="info_outline"
          />
        </Snackbar>
        <Clearfix />
      </div>
    );
});

const mapStateToProps = (state) => {
  return {
    open: state.error.open,
    severity: state.error.severity,
    message: state.error.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClose: () => dispatch(actions.closeError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Error);
