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
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.js";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import WarningRoundedIcon from "@material-ui/icons/WarningRounded";

// core components
import InfoArea from "components/InfoArea/InfoArea.js";

import { makeStyles } from "@material-ui/core/styles";

import Slide from "@material-ui/core/Slide";

import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import PeopleOutlineOutlinedIcon from "@material-ui/icons/PeopleOutlineOutlined";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";

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

const AnomaliesWidget = (props, { ...rest }) => {
  const classes = useStyles();

  const [nbAnomalies, setnbAnomalies] = useState(0);
  const [nbetat1, setnbetat1] = useState(0);
  const [nbetat2, setnbetat2] = useState(0);
  const [nbetat3, setnbetat3] = useState(0);
  const [nbfromHRA, setnbfromHRA] = useState(0);
  const [nbfromLN, setnbfromLN] = useState(0);
  const [people, setpeople] = useState([]);
  const [currentPeople, setcurrentPeople] = useState(0);
  const [fileIsLoading, setfileIsLoading] = useState(false);
  const [AnoDBlasLoaded, setAnoDBlasLoaded] = useState(null);
  const [viewDetails, setviewDetails] = useState(false);

  useEffect(() => {
    setpeople(props.people);
    return () => {};
  }, [props.people]);
  // useEffect(() => {
  //   setnbAnomalies(props.anomalies);
  //   return () => {};
  // }, [props.anomalies]);

  const openAnomalies = (e) => {
    console.log("People Widget Header clicked");
    console.log("So let's go !");
    e.preventDefault();
    props.history.push("/anomalies-page");
  };

  const HandleGoButton = (e) => {
    e.preventDefault();
    setviewDetails(true);
  };

  const handleContinueButton = (e) => {
    e.preventDefault();
    setfileIsLoading(true);
    props.onAnomaliesCleared();
    setTimeout(() => {
      props.onBulkAnalyse();
    }, 500);
    setviewDetails(false);
  };

  useEffect(() => {
    const anoInDB = props.metadata.find(
      (m) => m.metadata_group === "ANOMALIES" && m.metadata_key === "lastLoaded"
    );
    if (anoInDB !== undefined) setAnoDBlasLoaded(anoInDB.metadata_value);
    if (anoInDB !== null) props.onAnomaliesList();
    return () => {};
  }, []);

  useEffect(() => {
    if (props.anomalies_loaded) props.onAnomaliesList();
    return () => {};
  }, [props.anomalies_loaded]);

  useEffect(() => {
    setfileIsLoading(props.anomalies_loading);
    return () => {};
  }, [props.anomalies_loading]);

  useEffect(() => {
    if (props.anomalies_listloaded) {
      setnbAnomalies(props.anomalies.length);
      setnbetat1(props.anomalies.filter((a) => a.etat === 1).length);
      setnbetat2(props.anomalies.filter((a) => a.etat === 2).length);
      setnbetat3(props.anomalies.filter((a) => a.etat === 3).length);
      setnbfromHRA(
        props.anomalies.filter((a) => a.anomalie_from === "HRA").length
      );
      setnbfromLN(
        props.anomalies.filter((a) => a.anomalie_from === "LN").length
      );
      setfileIsLoading(false);
    }
    return () => {};
  }, [props.anomalies_listloaded]);

  useEffect(() => {
    return () => {};
  }, [props.anomalie_updated]);

  return (
    <div>
      <div className={classes.container}>
        <Card>
          <CardHeader
            onClick={(e) => {
              openAnomalies(e);
            }}
            color={props.headerColor}
          >
            <CardIcon color={props.headerColor}>
              <ErrorOutlineOutlinedIcon fontSize="large" />
            </CardIcon>
            <p className={classes.cardCategory}>Anomalies</p>
            {fileIsLoading ? (
              <div>
                <CustomLinearProgress variant="indeterminate" color="primary" />
              </div>
            ) : (
              <div></div>
            )}
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={7}>
                <h3 className={classes.cardTitle}>
                  {" "}
                  {nbAnomalies}
                  <small> anomalies</small>
                </h3>
                <h4>
                  {" "}
                  <b>{nbetat1}</b>
                  <small> créées</small> | <b>{nbetat2}</b>
                  <small> en cours</small> | <b>{nbetat3}</b>
                  <small> corrigées</small>{" "}
                </h4>
                <h4>
                  {" "}
                  <b>{nbfromHRA}</b>
                  <small> proviennent de HRA</small> | <b>{nbfromLN}</b>
                  <small> proviennent de LN</small>{" "}
                </h4>
              </GridItem>

              <GridContainer
                direction="row"
                justify="space-around"
                alignItems="center"
              >
                {props.hasAdminRole ? (
                  <GridItem xs={12}>
                    <Button
                      color="danger"
                      size="lg"
                      simple
                      onClick={(e) => HandleGoButton(e)}
                      className={classes.navButton}
                    >
                      <div>
                        <i className="fas fa-redo-alt" /> Lancez une analyse...
                      </div>
                    </Button>
                  </GridItem>
                ) : (
                  <GridItem xs={5}></GridItem>
                )}
              </GridContainer>
            </GridContainer>
          </CardBody>
          <CardFooter>
            <div className={classes.stats}>
              <Update />
              Analyse du : {AnoDBlasLoaded}
            </div>
          </CardFooter>
        </Card>
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
        ></DialogTitle>
        <DialogContent
          id="large-modal-slide-description"
          className={classes.modalBody}
        >
          <InfoArea
            title="Attention !"
            description="Une nouvelle analyse effacera les états et commentaires des analyses actuelles"
            icon={WarningRoundedIcon}
            iconColor="warning"
          />
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Button onClick={() => setviewDetails(false)} color="secondary">
            Fermer
          </Button>
          <Button
            color="primary"
            type="submit"
            onClick={(e) => handleContinueButton(e)}
          >
            Continuer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    firstname: state.auth.firstname,
    lastname: state.auth.lastname,
    hasAdminRole: state.auth.hasAdminRole,
    cookies: ownProps.cookies,
    people: state.people.people,
    metadata: state.generic.metadata,
    anomalies_loading: state.anomalies.loading,
    anomalies_loaded: state.anomalies.loaded,
    anomalies_listloaded: state.anomalies.listloaded,
    anomalies: state.anomalies.anomalies,
    anomalie_updated: state.anomalies.updated,
    //    anomalies: state.anomalies.nbAnomalies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBulkAnalyse: () => dispatch(actions.anomaliesBulkAnalyse()),
    onAnomaliesList: () => dispatch(actions.anomaliesList()),
    onAnomaliesCleared: () => dispatch(actions.clearAnomalies()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AnomaliesWidget)
);
