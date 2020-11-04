/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as moment from "moment";

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
import Tooltip from "@material-ui/core/Tooltip";
// sections for this page
import HeaderLogout from "components/Header/HeaderLogout.js";
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
import profilePageStyle from "assets/jss/material-kit-pro-react/views/profilePageStyle.js";

import christian from "assets/img/faces/christian.jpg";
import avatar from "assets/img/default-avatar.png";

import * as actions from "../../MainStore/actions/index";

const styles = {
  ...peopleStyle,
  ...tablestyle,
  ...profilePageStyle,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(styles);

const PeopleDetailsPage = (props) => {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const [viewDetails, setviewDetails] = React.useState(false);
  const [id, setid] = useState();
  const [people, setpeople] = useState({});
  const [HRA, setHRA] = useState([]);
  const [details, setdetails] = useState();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });

  useEffect(() => {
    setid(props.match.params.id);
    setHRA(
      props.HRAAbsences.filter((a) => a.people_id === props.match.params.id)
    );
    return () => {};
  }, [props.match.params]);

  useEffect(() => {
    const Anoid = Number(props.match.params.id);
    const myPeople = props.people.find((p) => p.people_id === Nid);
    setpeople(myPeople);
    return () => {};
  }, [props.people]);

  const onPeopleRowClickHandler = (event, rowData) => {
    event.preventDefault();
    //    console.log("Click on Row: ", rowData);
    setdetails(rowData);
    setviewDetails(true);
  };

  const HandleGoButton = (e) => {
    e.preventDefault();
    props.onPeopleAnalyse(people.people_id);
  };

  return (
    <div>
      <Header
        brand="ANANAS"
        links={<HeaderLogout dropdownHoverColor="info" />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 300,
          color: "info",
        }}
      />
      <Parallax
        image={require("assets/img/people_at_work-3184291.jpg")}
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
                <h1 className={classes.title}>Détails</h1>
                <h4></h4>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
              <div className={classes.profile}>
                <div>
                  <img src={avatar} alt="..." className={imageClasses} />
                </div>
                <div className={classes.name}>
                  <h3 className={classes.title}>{people.fullname}</h3>
                </div>
              </div>
            </GridItem>
            <GridItem>
              <GridContainer justify="center">
                <GridItem xs={3} sm={3} md={3} lg={3}>
                  <h6>Matricule : {people.matricule}</h6>
                </GridItem>
                <GridItem xs={3} sm={3} md={3} lg={3}>
                  <h6>TGI : {people.tgi}</h6>
                </GridItem>
                <GridItem xs={3} sm={3} md={3} lg={3}>
                  <h6>
                    entrée : {moment(people.entree).format("DD MMMM YYYY")}
                  </h6>
                </GridItem>
                {people.sortie !== "" ? (
                  <GridItem xs={3} sm={3} md={3} lg={3}>
                    <h6>
                      sortie : {moment(people.sortie).format("DD MMMM YYYY")}
                    </h6>
                  </GridItem>
                ) : (
                  <React.Fragment />
                )}
              </GridContainer>
            </GridItem>
            <GridContainer justify="center">
              <GridItem>
                <Button
                  color="danger"
                  size="lg"
                  onClick={(e) => HandleGoButton(e)}
                  className={classes.navButton}
                >
                  <div>
                    <i className="fas fa-redo-alt" /> Lancer une analyse...
                  </div>
                </Button>
              </GridItem>
            </GridContainer>
          </GridContainer>
        </div>
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
    people: state.people.people,
    HRAAbsences: state.HRA_absence.absences,
    HRAloaded: state.HRA_absence.loaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPeopleAnalyse: (people_id) =>
      dispatch(actions.anomaliesAnalyse(people_id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PeopleDetailsPage)
);
