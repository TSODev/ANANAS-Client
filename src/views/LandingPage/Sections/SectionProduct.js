import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
import DescriptionIcon from "@material-ui/icons/Description";
import PeopleIcon from "@material-ui/icons/People";
import WarningIcon from "@material-ui/icons/Warning";
import BarChartIcon from "@material-ui/icons/BarChart";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import productStyle from "assets/jss/material-kit-pro-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(productStyle);

export default function SectionProduct() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={8} md={8}>
          <h2 className={classes.title}>Euh, c{"'"}a fait quoi ?</h2>
          <h5 className={classes.description}>
            Cette application effectue des corrélations entre les fichiers d
            {"'"}absences issus de HRA et le fichier de LN. Elle vérifie qu{"'"}
            il existe un concordance de date et de code pour chaque absences du
            personnel. Dans le cas contraire, une anomalie est créée.
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="Fichiers"
              description="Il s'agit des exports Excel des référentiels de gestions HRA, comparés au fichier LN"
              icon={DescriptionIcon}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="Personnel"
              description="Le référentiel personnel (utilisateurs)."
              icon={PeopleIcon}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="Anomalies"
              description="Les résultats de l'analyse."
              icon={WarningIcon}
              iconColor="danger"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="Tableau de Bord"
              description="Présentation sous forme de Widget des résultats."
              icon={BarChartIcon}
              iconColor="success"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
