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
import Footer from "components/Footer/Footer.js";

import AnomaliesTable from "views/Anomalies/AnomaliesTable";
import LNAbsencesTable from "views/Absence/LNAbsencesTable";
import HRAAbsencesTable from "views/Absence/HRAAbsencesTable";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

// sections for this page
import HeaderBackAndLogout from "components/Header/HeaderBackAndLogout.js";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Slide from "@material-ui/core/Slide";

// @material-ui/icons

import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import EventIcon from "@material-ui/icons/Event";
import TodayIcon from "@material-ui/icons/Today";

// core components
import CustomTabs from "components/CustomTabs/CustomTabs.js";

import Close from "@material-ui/icons/Close";

import tablestyle from "assets/jss/material-kit-pro-react/views/componentsSections/contentAreas.js";
import peopleStyle from "assets/jss/material-kit-pro-react/views/peopleStyle.js";
import profilePageStyle from "assets/jss/material-kit-pro-react/views/profilePageStyle.js";

import avatar from "assets/img/default-avatar.png";

import * as actions from "../../MainStore/actions/index";

const styles = {
  ...profilePageStyle,
  ...peopleStyle,
  ...tablestyle,
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
  const [hasPeople, sethasPeople] = useState(false);

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
    const Nid = Number(props.match.params.id);
    if (props.people !== undefined) {
      const myPeople = props.people.find((p) => p.people_id === Nid);
      setpeople(myPeople);
      sethasPeople(true);
    }
  }, [props.people]);

  // const onPeopleRowClickHandler = (event, rowData) => {
  //   event.preventDefault();
  //   //    console.log("Click on Row: ", rowData);
  //   setdetails(rowData);
  //   setviewDetails(true);
  // };

  // const HandleGoButton = (e) => {
  //   e.preventDefault();
  //   props.onPeopleAnalyse(people.people_id);
  // };

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
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12} lg={12}>
            <div className={classes.profile}>
              <div>
                <img src={avatar} alt="..." className={imageClasses} />
              </div>
              <div className={classes.name}>
                <h3 className={classes.title}>
                  <b>{people.fullname}</b>
                </h3>
              </div>
            </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={12}></GridItem>

          <GridItem xs={3} sm={3} md={3} lg={3} lg={3}>
            <h5>
              Matricule : <b>{people.matricule}</b>
            </h5>
          </GridItem>
          <GridItem xs={3} sm={3} md={3} lg={3} lg={3}>
            <h5>
              TGI : <b>{people.tgi}</b>
            </h5>
          </GridItem>
          <GridItem xs={3} sm={3} md={3} lg={3} lg={3}>
            <h5>
              entrée : <b>{moment(people.entree).format("DD MMMM YYYY")}</b>
            </h5>
          </GridItem>
          {people.sortie !== "" ? (
            <GridItem xs={3} sm={3} md={3} lg={3} lg={3}>
              <h5>
                sortie : <b>{moment(people.sortie).format("DD MMMM YYYY")}</b>
              </h5>
            </GridItem>
          ) : (
            <React.Fragment />
          )}
          <GridItem xs={12} sm={12} md={12} lg={12}>
            <div>
              <CustomTabs
                headerColor="primary"
                tabs={[
                  {
                    tabName: "Anomalies",
                    tabIcon: ErrorOutlineIcon,
                    tabContent: (
                      <AnomaliesTable
                        DB={props.anomalies.filter(
                          (a) => a.fullname === people.fullname
                        )}
                      />
                    ),
                  },
                  {
                    tabName: "Absences HRA",
                    tabIcon: EventIcon,
                    tabContent: (
                      <HRAAbsencesTable
                        data={props.HRAAbsences.filter(
                          (a) => a.fullname === people.fullname
                        )}
                      />
                    ),
                  },
                  {
                    tabName: "Absences LN",
                    tabIcon: TodayIcon,
                    tabContent: (
                      <LNAbsencesTable
                        data={props.LNAbsences.filter(
                          (a) => a.fullname === people.fullname
                        )}
                      />
                    ),
                  },
                ]}
              />
            </div>
          </GridItem>
        </GridContainer>
      </div>
      <Footer
        content={
          <div>
            <div className={classes.left}>
              <List className={classes.list}>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="https://www.creative-tim.com/?ref=mkpr-landing"
                    target="_blank"
                    className={classes.block}
                  >
                    TSODev
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="https://www.creative-tim.com/presentation?ref=mkpr-landing"
                    target="_blank"
                    className={classes.block}
                  >
                    A propos
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a href="//blog.creative-tim.com/" className={classes.block}>
                    Blog
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="https://www.creative-tim.com/license?ref=mkpr-landing"
                    target="_blank"
                    className={classes.block}
                  >
                    Licenses
                  </a>
                </ListItem>
              </List>
            </div>
            <div className={classes.right}>
              &copy; {1900 + new Date().getYear()} , par{" "}
              {/* <Favorite className={classes.icon} /> by{" "} */}
              <a
                href="https://www.creative-tim.com/?ref=mkpr-landing"
                target="_blank"
              >
                TSODev
              </a>{" "}
              pour vous simplifier la tâche.
            </div>
          </div>
        }
      />

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
    LNAbsences: state.LN_absence.absences,
    HRAloaded: state.HRA_absence.loaded,
    anomalies: state.anomalies.anomalies,
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
