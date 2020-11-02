import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// core components
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { makeStyles } from "@material-ui/core/styles";

import Slide from "@material-ui/core/Slide";

import PeopleOutlineOutlinedIcon from "@material-ui/icons/PeopleOutlineOutlined";
import LocalOffer from "@material-ui/icons/LocalOffer";
import EventIcon from "@material-ui/icons/Event";

import javascriptStyle from "assets/jss/material-kit-pro-react/views/componentsSections/javascriptStyles.js";
import modalStyle from "assets/jss/material-kit-pro-react/modalStyle.js";
import dashStyle from "assets/jss/material-kit-pro-react/views/dashboardStyle.js";
import cardStyle from "assets/jss/material-kit-pro-react/components/cardStyle.js";
import cardHeaderStyle from "assets/jss/material-kit-pro-react/components/cardHeaderStyle.js";
import cardBodyStyle from "assets/jss/material-kit-pro-react/components/cardBodyStyle.js";
import cardFooterStyle from "assets/jss/material-kit-pro-react/components/cardFooterStyle.js";
import typoStyle from "assets/jss/material-kit-pro-react/components/typographyStyle.js";

import * as actions from "../MainStore/actions/index";

const styles = {
  ...cardStyle,
  ...cardHeaderStyle,
  ...cardBodyStyle,
  ...cardFooterStyle,
  ...dashStyle,
  ...typoStyle,
  ...modalStyle,
  ...javascriptStyle,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(styles);

const LNAbsencesWidget = (props, { ...rest }) => {
  const classes = useStyles();

  const [nbAbs, setnbAbs] = useState(0);

  // useEffect(() => {
  //   setnbAbs(props.absences.length);
  //   return () => {};
  // }, [props.new_absences_loaded, props.absences]);

  useEffect(() => {
    setnbAbs(props.absences.length);
    return () => {};
  }, []);

  const openLNHandler = (e) => {
    e.preventDefault();
    props.onLoadAllLNAbsenceView();
    props.history.push("/LNabsence-page");
  };

  return (
    <div className={classes.container}>
      <Card>
        <CardHeader
          onClick={(e) => {
            openLNHandler(e);
          }}
          color={props.headerColor}
        >
          <CardIcon color={props.headerColor}>
            <EventIcon fontSize="large" />
          </CardIcon>
          <p className={classes.cardCategory}>Absences dans fichier LN</p>
        </CardHeader>
        <CardBody>
          <h3 className={classes.cardTitle}>
            {nbAbs}
            <small> absences</small>
          </h3>
        </CardBody>
        <CardFooter>
          <div className={classes.stats}>
            <LocalOffer />
            dans fichier LN
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    firstname: state.auth.firstname,
    lastname: state.auth.lastname,
    cookies: ownProps.cookies,
    new_absences_loaded: state.LN_absence.loaded,
    absences: state.LN_absence.absences,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadAllLNAbsenceView: () => dispatch(actions.LN_listAllAbsences()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LNAbsencesWidget)
);
