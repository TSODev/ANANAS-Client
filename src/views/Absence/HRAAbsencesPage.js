/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Footer from "components/Footer/Footer.js";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// sections for this page
import HeaderBackAndLogout from "components/Header/HeaderBackAndLogout.js";
import SectionLatestOffers from "views/EcommercePage/Sections/SectionLatestOffers.js";
import SectionProducts from "views/EcommercePage/Sections/SectionProducts.js";
import SectionBlog from "views/EcommercePage/Sections/SectionBlog.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Slide from "@material-ui/core/Slide";
import InputAdornment from "@material-ui/core/InputAdornment";

import MaterialTable, { MTableToolbar } from "material-table";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import Switch from "@material-ui/core/Switch";

import VisibilityIcon from "@material-ui/icons/Visibility";
import Close from "@material-ui/icons/Close";

import tablestyle from "assets/jss/material-kit-pro-react/views/componentsSections/contentAreas.js";
import peopleStyle from "assets/jss/material-kit-pro-react/views/peopleStyle.js";
import HRAAbsencesTable from "./HRAAbsencesTable";

const styles = {
  ...peopleStyle,
  ...tablestyle,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(styles);

const HRAAbsencesPage = (props) => {
  const [tabcols, settabcols] = useState([
    "id",
    "matricule",
    "tgi",
    "Nom Complet",
    "prenom",
    "nom",
    "posact",
    "entree",
    "sortie",
  ]);
  const [absencesArray, setabsencesArray] = useState([]);
  const [viewDetails, setviewDetails] = React.useState(false);
  const [details, setdetails] = useState();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });

  useEffect(() => {
    setabsencesArray(props.absences);
    return () => {};
  }, [props.absences]);

  const onAbsenceRowClickHandler = (event, rowData) => {
    event.preventDefault();
    console.log("Click on Row: ", rowData);
    props.history.replace("/people-details-page/" + rowData.people_id);
    //setdetails(rowData);
    //setviewDetails(true);
  };

  const classes = useStyles();
  return (
    <div>
      <Header
        brand="ANANAS"
        links={<HeaderBackAndLogout dropdownHoverColor="info" />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 300,
          color: "primary",
        }}
      />
      <Parallax
        image={require("assets/img/calendar-1.jpg")}
        filter="dark"
        small
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem
              md={8}
              sm={8}
              className={classNames(
                classes.mlAuto,
                classes.mrAuto,
                classes.textCenter
              )}
            >
              <div className={classes.brand}>
                <h1 className={classes.title}>Absences HRA</h1>
                <h4></h4>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <HRAAbsencesTable data={absencesArray} />
      </div>

      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal + " " + classes.modalLarge,
        }}
        open={viewDetails}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setviewDetails(false)}
        aria-labelledby="large-modal-slide-title"
        aria-describedby="large-modal-slide-description"
      >
        <DialogTitle
          id="large-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <Button
            simple
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            onClick={() => setviewDetails(false)}
          >
            {" "}
            <Close className={classes.modalClose} />
          </Button>
          <h2 className={classes.modalTitle}>
            {" "}
            ----- Détails Collaborateur -----
          </h2>
        </DialogTitle>
        <DialogContent
          id="large-modal-slide-description"
          className={classes.modalBody}
        >
          <p>...</p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    firstname: state.auth.firstname,
    lastname: state.auth.lastname,
    cookies: ownProps.cookies,
    absences: state.HRA_absence.absences,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HRAAbsencesPage)
);
