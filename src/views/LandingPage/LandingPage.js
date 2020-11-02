/*eslint-disable*/

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLogout from "components/Header/HeaderLogout.js";
import Parallax from "components/Parallax/Parallax.js";

import landingPageStyle from "assets/jss/material-kit-pro-react/views/landingPageStyle.js";
import infoAreaStyle from "assets/jss/material-kit-pro-react/components/infoStyle.js";

import * as actions from "../../MainStore/actions/index";
import TSODEV_Footer from "components/TSODev_Footer/Footer";

const styles = {
  ...infoAreaStyle,
  ...landingPageStyle,
};

const useStyles = makeStyles(styles);

const LandingPage = (props, { ...rest }) => {
  // useEffect(() => {
  //   props.onLoadMetadata();
  // }, []);

  const [shouldInit, setshouldInit] = useState(true);
  const [isNotReady, setisNotReady] = useState(true);

  useEffect(() => {
    console.log("[LandingPage]");
    if (!props.isAuthenticated) props.history.replace("/login-page");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    //    setshouldInit(true);
    //    props.onLoadMetadata();
  }, []);
  const classes = useStyles();

  useEffect(() => {
    if (shouldInit) {
      props.onInitMetadata();
      props.onInitDatafiles();
      props.onInitLNAbsences();
      props.onInitHRAAbsences();

      props.onListLNAbsences();
      props.onListHRAAbsences();
    }
    setshouldInit(false);
    //    setisNotReady(false);
    return () => {};
  }, []);

  useEffect(() => {
    setisNotReady(!props.ln_loaded);
    return () => {};
  }, [props.ln_loaded]);

  const handleGoButton = (e) => {
    e.preventDefault();
    props.history.push("/dashboard-page");
  };

  return (
    <div>
      <Header
        color="transparent"
        brand="ANANAS"
        links={
          <HeaderLogout
            dropdownHoverColor="info"
            token={props.cookies.get("XSRF-TOKEN")}
          />
        }
        fixed
        changeColorOnScroll={{
          height: 300,
          color: "info",
        }}
        {...rest}
      />
      <Parallax
        image={require("assets/img/pineapples-918921_1920.jpg")}
        filter="dark"
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <h4>Bonjour {props.firstname}</h4>
            </GridItem>
            <GridItem xs={12} sm={6} md={6}>
              <h1 className={classes.title}>Recherche d'anomalies.</h1>

              <h4>
                Cette application recherche des anomalies sur les fichiers
                d'absences issus de HRA et LN
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                onClick={(e) => handleGoButton(e)}
                className={classes.navButton}
                disabled={!props.ln_loaded}
              >
                {props.ln_loaded ? (
                  <div>
                    <i className="fas fa-play" /> Allons-y!
                  </div>
                ) : (
                  <div>
                    <i className="fas fa-hand-paper" /> Préparation...
                  </div>
                )}
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      {/* <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <SectionProduct />
        </div>
      </div> */}
      <TSODEV_Footer />{" "}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    firstname: state.auth.firstname,
    lastname: state.auth.lastname,
    cookies: ownProps.cookies,
    metadata: state.generic.metadata,
    ln_loaded: state.LN_absence.loaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.signIn(email, password)),
    onLoadMetadata: () => dispatch(actions.listAllMetadata()),
    onInitLNAbsences: () => dispatch(actions.LN_absences_Init()),
    onInitMetadata: () => dispatch(actions.initMetadata()),
    onInitDatafiles: () => dispatch(actions.initDatafiles()),
    onListMetadata: () => dispatch(actions.listAllMetadata()),
    onListDatafiles: () => dispatch(actions.listAllDatafile()),
    onListLNAbsences: () => dispatch(actions.LN_listAllAbsences()),
    onInitHRAAbsences: () => dispatch(actions.HRA_absences_Init()),
    onListHRAAbsences: () => dispatch(actions.HRA_listAllAbsences()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LandingPage)
);
