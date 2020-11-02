import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

//import {ExcelRenderer} from 'react-excel-renderer';

import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export const ReadXcelFile = (props) => {
  const classes = useStyles();

  //  const setLoading = props.setLoading;
  const [inLoad, setinLoad] = useState(false);

  // useEffect(() => {}, [inLoad]);

  const handleUpload = (e) => {
    e.preventDefault();
    //    setLoading(true);

    setinLoad(true);

    var files = e.target.files,
      f = files[0];

    var reader = new FileReader();
    reader.onload = function (e) {
      var data = e.target.result;

      let readedData;
      let wsname;
      let ws;
      if (props.sheetNames === undefined) {
        readedData = XLSX.read(data, { type: "binary" });
        wsname = readedData.SheetNames[0];
        ws = readedData.Sheets[wsname];
      } else {
        readedData = XLSX.read(data, {
          type: "binary",
          sheets: props.sheetNames,
        });

        //            wsname = readedData.SheetNames[props.sheetNames[0]];
        ws = readedData.Sheets[props.sheetNames[0]];
      }
      //      console.log("End read XLSX Data", ws);
      /* Convert array to json*/
      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 2 });

      setinLoad(false);
      props.init({ cols: Object.keys(dataParse[0]), rows: dataParse });
      //      props.nextStep();
    };
    reader.readAsBinaryString(f);
  };
  // const onChangeHandler = (event) => {
  //   console.log('CheckBox :' , event)
  //   setshowContinu(event.checked)
  // }

  const onContinu = (event) => {
    props.nextStep();
  };

  const ContinuButton = () => (
    <Button
      type="button"
      className={classes.margin}
      variant="outlined"
      size="small"
      component="span"
      onClick={(event) => onContinu(event)}
      disabled={inLoad}
    >
      Passer cette étape
    </Button>
  );

  const LoadFileButton = () =>
    !inLoad && (
      <React.Fragment>
        <input
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          className={classes.input}
          id="contained-button-file"
          type="file"
          // onChange={fileHandler.bind(this)}
          onChange={handleUpload.bind(this)}
        />
        <label htmlFor="contained-button-file">
          <Button
            className={classes.margin}
            variant="outlined"
            size="small"
            component="span"
            startIcon={<SaveIcon />}
            disabled={inLoad}
          >
            {props.title}
          </Button>
        </label>
      </React.Fragment>
    );

  return (
    <React.Fragment>
      {props.canBeNull ? <ContinuButton /> : <React.Fragment />}
      <LoadFileButton />
    </React.Fragment>
  );
};

export default ReadXcelFile;
//export default isLoadingHOC(ReadXcelFile, "Chargement...");
