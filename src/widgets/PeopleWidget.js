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

import { makeStyles } from "@material-ui/core/styles";

import Slide from "@material-ui/core/Slide";

import PeopleOutlineOutlinedIcon from "@material-ui/icons/PeopleOutlineOutlined";
import LocalOffer from "@material-ui/icons/LocalOffer";

import javascriptStyle from "assets/jss/material-kit-pro-react/views/componentsSections/javascriptStyles.js";
import modalStyle from "assets/jss/material-kit-pro-react/modalStyle.js";
import dashStyle from "assets/jss/material-kit-pro-react/views/dashboardStyle.js";
import cardStyle from "assets/jss/material-kit-pro-react/components/cardStyle.js";
import cardHeaderStyle from "assets/jss/material-kit-pro-react/components/cardHeaderStyle.js";
import cardBodyStyle from "assets/jss/material-kit-pro-react/components/cardBodyStyle.js";
import cardFooterStyle from "assets/jss/material-kit-pro-react/components/cardFooterStyle.js";
import typoStyle from "assets/jss/material-kit-pro-react/components/typographyStyle.js";

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

const PeopleWidget = (props, { ...rest }) => {
  const classes = useStyles();

  const [nbPeople, setnbPeople] = useState(0);
  const [nbHRAPeople, setnbHRAPeople] = useState(0);
  const [nbLNPeople, setnbLNPeople] = useState(0);

  useEffect(() => {
    setnbPeople(props.people.length);
    setnbLNPeople(props.people.filter((p) => p.source === 1).length);
    setnbHRAPeople(props.people.filter((p) => p.source === 2).length);
    return () => {};
  }, [props.people]);

  const openPeopleFilter = (e) => {
    e.preventDefault();
    props.history.push("/people-page");
  };

  return (
    <div className={classes.container}>
      <Card>
        <CardHeader
          onClick={(e) => {
            openPeopleFilter(e);
          }}
          color={props.headerColor}
        >
          <CardIcon color={props.headerColor}>
            <PeopleOutlineOutlinedIcon fontSize="large" />
          </CardIcon>
          <p className={classes.cardCategory}>Collaborateurs</p>
        </CardHeader>
        <CardBody>
          <h3 className={classes.cardTitle}>
            {nbPeople}
            <small> collaborateurs</small>
          </h3>
          <h4>
            <b>{nbLNPeople}</b> <small> références LN </small>
          </h4>
          <h4>
            <b>{nbHRAPeople}</b>{" "}
            <small>
              {" "}
              références HRA <i> non trouvés dans référence LN</i>
            </small>
          </h4>
        </CardBody>
        <CardFooter>
          <div className={classes.stats}>
            <LocalOffer />
            Suivis dans fichier LN
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    firstname: state.auth.firstname,
    lastname: state.auth.lastname,
    cookies: ownProps.cookies,
    people: state.people.people,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PeopleWidget)
);
