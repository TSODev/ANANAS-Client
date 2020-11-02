/*eslint-disable*/
import React, { useEffect, useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Chip from "@material-ui/core/Chip";

import MaterialTable from "material-table";

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

const LNAbsencesTable = (props) => {
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

  useEffect(() => {
    console.log("[HRA Table ", props.data);
    return () => {};
  }, [props.data]);

  const renderLNChip = (rowData) => (
    <Chip label={<b>{rowData.code}</b>} variant="outlined" />
  );

  const renderDebut = (rowData) => {
    return moment(rowData.debut).locale("fr").format("DD MMMM YYYY");
  };

  const classes = useStyles();
  return (
    <div>
      {/* if (exported) ? <ExcelData dataSet={exceldata} /> : <React.Fragment /> */}
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
            title: "DATE",
            field: "debut",
            type: "date",
            width: 120,
            align: "right",
            render: (rowData) => renderDebut(rowData),
          },
          {
            title: "MATRICULE",
            field: "matricule",
            type: "numeric",
            width: 150,
          },
          { title: "TGI", field: "tgi", type: "numeric", width: 150 },
          {
            title: "NOM COMPLET",
            field: "fullname",
            type: "string",
            width: 400,
          },
          {
            title: "CODE",
            field: "code",
            type: "string",
            align: "left",
            width: 100,
            render: (rowData) => renderLNChip(rowData),
          },

          //                { title: "FIN", field: "fin", type: "date" },
        ]}
        data={props.data}
      />
    </div>
  );
};

export default LNAbsencesTable;
