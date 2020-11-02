import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as XLSX from "xlsx";
import * as moment from "moment";
import "moment/locale/fr";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons

import DateRange from "@material-ui/icons/DateRange";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Popover from "@material-ui/core/Popover";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import AttachFile from "@material-ui/icons/AttachFile";
import StorageIcon from "@material-ui/icons/Storage";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";

// core components
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CustomFileInput from "components/CustomFileInput/CustomFileInput.js";
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import Warning from "components/Typography/Warning.js";
import Muted from "components/Typography/Muted.js";

import javascriptStyle from "assets/jss/material-kit-pro-react/views/componentsSections/javascriptStyles.js";
import modalStyle from "assets/jss/material-kit-pro-react/modalStyle.js";
import dashStyle from "assets/jss/material-kit-pro-react/views/dashboardStyle.js";

import cardStyle from "assets/jss/material-kit-pro-react/components/cardStyle.js";
import cardHeaderStyle from "assets/jss/material-kit-pro-react/components/cardHeaderStyle.js";
import cardBodyStyle from "assets/jss/material-kit-pro-react/components/cardBodyStyle.js";
import cardFooterStyle from "assets/jss/material-kit-pro-react/components/cardFooterStyle.js";
import typoStyle from "assets/jss/material-kit-pro-react/components/typographyStyle.js";
import ClipLoader from "react-spinners/ClipLoader";

import * as actions from "../MainStore/actions/index";
import { css } from "@emotion/core";
import CardFooter from "components/Card/CardFooter";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

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

