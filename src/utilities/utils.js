//import * as _ from 'lodash';
import moment from "moment";

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const capitalize = (name) =>
  name.charAt(0).toUpperCase() + name.slice(1);

export const removeStringFromStart = (fullstring, remove) =>
  fullstring.replace(remove, "");

export const fullname = (firstname, lastname) => {
  const first = capitalize(firstname);
  const last = capitalize(lastname);
  return first.concat(" ").concat(last);
};

export const getMinMaxValues = (history, capability) => {
  const arr = [];
  history.map((h) => arr.push(JSON.parse(h).metrics[capability]));
  return {
    min: Math.min(...arr),
    max: Math.max(...arr),
  };
};

export const buildAxiosErrorMessage = (error) => {
  let message = error.message;
  if (error.message.response !== undefined) {
    message = message + " : " + error.message.response.data;
  }
  return message;
};

export const toDirectDateMoment = (serialDate, time = false) => {
  return moment(new Date((serialDate - (25567 + 2)) * 86400 * 1000));
};

export const JSDateToExcelDate = (inDate) => {
  //  const a = moment(inDate).startOf('day').format('x')
  var returnDate =
    Math.round(moment(inDate).format("x") / 86400 / 1000) + 25569;
  return returnDate;
};

export const uniqueID = () => {
  function chr4() {
    return Math.random().toString(16).slice(-4);
  }
  return (
    chr4() +
    chr4() +
    "-" +
    chr4() +
    "-" +
    chr4() +
    "-" +
    chr4() +
    "-" +
    chr4() +
    chr4() +
    chr4()
  );
};

export const createExcelDataset = (data) => {
  console.log("Create Dataset", data);
  const columns = [
    {
      title: "C-P",
      width: { wpx: 60 },
      style: {
        font: { sz: "18", bold: false },
        fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
      },
    },
    {
      title: "DPT",
      width: { wpx: 60 },
      style: {
        font: { sz: "18", bold: false },
        fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
      },
    },
    {
      title: "C-A",
      width: { wpx: 60 },
      style: {
        font: { sz: "18", bold: false },
        fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
      },
    },
    {
      title: "NUMERO",
      width: { wpx: 110 },
      style: {
        font: { sz: "18", bold: false },
        fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
      },
    },
    {
      title: "NOM",
      width: { wpx: 250 },
      style: {
        font: { sz: "18", bold: false },
        fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
      },
    },
    {
      title: "PRENOM",
      width: { wpx: 250 },
      style: {
        font: { sz: "18", bold: false },
        fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
      },
    },
    {
      title: "COD",
      width: { wpx: 60 },
      style: {
        font: { sz: "18", bold: false },
        fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
      },
    },
    {
      title: "DATE",
      width: { wpx: 120 },
      style: {
        font: { sz: "18", bold: false },
        fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
      },
    },
    {
      title: "LIBELLE",
      width: { wpx: 400 },
      style: {
        font: { sz: "18", bold: false },
        fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
      },
    },
  ];
  const rows = [];

  data.forEach((user) => {
    if (user.FLAG_ANOMALIES === "OUI") {
      const userAnomalies = user.ANOMALIES;
      userAnomalies.forEach((anomalie) => {
        const infoAnomalies = [];
        infoAnomalies.push(
          { value: user.CP, style: { font: { sz: "18", bold: false } } },
          { value: user.DPT, style: { font: { sz: "18", bold: false } } },
          { value: user.CA, style: { font: { sz: "18", bold: false } } },
          { value: user.NUMERO, style: { font: { sz: "18", bold: false } } },
          { value: user.NOM, style: { font: { sz: "18", bold: true } } },
          { value: user.PRENOM, style: { font: { sz: "18", bold: false } } },
          {
            value: anomalie.subcod,
            style: { font: { sz: "18", bold: false } },
          },
          {
            value: anomalie.debut,
            style: { font: { sz: "18", bold: false }, numFmt: "dd/mm" },
          },
          {
            value: anomalie.libelle,
            style: { font: { sz: "18", bold: false } },
          }
        );
        rows.push(infoAnomalies);
      });
    }
  });
  console.log("Rows : ", rows);

  return [{ columns: columns, data: rows }];
};

