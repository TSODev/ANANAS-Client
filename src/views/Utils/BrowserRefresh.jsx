import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "components/CustomButtons/Button.js";

import style from "assets/jss/material-kit-pro-react/modalStyle.js";

import * as actions from "../../MainStore/actions/index";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(style);

export const BrowserRefresh = (props) => {
  const [hasbeenRefreshed, sethasbeenRefreshed] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    if (props.location.pathname !== "/login-page") {
      sethasbeenRefreshed(props.refresh);
      //      props.logOut(props.xsrf);           // xsrf redux state has been reset due to refresh !
      props.history.push("/login-page");
    }
    return () => {};
  }, [props.refresh]);

  return (
    <div>
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal,
        }}
        open={hasbeenRefreshed}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => sethasbeenRefreshed(false)}
        aria-labelledby="classic-modal-slide-title"
        aria-describedby="classic-modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <Button
            simple
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            onClick={() => sethasbeenRefreshed(false)}
          >
            {" "}
            <Close className={classes.modalClose} />
          </Button>
          <h4 className={classes.modalTitle}>
            Rafraichissement du navigateur Web
          </h4>
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <p>
            Vous avez rafraichi la page! Il est impossible de restaurer les
            données dans l'état précédent... Veuillez vous reconnecter.
          </p>
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Button onClick={() => sethasbeenRefreshed(false)} color="secondary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  refresh: state.generic.refresh,
  xsrf: state.auth.xsrf,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onListMetadata: () => dispatch(actions.listAllMetadata()),
    onListDatafiles: () => dispatch(actions.listAllDatafile()),
    logOut: (token) => dispatch(actions.logOut(token)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BrowserRefresh)
);
