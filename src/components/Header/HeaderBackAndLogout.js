/* eslint-disable */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import BackspaceRoundedIcon from "@material-ui/icons/BackspaceRounded";

// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-pro-react/components/headerLinksStyle.js";

import * as actions from "../../MainStore/actions/index";

const useStyles = makeStyles(styles);

const HeaderBackAndLogout = (props) => {
  // useEffect(() => {
  //   if (!props.logout_loading) props.history.push("/login-page");
  //   return () => {};
  // }, [props.logout_loading]);

  const [xsrf, setxsrf] = useState(props.xsrf);

  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const smoothScroll = (e, target) => {
    if (window.location.pathname === "/sections") {
      var isMobile = navigator.userAgent.match(
        /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
      );
      if (isMobile) {
        // if we are on mobile device the scroll into view will be managed by the browser
      } else {
        e.preventDefault();
        var targetScroll = document.getElementById(target);
        scrollGo(document.documentElement, targetScroll.offsetTop, 1250);
      }
    }
  };
  const scrollGo = (element, to, duration) => {
    var start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 20;

    var animateScroll = function () {
      currentTime += increment;
      var val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  };
  var onClickSections = {};

  const handleLogoutButton = (e) => {
    e.preventDefault();
    console.log(props.xsrf);
    props.logOut(props.xsrf);
    props.history.push("/login-page");
  };

  const handleBackButton = (e) => {
    e.preventDefault();
    //    props.logOut(props.token);
    props.history.push("/dashboard-page");
  };

  const { dropdownHoverColor } = props;
  const classes = useStyles();

  return (
    <List className={classes.list + " " + classes.mlAuto}>
      <ListItem className={classes.listItem}>
        <Button
          color={window.innerWidth < 960 ? "info" : "white"}
          onClick={(e) => handleBackButton(e)}
          className={classes.navButton}
          round
        >
          <BackspaceRoundedIcon className={classes.icons} /> Retour
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <div> </div>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color={window.innerWidth < 960 ? "info" : "white"}
          onClick={(e) => handleLogoutButton(e)}
          className={classes.navButton}
          round
        >
          <ExitToAppOutlinedIcon className={classes.icons} /> Deconnexion
        </Button>
      </ListItem>
    </List>
  );
};

HeaderBackAndLogout.defaultProps = {
  hoverColor: "primary",
};

HeaderBackAndLogout.propTypes = {
  dropdownHoverColor: PropTypes.oneOf([
    "dark",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose",
  ]),
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    firstname: state.auth.firstname,
    lastname: state.auth.lastname,
    xsrf: state.auth.xsrf,
    logout_loading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: (token) => dispatch(actions.logOut(token)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HeaderBackAndLogout)
);