export const createExcelData = (data) => {
  //    const columns = ['numero','nom','prenom','flag_anomalie','ca','cp','dpt','cod','debut','fin','anomalie']
  const rows = [];
  data.forEach((user) => {
    const userAnomalies = user.ANOMALIES;
    userAnomalies.forEach((anomalie) => {
      const infoAnomalies = {
        numero: user.NUMERO,
        nom: user.NOM,
        prenom: user.PRENOM,
        flag_anomalie: user.HASANOMALIES,
        ca: user.CA,
        cp: user.CP,
        dpt: user.DPT,
        cod: anomalie.subcod,
        debut: anomalie.debut,
        fin: anomalie.fin,
        anomalie: anomalie.libelle,
      };
      rows.push(infoAnomalies);
    });
  });
  console.log("Rows : ", rows);

  return rows;
};
//   export const exportCSV = (data) => {
//     const csvData = []

//     let csvRowData = []
//     csvRowData.push(['numero','nom','prenom','flag_anomalie','ca','cp','dpt','cod','debut','fin','anomalie'])

//     data.forEach(d => {
//         let csvAnomalies = []
//         const anomalies = d.groups[0].data[0].ANOMALIES
//         anomalies.forEach(a => {
//             csvAnomalies = []
//             csvAnomalies.push(
//                     d.groups[0].data[0].NUMERO,
//                     d.groups[0].data[0].NOM,
//                     d.groups[0].data[0].PRENOM,
//                     d.groups[0].data[0].HASANOMALIES,
//                     d.groups[0].data[0].CA,
//                     d.groups[0].data[0].CP,
//                     d.groups[0].data[0].DPT,
//                     a.subcod,
//                     a.debut,
//                     a.fin,
//                     a.libelle,
//                     )
//         })
//         csvRowData.push(csvAnomalies)
//         csvData.push(csvRowData)
//     })
//     return csvData
// }

export const JoursFeries = (an) => {
  var JourAn = new Date(an, "00", "01");
  var FeteTravail = new Date(an, "04", "01");
  var Victoire1945 = new Date(an, "04", "08");
  var FeteNationale = new Date(an, "06", "14");
  var Assomption = new Date(an, "07", "15");
  var Toussaint = new Date(an, "10", "01");
  var Armistice = new Date(an, "10", "11");
  var Noel = new Date(an, "11", "25");
  var SaintEtienne = new Date(an, "11", "26");

  var G = an % 19;
  var C = Math.floor(an / 100);
  var H =
    (C - Math.floor(C / 4) - Math.floor((8 * C + 13) / 25) + 19 * G + 15) % 30;
  var I =
    H -
    Math.floor(H / 28) *
      (1 -
        Math.floor(H / 28) *
          Math.floor(29 / (H + 1)) *
          Math.floor((21 - G) / 11));
  var J = (an * 1 + Math.floor(an / 4) + I + 2 - C + Math.floor(C / 4)) % 7;
  var L = I - J;
  var MoisPaques = 3 + Math.floor((L + 40) / 44);
  var JourPaques = L + 28 - 31 * Math.floor(MoisPaques / 4);
  var Paques = new Date(an, MoisPaques - 1, JourPaques);
  var VendrediSaint = new Date(an, MoisPaques - 1, JourPaques - 2);
  var LundiPaques = new Date(an, MoisPaques - 1, JourPaques + 1);
  var Ascension = new Date(an, MoisPaques - 1, JourPaques + 39);
  var Pentecote = new Date(an, MoisPaques - 1, JourPaques + 49);
  var LundiPentecote = new Date(an, MoisPaques - 1, JourPaques + 50);

  //	return [JourAn, VendrediSaint, Paques, LundiPaques, FeteTravail, Victoire1945, Ascension, Pentecote, LundiPentecote, FeteNationale, Assomption, Toussaint, Armistice, Noel, SaintEtienne]
  return [
    JourAn,
    VendrediSaint,
    Paques,
    LundiPaques,
    FeteTravail,
    Victoire1945,
    Ascension,
    Pentecote,
    FeteNationale,
    Assomption,
    Toussaint,
    Armistice,
    Noel,
    SaintEtienne,
  ];
};

export const createEJ2Dataset = (cols, rows) => {
  let data = {};
  const result = [];
  rows.forEach((row) => {
    cols.forEach((col) => {
      data[col] = row;
    });
    result.push(data);
  });
  return result;
};
