import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
// @material-ui/icons
import Slide from "@material-ui/core/Slide";

// core components
import Header from "components/Header/Header.js";
import HeaderLogout from "components/Header/HeaderLogout";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import HRAFilesWidget from "widgets/HRAFilesWidget.js";
import LNFilesWidget from "widgets/LNFilesWidget.js";
import PeopleWidget from "widgets/PeopleWidget";
import LNAbsencesWidget from "widgets/LNAbsencesWidget";
import HRAAbsencesWidget from "widgets/HRAAbsencesWidget";

import dashStyles from "assets/jss/material-kit-pro-react/views/dashboardStyle.js";
import modalStyle from "assets/jss/material-kit-pro-react/modalStyle.js";
import AnomaliesWidget from "widgets/AnomaliesWidget";

const styles = {
  ...dashStyles,
  ...modalStyle,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(styles);

const Dashboard = (props, { ...rest }) => {
  const classes = useStyles();

  return (
    <div className={classes.sectionDark}>
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
          color: "primary",
        }}
        {...rest}
      />
      <Parallax
        image={require("assets/img/dashboard-887843.jpg")}
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
                <h1 className={classes.title}>Tableau de Bord</h1>
                <h5>
                  (cliquer sur les entêtes des blocs pour accéder aux détails)
                </h5>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <GridContainer direction="row" justify="center" alignItems="flex-start">
          <GridItem xs={12} sm={12} md={8} lg={6}>
            <LNFilesWidget headerColor="rose" />
          </GridItem>

          <GridItem xs={12} sm={12} md={8} lg={6}>
            <HRAFilesWidget headerColor="warning" />
          </GridItem>

          <GridItem xs={12} sm={6} md={6} lg={4}>
            <LNAbsencesWidget headerColor="success" />
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={4}>
            <HRAAbsencesWidget headerColor="success" />
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={4}>
            <PeopleWidget headerColor="info" />
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={8}>
            <AnomaliesWidget headerColor="danger" />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    firstname: state.auth.firstname,
    lastname: state.auth.lastname,
    cookies: ownProps.cookies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
