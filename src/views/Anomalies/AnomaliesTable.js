/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
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
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

import Info from "components/Typography/Info.js";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import InputAdornment from "@material-ui/core/InputAdornment";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import MaterialTable from "material-table";

import tablestyle from "assets/jss/material-kit-pro-react/views/componentsSections/contentAreas.js";
import peopleStyle from "assets/jss/material-kit-pro-react/views/peopleStyle.js";

import cardBlog4 from "assets/img/different-2.png";
import noimage from "assets/img/nothing_5.png";

import CardFooter from "components/Card/CardFooter";

import * as actions from "../../MainStore/actions/index";

const moment = require("moment");

const styles = {
  ...peopleStyle,
  ...tablestyle,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(styles);

const AnomaliesTable = (props) => {
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

  // React.useEffect(() => {
  //   window.scrollTo(0, 0);
  //   document.body.scrollTop = 0;
  // });

  useEffect(() => {
    return () => {};
  }, [props.DB]);

  useEffect(() => {
    setanomaliesArray(props.anomalies);
    return () => {};
  }, [props.anomalies, props.updated]);

  useEffect(() => {
    //Ouverture du modal
    if (details !== null) {
      setSimpleSelect(details.etat);
      setcommentaire(details.commentaire);
      setviewDetails(true);
    }
    return () => {};
  }, [details]);

  // useEffect(() => {
  //   console.log("Anomalies Updated !", props.updated);
  //   return () => {};
  // }, [props.updated]);

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
      commentaire: commentaire,
    };
    props.onUpdateAnomalie(updateAnomalie);
    //    props.onAnomaliesList();
    setviewDetails(false);
  };

  const handleSimple = (event) => {
    setSimpleSelect(event.target.value);
  };

  const handleComment = (event) => {
    if (details.etat === 1) setSimpleSelect(2);
    setcommentaire(event.target.value);
  };

  const renderFrom = (rowData) => {
    if (rowData.anomalie_from === "LN") {
      return <ArrowBackIcon />;
    } else {
      return <ArrowForwardIcon />;
    }
  };

  const renderHRAChip = (rowData) => (
    <Chip label={<b>{rowData.hracode}</b>} variant="outlined" />
  );
  const renderLNChip = (rowData) => (
    <Chip label={<b>{rowData.lncode}</b>} variant="outlined" />
  );

  const renderEtat = (rowData) => {
    let chip;
    switch (rowData.etat) {
      case 1:
        chip = (
          <Chip
            color="primary"
            style={{ backgroundColor: "#E94340" }}
            label=" CREEE "
          />
        );
        break;
      case 2:
        chip = (
          <Chip
            color="primary"
            style={{ backgroundColor: "#FD9912" }}
            label="EN COURS"
          />
        );
        break;
      case 3:
        chip = (
          <Chip
            color="primary"
            style={{ backgroundColor: "#4AA54E" }}
            label="CORRIGEE"
          />
        );
        break;

      default:
        break;
    }
    return chip;
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
      <div>
        <React.Fragment>
          {/* if (exported) ? <ExcelData dataSet={exceldata} /> : <React.Fragment /> */}
          <MaterialTable
            onRowClick={(event, rowData) =>
              onAnomalieRowClickHandler(event, rowData)
            }
            options={{
              grouping: false,
              filtering: true,
              search: false,
              pageSize: 10,
              pageSizeOptions: [10, 20, 50],
              debounceInterval: 500,
            }}
            localization={localisation}
            title="Liste des anomalies"
            columns={[
              {
                title: "#",
                field: "anomalie_id",
                type: "numeric",
                filtering: false,
                defaultSort: "asc",
                align: "center",
                width: 20,
                //cellStyle: (event, rowData) => setCellStyle(event, rowData),
                render: (rowData) => renderEtat(rowData),
              },
              {
                title: "MATRICULE",
                field: "matricule",
                type: "numeric",
                width: 120,
              },
              { title: "TGI", field: "tgi", type: "string", width: 120 },
              {
                title: "COLLABORATEUR",
                field: "fullname",
                type: "string",
                width: 300,
              },
              {
                title: "DATE",
                field: "debut",
                type: "date",
                render: (row) => (
                  <span>{moment(row["debut"]).format("DD MMM YYYY")}</span>
                ),
                width: 180,
              },
              {
                title: "HRA",
                field: "hracode",
                type: "string",
                align: "right",
                width: 60,
                render: (rowData) => renderHRAChip(rowData),
              },
              {
                title: "",
                field: "anomalie_from",
                type: "string",
                align: "center",
                width: 40,
                render: (rowData) => renderFrom(rowData),
              },
              {
                title: "LN",
                field: "lncode",
                type: "string",
                align: "left",
                width: 60,
                render: (rowData) => renderLNChip(rowData),
              },

              {
                title: "MESSAGE",
                field: "libelle",
                type: "string",
                filtering: false,
                width: 500,
              },
            ]}
            data={props.DB}
          />
        </React.Fragment>
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
          <Card plain blog className={classes.card}>
            {/* <GridContainer>
              <GridItem xs={12} sm={5} md={5}> */}
            <CardHeader image plain>
              <a
                href="#pablito"
                onClick={(e) => {
                  e.preventDefault();
                  setviewDetails(false);
                }}
              >
                <img src={cardBlog4} alt="..." />
              </a>
              <div
                className={classes.coloredShadow}
                style={{
                  backgroundImage: `url(${cardBlog4})`,
                  opacity: "1",
                }}
              />
            </CardHeader>

            {viewDetails ? (
              <CardBody className={classes.CardBody}>
                {/* </GridItem>
              <GridItem xs={12} sm={7} md={7}> */}

                <Info>
                  <h6 className={classes.cardCategory}>
                    <b>Analyse </b>, {moment(lastAnalyse).fromNow()};
                  </h6>
                </Info>

                <div className={classes.cardTitle}>
                  <GridContainer
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <GridItem xs={3} sm={3} md={3}>
                      <div className={classes.textCenter}>
                        {details.etat === 1 ? (
                          <Badge color="danger">créée</Badge>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                      <div className={classes.textCenter}>
                        {details.etat === 2 ? (
                          <Badge color="warning">en cours d analyse</Badge>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                      <div className={classes.textCenter}>
                        {details.etat === 3 ? (
                          <Badge color="success">corrigée</Badge>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </GridItem>

                    <GridItem xs={7}>
                      <h3>
                        <b>{details.fullname}</b>
                      </h3>
                    </GridItem>
                    <GridItem xs={5}>
                      <div className={classes.textRight}>
                        <h3>{moment(details.debut).format("DD MMM YYYY")}</h3>
                      </div>
                    </GridItem>
                    <GridItem xs={4}>
                      <div className={classes.textCenter}>
                        <h1>
                          <b>{details.hracode}</b>
                        </h1>
                      </div>
                    </GridItem>
                    <GridItem xs={2}>
                      <div className={classes.textCenter}>
                        <i class="fas fa-arrows-alt-h  fa-5x"></i>
                      </div>
                    </GridItem>
                    <GridItem xs={4}>
                      <div className={classes.textCenter}>
                        <h1>
                          <b>{details.lncode}</b>
                        </h1>
                      </div>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                      <br />
                      <div>
                        <strong>Description</strong>
                        <p>
                          <span>{details.libelle}</span>
                        </p>
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <div>
                        <strong>Instructions</strong>
                        <p>
                          <span>Corriger le code absence</span>
                        </p>
                        <br />
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} lg={12}></GridItem>
                    <GridItem xs={12} sm={12} md={12} lg={12}>
                      <form
                        onSubmit={handleSaveButton}
                        className={classes.form}
                      >
                        <GridItem xs={12} sm={6} md={5} lg={5}>
                          <FormControl
                            fullWidth
                            className={classes.selectFormControl}
                          >
                            <InputLabel
                              htmlFor="simple-select"
                              className={classes.selectLabel}
                            >
                              Etat
                            </InputLabel>
                            <Select
                              MenuProps={{
                                className: classes.selectMenu,
                              }}
                              classes={{
                                select: classes.select,
                              }}
                              value={simpleSelect}
                              onChange={handleSimple}
                              inputProps={{
                                name: "simpleSelect",
                                id: "simple-select",
                              }}
                            >
                              <MenuItem
                                disabled
                                classes={{
                                  root: classes.selectMenuItem,
                                }}
                              >
                                Choisissez un état pour cette anomalie
                              </MenuItem>
                              <MenuItem
                                classes={{
                                  root: classes.selectMenuItem,
                                  selected: classes.selectMenuItemSelected,
                                }}
                                value="1"
                              >
                                Créée
                              </MenuItem>
                              <MenuItem
                                classes={{
                                  root: classes.selectMenuItem,
                                  selected: classes.selectMenuItemSelected,
                                }}
                                value="2"
                              >
                                En cours d'analyse
                              </MenuItem>
                              <MenuItem
                                classes={{
                                  root: classes.selectMenuItem,
                                  selected: classes.selectMenuItemSelected,
                                }}
                                value="3"
                              >
                                Corrigée
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <FormControl
                            fullWidth
                            className={classes.imputFormControl}
                          >
                            <CustomInput
                              labelText="Commentaires"
                              id="float"
                              formControlProps={{
                                fullWidth: true,
                              }}
                              inputProps={{
                                multiline: true,
                                defaultValue: details.commentaire,
                                placeholder: "Ajouter un commentaire",
                                onChange: (e) => handleComment(e),
                              }}
                            />
                          </FormControl>
                        </GridItem>
                        {/* <GridItem xs={12} sm={12} md={12} lg={12}> */}
                        <GridContainer>
                          <GridItem xs={4} sm={4} md={4} lg={4}></GridItem>
                          <GridItem xs={4} sm={4} md={4} lg={4}>
                            <Button
                              onClick={() => setviewDetails(false)}
                              color="secondary"
                              size="lg"
                            >
                              Fermer
                            </Button>
                          </GridItem>
                          <GridItem xs={4} sm={4} md={4} lg={4}>
                            <Button
                              type="submit"
                              color="primary"
                              size="lg"
                              // onClick={(e) => handleSaveButton(e)}
                            >
                              Enregistrer
                            </Button>
                          </GridItem>
                        </GridContainer>
                        {/* </GridItem> */}
                      </form>
                    </GridItem>
                  </GridContainer>
                </div>

                {/* </GridItem>
            </GridContainer> */}
              </CardBody>
            ) : (
              <CardBody></CardBody>
            )}

            <CardFooter className={classes.CardFooter}></CardFooter>
          </Card>
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          {/* <Button onClick={() => setviewDetails(false)} color="secondary">
            Fermer
          </Button>
          <Button
            color="primary"
            type="submit"
            onClick={(e) => handleSaveButton(e)}
          >
            Enregistrer
          </Button> */}
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
  connect(mapStateToProps, mapDispatchToProps)(AnomaliesTable)
);
