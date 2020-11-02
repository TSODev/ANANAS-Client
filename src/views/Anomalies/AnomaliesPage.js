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
import CardHeader from "components/Card/CardHeader.js";
import Footer from "components/Footer/Footer.js";
import Instructions from "components/Instruction/Instruction.js";
import Badge from "components/Badge/Badge.js";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// sections for this page
import HeaderBackAndLogout from "components/Header/HeaderBackAndLogout.js";

import Info from "components/Typography/Info.js";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Slide from "@material-ui/core/Slide";
import InputAdornment from "@material-ui/core/InputAdornment";

import MaterialTable from "material-table";

import tablestyle from "assets/jss/material-kit-pro-react/views/componentsSections/contentAreas.js";
import peopleStyle from "assets/jss/material-kit-pro-react/views/peopleStyle.js";

import cardBlog4 from "assets/img/different-2.png";
import CardFooter from "components/Card/CardFooter";

import * as actions from "../../MainStore/actions/index";
import AnomaliesTable from "./AnomaliesTable";

const moment = require("moment");

const styles = {
  ...peopleStyle,
  ...tablestyle,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(styles);

const AnomaliesPage = (props) => {
  const [anomaliesArray, setanomaliesArray] = useState([]);
  const [viewDetails, setviewDetails] = React.useState(false);
  const [details, setdetails] = useState(null);
  const [lastAnalyse, setlastAnalyse] = useState(
    props.metadata.find(
      (m) => m.metadata_group === "ANOMALIES" && m.metadata_key === "lastLoaded"
    )
  );
  const [simpleSelect, setSimpleSelect] = React.useState(1);
  const [commentaire, setcommentaire] = useState("");

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });

  useEffect(() => {
    setanomaliesArray(props.anomalies);
    return () => {};
  }, [props.anomalies]);

  useEffect(() => {
    if (details !== null) {
      setSimpleSelect(details.etat);
      setcommentaire(details.commentaire);
      setviewDetails(true);
    }
    return () => {};
  }, [details]);

  useEffect(() => {
    return () => {};
  }, [props.updated]);

  const onAnomalieRowClickHandler = (event, rowData) => {
    event.preventDefault();
    console.log("Click on Row: ", rowData);
    //    props.history.replace("/anomalie-details-page/" + rowData.anomalie_id);
    setdetails(rowData);
    setviewDetails(true);
  };

  const handleSaveButton = (e) => {
    const now = moment().format("DD-MM-YY");
    console.log("Button :", simpleSelect, now.concat(commentaire));
    e.preventDefault();
    const updateAnomalie = {
      anomalie_id: details.anomalie_id,
      etat: simpleSelect,
      commentaire:
        // details.commentaire +
        // "\n" +
        //"le " + moment().format("DD MMM YYYY à HH:mm") + " : " + commentaire,
        commentaire,
    };
    props.onUpdateAnomalie(updateAnomalie);
    props.onAnomaliesList();
    setviewDetails(false);
  };

  const handleSimple = (event) => {
    setSimpleSelect(event.target.value);
  };

  const handleComment = (event) => {
    if (details.etat === 1) setSimpleSelect(2);
    setcommentaire(event.target.value);
  };

  const setCellStyle = (e, rowData) => {
    const cree = {
      backgroundColor: "#E94340",
      color: "#E94340",
      borderRadius: 3,
    };
    const encours = {
      backgroundColor: "#FD9912",
      color: "#FD9912",
      borderRadius: 3,
    };
    const corrige = {
      backgroundColor: "#4AA54E",
      color: "#4AA54E",
      borderRadius: 3,
    };
    const cellMapping = [cree, encours, corrige];
    //console.log("Cell Style : ", rowData, cellMapping[rowData.etat - 1]);
    return cellMapping[rowData.etat - 1];
  };

  const body = {
    emptyDataSourceMessage: "Aucun enregistrement à afficher",
  };
  const pagination = {
    labelRowsSelect: "enr.",
    labelDisplayedRows: " {from}-{to} de {count}",
    firstTooltip: "Première Page",
    previousTooltip: "Page précédente",
    nextTooltip: "Page suivante",
    previousLabel: "<",
    nextLabel: ">",
    size: "lg",
    lastTooltip: "Dernière Page",
  };

  const localisation = {
    body: body,
    pagination: pagination,
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
        image={require("assets/img/anomalies-3.jpg")}
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
                <h1 className={classes.title}>Anomalies</h1>
                <h4></h4>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <AnomaliesTable DB={anomaliesArray} />
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
    anomalies: state.anomalies.anomalies,
    metadata: state.generic.metadata,
    updating: state.anomalies.updating,
    updated: state.anomalies.updated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAnomaliesList: () => dispatch(actions.anomaliesList()),
    onUpdateAnomalie: (update) => dispatch(actions.anomalieUpdate(update)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AnomaliesPage)
);
