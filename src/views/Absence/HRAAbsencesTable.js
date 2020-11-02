/*eslint-disable*/
import React, { useEffect, useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Chip from "@material-ui/core/Chip";

import MaterialTable from "material-table";

import Close from "@material-ui/icons/Close";

import tablestyle from "assets/jss/material-kit-pro-react/views/componentsSections/contentAreas.js";
import peopleStyle from "assets/jss/material-kit-pro-react/views/peopleStyle.js";

const moment = require("moment");

const styles = {
  ...peopleStyle,
  ...tablestyle,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(styles);

const HRAAbsencesTable = (props) => {
  const [tabcols, settabcols] = useState([
    "id",
    "matricule",
    "tgi",
    "Nom Complet",
    "prenom",
    "nom",
    "posact",
    "entree",
    "sortie",
  ]);
  //  const [absencesArray, setabsencesArray] = useState([]);
  // const [viewDetails, setviewDetails] = React.useState(false);
  // const [details, setdetails] = useState();

  // React.useEffect(() => {
  //   window.scrollTo(0, 0);
  //   document.body.scrollTop = 0;
  // });

  // useEffect(() => {
  //   setabsencesArray(props.absences);
  //   return () => {};
  // }, [props.absences]);

  // const onAbsenceRowClickHandler = (event, rowData) => {
  //   event.preventDefault();
  //   console.log("Click on Row: ", rowData);
  //   props.history.replace("/people-details-page/" + rowData.people_id);
  //   //setdetails(rowData);
  //   //setviewDetails(true);
  // };

  useEffect(() => {
    console.log("[HRA Table ", props.data);
    return () => {};
  }, [props.data]);

  const renderHRAChip = (rowData) => (
    <Chip label={<b>{rowData.code}</b>} variant="outlined" />
  );

  const renderDebut = (rowData) => {
    return "du " + moment(rowData.debut).locale("fr").format("DD MMMM YYYY");
  };
  const renderFin = (rowData) => {
    return "au " + moment(rowData.fin).locale("fr").format("DD MMMM YYYY");
  };

  const renderPeriode = (rowData) => {
    if (moment(rowData.debut).isSame(moment(rowData.fin), "day"))
      return "le " + moment(rowData.debut).locale("fr").format("DD MMM YYYY");
    else
      return (
        "du " +
        moment(rowData.debut).locale("fr").format("DD MMM YYYY") +
        " au " +
        moment(rowData.fin).locale("fr").format("DD MMM YYYY")
      );
  };

  const classes = useStyles();
  return (
    <div>
      <MaterialTable
        options={{
          grouping: false,
          filtering: true,
          search: false,
          pageSize: 10,
          pageSizeOptions: [10, 20, 50],
          debounceInterval: 500,
          actionsColumnIndex: -1,
        }}
        title="Tableau des Absences"
        columns={[
          {
            title: "PERIODE",
            width: 300,
            align: "center",
            render: (rowData) => renderPeriode(rowData),
          },
          {
            title: "MATRICULE",
            field: "matricule",
            type: "numeric",
            width: 100,
          },
          { title: "TGI", field: "tgi", width: 160 },
          { title: "NOM COMPLET", field: "fullname", width: 200 },
          {
            title: "CODE",
            field: "code",
            align: "center",
            render: (rowData) => renderHRAChip(rowData),
          },
          { title: "LIBELLE", field: "libelle", width: 200 },
          { title: "PERIODE PAIE", field: "periode_paie", width: 100 },
          { title: "CENTRE COUT", field: "centre_cout", width: 100 },
        ]}
        data={props.data.filter((a) => a.matricule !== 0)}
      />
    </div>
  );
};

// const mapStateToProps = (state, ownProps) => {
//   return {
//     isAuthenticated: state.auth.isAuthenticated,
//     firstname: state.auth.firstname,
//     lastname: state.auth.lastname,
//     cookies: ownProps.cookies,
// //    absences: state.HRA_absence.absences,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {};
// };

export default HRAAbsencesTable;
