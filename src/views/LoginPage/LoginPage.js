/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Favorite from "@material-ui/icons/Favorite";
import Face from "@material-ui/icons/Face";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import loginPageStyle from "assets/jss/material-kit-pro-react/views/loginPageStyle.js";

import image from "assets/img/pineapple-1704339_1920.jpg";

import { useTheme } from "@material-ui/core/styles";

import axios from "../../axios-atlas";
import * as actions from "../../MainStore/actions/index";
import TSODEV_Footer from "components/TSODev_Footer/Footer";

const useStyles = makeStyles(loginPageStyle);

const LoginPage = (props) => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const theme = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });

  useEffect(() => {
    console.log("[LoginPage]");
    if (props.isAuthenticated) {
      //      props.tokenSet(props.cookies.get("XSRF-TOKEN"));
      props.history.push({ pathname: "/landing-page" });
    }
  }, [props.isAuthenticated]);
  const classes = useStyles();

  // const signin = (email, password) => {
  //   const userInfo = {
  //     email: email,
  //     password: password,
  //   };
  //   axios
  //     .post("/login", userInfo)
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(error.message);
  //     });
  // };

  const signUpHandler = (event) => {
    event.preventDefault();
    //    console.log("onClick :", event, props);
    props.history.push(
      //      "/signup-page" + "/firstname=" + firstname + "/email=" + email
      {
        pathname: "/signup-page",
        //      state: { firstname, email },
      }
    );
  };

  const emailChangeHandler = (event) => {
    event.preventDefault();
    setemail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    event.preventDefault();
    setpassword(event.target.value);
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    //    console.log("onSubmit :", firstname, email, password);
    props.onAuth(email, password);
  };

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="ANANAS"
        // links={<HeaderLinks dropdownHoverColor="info" />}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card>
                <form onSubmit={onSubmitForm} className={classes.form}>
                  <CardHeader
                    color="primary"
                    signup
                    className={classes.cardHeader}
                  >
                    <h4 className={classes.cardTitle}>Connexion</h4>
                  </CardHeader>
                  <p className={classes.description + " " + classes.textCenter}>
                    Veuillez vous connecter
                  </p>
                  <CardBody signup>
                    <CustomInput
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                        required: true,
                      }}
                      inputProps={{
                        placeholder: "Adresse Email...",
                        type: "email",
                        onChange: (e) => emailChangeHandler(e),
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      id="pass"
                      formControlProps={{
                        fullWidth: true,
                        required: true,
                      }}
                      inputProps={{
                        placeholder: "Mot de Passe",
                        type: "password",
                        onChange: (e) => passwordChangeHandler(e),
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icon className={classes.inputIconsColor}>
                              lock_utline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                  </CardBody>
                  <div className={classes.textCenter}>
                    <Button
                      type="submit"
                      round
                      color="primary"
                      size="lg"
                      // onClick={(e) => {
                      //   LoginHandler(e);
                      // }}
                    >
                      Connecte moi !
                    </Button>
                    <Button
                      simple
                      size="lg"
                      color="primary"
                      className={classes.textCenter}
                      onClick={(e) => signUpHandler(e)}
                    >
                      Créé moi un compte stp
                    </Button>
                  </div>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <TSODEV_Footer />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    firstname: state.auth.firstname,
    lastname: state.auth.lastname,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.signIn(email, password)),
    tokenSet: (token) => dispatch(actions.setToken(token)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginPage)
);