const override = css`
  display: block;
  margin: 0 auto;
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const useStyles = makeStyles(styles);

const LNFilesWidget = (props, { ...rest }) => {
  const [fileIsLoading, setfileIsLoading] = useState(false);
  const [anchorElLeft, setAnchorElLeft] = useState(null);
  const [loadNewFiles, setLoadNewFiles] = useState(false);

  const [LNfiles, setLNFiles] = React.useState(null);
  const [LNfileNames, setLNFileNames] = React.useState(null);
  const [LNData, setLNData] = useState(null);

  const [cardRotate, setCardRotate] = React.useState("");
  const [loadedFileName, setloadedFileName] = useState("");
  const [lastLoadedDate, setlastLoadedDate] = useState(null);

  const classes = useStyles();

  const clickHeaderHandler = () => {
    setLoadNewFiles(true);
  };

  const onFileLNChange = (inputFiles, inputFileNames) => {
    setLNFiles(inputFiles);
    setLNFileNames(inputFileNames);
    // now you have the files inside your component as well
  };

  function readFile(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function (e) {
        resolve(e.target.result);
      };
      reader.onerror = reader.onabort = reject;
      reader.readAsBinaryString(file);
    });
  }

  const handleSaveButton = (e) => {
    e.preventDefault();

    // Start with loading/updating LN file if needed...
    if (LNfiles !== null) {
      setfileIsLoading(true);
      readFile(LNfiles[0])
        .then((results) => {
          const wb = XLSX.read(results, { type: "binary", cellDates: true });
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];

          const dataParse = XLSX.utils.sheet_to_json(ws, {
            header: 2,
          });
          setLNData({
            name: LNfileNames,
            props: wb.Props,
            cols: Object.keys(dataParse[0]),
            rows: dataParse,
          });
        })
        .catch((err) => console.log(err));
    }

    setLoadNewFiles(false);
  };

  const openCard = (s) => {
    console.log("Card clicked!");
  };

  useEffect(() => {
    setfileIsLoading(props.ln_loading);
    return () => {};
  }, [props.ln_loading]);

  useEffect(() => {
    // New file is read - need to be saved in DB
    if (LNData !== null) {
      props.onLNBulkSave(JSON.stringify(LNData));
    }
    return function cleanup() {};
  }, [LNData]);

  useEffect(() => {
    // New Data are saved
    props.onLoadAllMetadata();
    props.onListAllPeople();
    //    props.onListAllLNAbsences();
    return () => {
      function cleanup() {}
    };
  }, [props.ln_loaded]);

  useEffect(() => {
    if (!props.mdLoading) {
      var lastLoadedDate = "";
      var fileName = "";
      if (props.metadata.length > 0) {
        lastLoadedDate = props.metadata
          .filter((group) => group.metadata_group === "LN")
          .find((key) => key.metadata_key === "lastLoaded").metadata_value;
        fileName = props.metadata
          .filter((group) => group.metadata_group === "LN")
          .find((key) => key.metadata_key === "fileName").metadata_value;
      }
      setlastLoadedDate(lastLoadedDate);
      setloadedFileName(fileName);
    }
    return () => {
      //      cleanup
    };
  }, [props.mdLoading]);

  return (
    <React.Fragment>
      <div className={classes.container}>
        <Card>
          <CardHeader
            onClick={() => {
              setLoadNewFiles(true);
            }}
            color={props.headerColor}
          >
            <CardIcon color={props.headerColor}>
              <Icon>content_copy</Icon>
            </CardIcon>
            <h3 className={classes.cardCategory}>Données LN</h3>
            {fileIsLoading ? (
              <div>
                <CustomLinearProgress variant="indeterminate" color="primary" />
              </div>
            ) : (
              <div></div>
            )}
          </CardHeader>
          <CardBody className={classes.cardBodyStyle}>
            <div>
              {lastLoadedDate === "" ? (
                <h3 className={classes.cardTitle}>
                  0 <small>Fichier chargé</small>
                </h3>
              ) : (
                <GridContainer
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <GridItem xs={8} sm={8} md={8} lg={8}>
                    <h5 className={classes.cardTitle}>{loadedFileName}</h5>
                  </GridItem>
                  <GridItem xs={4} sm={4} md={4} lg={4}>
                    <h5 className={classes.stats}>{lastLoadedDate}</h5>
                  </GridItem>
                </GridContainer>
              )}
            </div>
          </CardBody>
          <CardFooter className={classes.cardFooterStyle}>
            <Muted>
              {"INFORMATION - "}
              Pour éviter des doublons dans le tableau des absences, le
              traitement commence à la 1ere colonne du fichier et s'arrete sur
              la colonne DOUBLON (HQ?)
            </Muted>
          </CardFooter>
        </Card>

        {/* ---------------------------------------------------------------------------
      Below the MODAL content. (trigerred by LoadNewFile state)
      */}

        {props.hasAdminRole ? (
          <Dialog
            classes={{
              root: classes.modalRoot,
              paper: classes.modal + " " + classes.modalLarge,
            }}
            open={loadNewFiles}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setLoadNewFiles(false)}
            aria-labelledby="classic-modal-slide-title"
            aria-describedby="classic-modal-slide-description"
          >
            <DialogTitle
              id="classic-modal-slide-title"
              disableTypography
              className={classes.modalHeader}
            >
              <Button
                simple
                className={classes.modalCloseButton}
                key="close"
                aria-label="Close"
                onClick={() => setLoadNewFiles(false)}
              >
                {" "}
                <Close className={classes.modalClose} />
              </Button>
              <h4 className={classes.modalTitle}>Gestion des Données</h4>
            </DialogTitle>
            <DialogContent
              id="classic-modal-slide-description"
              className={classes.modalBody}
            >
              <h4>Fichier LN</h4>
              <CustomFileInput
                onChange={onFileLNChange}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  placeholder: "Le fichier export LN...",
                }}
                endButton={{
                  buttonProps: {
                    round: true,
                    color: "primary",
                    justIcon: true,
                    fileButton: true,
                  },
                  icon: <AttachFile />,
                }}
              />
            </DialogContent>
            <DialogActions className={classes.modalFooter}>
              <Button onClick={() => setLoadNewFiles(false)} color="secondary">
                Fermer
              </Button>
              <Button color="primary" onClick={(e) => handleSaveButton(e)}>
                Charger
              </Button>
            </DialogActions>
          </Dialog>
        ) : (
          <Dialog
            classes={{
              root: classes.modalRoot,
              paper: classes.modal + " " + classes.modalLarge,
            }}
            open={loadNewFiles}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setLoadNewFiles(false)}
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
                title="Vous ne disposez pas des droits nécessaires pour charger un nouveau fichier"
                description="Veuillez demander à votre administrateur de charger un nouveau fichier de données"
                icon={WarningRoundedIcon}
                iconColor="warning"
              />
            </DialogContent>
            <DialogActions className={classes.modalFooter}>
              <Button onClick={() => setLoadNewFiles(false)} color="secondary">
                Fermer
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    firstname: state.auth.firstname,
    lastname: state.auth.lastname,
    hasAdminRole: state.auth.hasAdminRole,
    cookies: ownProps.cookies,
    ln_loading: state.LN_absence.loading,
    ln_loaded: state.LN_absence.loaded,
    metadata: state.generic.metadata,
    mdLoading: state.generic.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLNBulkSave: (bulkdata) => dispatch(actions.LN_absencesBulkSave(bulkdata)),
    onListAllPeople: () => dispatch(actions.listAllPeople()),
    onLoadAllMetadata: () => dispatch(actions.listAllMetadata()),
    onListAllLNAbsences: () => dispatch(actions.LN_listAllAbsences()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LNFilesWidget)
);
