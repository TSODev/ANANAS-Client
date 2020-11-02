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
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import Layers from "@material-ui/icons/Layers";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";

// core components
import InfoArea from "components/InfoArea/InfoArea.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CustomFileInput from "components/CustomFileInput/CustomFileInput.js";
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.js";

import javascriptStyle from "assets/jss/material-kit-pro-react/views/componentsSections/javascriptStyles.js";
import dashStyle from "assets/jss/material-kit-pro-react/views/dashboardStyle.js";

import cardStyle from "assets/jss/material-kit-pro-react/components/cardStyle.js";
import cardHeaderStyle from "assets/jss/material-kit-pro-react/components/cardHeaderStyle.js";
import cardBodyStyle from "assets/jss/material-kit-pro-react/components/cardBodyStyle.js";
import cardFooterStyle from "assets/jss/material-kit-pro-react/components/cardFooterStyle.js";

// core components
import Table from "components/Table/Table.js";

import tablestyle from "assets/jss/material-kit-pro-react/views/componentsSections/contentAreas.js";

import * as actions from "../MainStore/actions/index";
import { css } from "@emotion/core";

const styles = {
  ...cardStyle,
  ...cardHeaderStyle,
  ...cardBodyStyle,
  ...cardFooterStyle,
  ...dashStyle,
  ...tablestyle,
  // ...modalStyle,
  // ...popoverStyles,
  // ...tooltipsStyle,
  ...javascriptStyle,
};

// const override = css`
//   display: block;
//   margin: 0 auto;
// `;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const useStyles = makeStyles(styles);

const HRAFilesWidget = (props, { ...rest }) => {
  const [fileIsLoading, setfileIsLoading] = useState(false);
  //  const [anchorElLeft, setAnchorElLeft] = useState(null);
  const [loadNewFiles, setLoadNewFiles] = useState(false);

  const [HRAfiles, setHRAFiles] = React.useState(null);
  const [HRAfileNames, setHRAFileNames] = React.useState(null);
  const [HRAData, setHRAData] = useState(null);

  //  const [cardRotate, setCardRotate] = React.useState("");
  //  const [loadedFileName, setloadedFileName] = useState("");
  //  const [lastLoadedDate, setlastLoadedDate] = useState(null);

  const [DFFilenames, setDFFilenames] = useState([]);
  const [TabDF, setTabDF] = useState([[]]);

  const classes = useStyles();

  const onFileHRAChange = (inputFiles, inputFileNames) => {
    setHRAFiles(inputFiles);
    setHRAFileNames(inputFileNames);
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

  const handleOKButton = (e) => {
    //    console.log("So let's go !", HRAfiles, HRAfileNames);
    e.preventDefault();

    if (HRAfiles !== null) {
      setfileIsLoading(true);
      //TODO try to manage multiple files !
      readFile(HRAfiles[0])
        .then((results) => {
          const wb = XLSX.read(results, { type: "binary", cellDates: true });
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];

          const dataParse = XLSX.utils.sheet_to_json(ws, {
            header: 2,
          });
          setHRAData({
            name: HRAfileNames,
            props: wb.Props,
            cols: Object.keys(dataParse[0]),
            rows: dataParse,
          });
        })
        .catch((err) => console.log(err));
    }

    setLoadNewFiles(false);
  };

  const onDeleteDF = (key) => {
    //    e.preventDefault();

    const id = props.datafiles[key].datafile_id;
    console.log(key, id);
    props.onDeleteDatafile(id);
    setTimeout(() => props.onLoadAllDatafiles(), 1000);
  };

  // const openCard = (s) => {
  //   console.log("Card clicked!");
  // };

  useEffect(() => {
    setfileIsLoading(props.hra_loading);
    return () => {};
  }, [props.hra_loading]);

  useEffect(() => {
    const TDF = [];
    props.datafiles.forEach((df, key) => {
      if (props.hasAdminRole)
        TDF.push([
          key,
          df.datafilename,
          moment(df.datafileloaddate).format("dddd DD MMMM YYYY, HH:mm:ss"),
          <Button
            simple
            size="sm"
            color={props.headerColor}
            key={key}
            onClick={() => onDeleteDF(key)}
          >
            <DeleteIcon />
          </Button>,
        ]);
      else
        TDF.push([
          key,
          df.datafilename,
          moment(df.datafileloaddate).format("dddd DD MMMM YYYY, HH:mm:ss"),
        ]);
    });
    setTabDF(TDF);
    return () => {};
  }, [props.datafiles, props.headerColor]);

  useEffect(() => {
    if (HRAData !== null) {
      props.onHRABulkSave(JSON.stringify(HRAData));
      //      props.onHRAChannelJoin();
    }
    return function cleanup() {};
  }, [HRAData]);

  useEffect(() => {
    props.onLoadAllDatafiles();
    if (props.hra_loaded) {
      //      setCardRotate("");
      setDFFilenames(props.datafiles);
    }
    //    props.onLoadAllHRAAbsenceView();
    return function cleanup() {};
  }, [props.hra_loaded]);

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
            <h3 className={classes.cardCategory}>Données HRA</h3>
            {fileIsLoading ? (
              <div>
                <CustomLinearProgress variant="indeterminate" color="primary" />
              </div>
            ) : (
              <div></div>
            )}
          </CardHeader>
          <CardBody>
            <div>
              <Table
                striped
                tableShopping
                tableHead={["#", "Fichier", "Chargé le", ""]}
                tableData={TabDF}
                customCellClasses={[
                  classes.textCenter,
                  classes.textLeft,
                  classes.textCenter,
                  classes.textRight,
                ]}
                customClassesForCells={[0, 1, 2, 3]}
                customHeadCellClasses={[
                  classes.textCenter,
                  classes.textLeft,
                  classes.textCenter,
                  classes.textRight,
                ]}
                customHeadClassesForCells={[0, 1, 2, 3]}
              />
            </div>
          </CardBody>
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
              <h4>Fichiers HRA</h4>

              <CustomFileInput
                simple
                onChange={onFileHRAChange}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  placeholder: "Un fichier d'export HRA...",
                }}
                endButton={{
                  buttonProps: {
                    round: true,
                    color: "info",
                    justIcon: true,
                    fileButton: true,
                  },
                  icon: <Layers />,
                }}
              />
            </DialogContent>
            <DialogActions className={classes.modalFooter}>
              <Button onClick={() => setLoadNewFiles(false)} color="secondary">
                Fermer
              </Button>
              <Button color="primary" onClick={(e) => handleOKButton(e)}>
                OK
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
                title="Vous ne disposez pas des droits nécessaires pour gérer les fichiers"
                description="Veuillez demander à votre administrateur d'ajouter ou de supprimer un fichier de données"
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
    hra_loading: state.HRA_absence.loading,
    hra_loaded: state.HRA_absence.loaded,
    datafiles: state.generic.datafiles,
    dfloading: state.generic.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onHRABulkSave: (bulkdata) =>
      dispatch(actions.HRA_absencesBulkSave(bulkdata)),
    onLoadAllHRAAbsenceView: () => dispatch(actions.HRA_listAllAbsences()),
    onListAllPeople: () => dispatch(actions.listAllPeople()),
    onLoadAllDatafiles: () => dispatch(actions.listAllDatafile()),
    onDeleteDatafile: (id) => dispatch(actions.deleteDatafile(id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HRAFilesWidget)
);
