import React, { Component } from "react";
import { withCookies } from "react-cookie";

import { Route, Switch, Redirect } from "react-router";

import Error from "views/Error/Error";
import BrowserRefresh from "views/Utils/BrowserRefresh";

// pages for this product
import AboutUsPage from "views/AboutUsPage/AboutUsPage.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import SignupPage from "views/SignupPage/SignupPage.js";
import ErrorPage from "views/ErrorPage/ErrorPage.js";
import DashboardPage from "views/Dashboard/Dashboard.js";
import PeoplePage from "views/PeoplePage/PeoplePage.js";
import PeopleDetailsPage from "views/PeoplePage/PeopleDetailsPage.js";
import HRAAbsencesPage from "views/Absence/HRAAbsencesPage";
import LNAbsencesPage from "views/Absence/LNAbsencesPage";
import AnomaliesPage from "views/Anomalies/AnomaliesPage";
import AnomalieDetailsPage from "views/Anomalies/AnomalieDetailsPage.js";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRefresh />
        <Switch>
          <Route path="/about-us" component={AboutUsPage} />
          <Route
            path="/landing-page"
            render={() => <LandingPage cookies={this.props.cookies} />}
          />
          <Route
            path="/login-page"
            render={() => <LoginPage cookies={this.props.cookies} />}
          />
          <Route
            path="/dashboard-page"
            render={() => <DashboardPage cookies={this.props.cookies} />}
          />
          <Route path="/signup-page" component={SignupPage} />
          <Route path="/error-page" component={ErrorPage} />
          <Route path="/people-page" component={PeoplePage} />
          <Route path="/HRAabsence-page" component={HRAAbsencesPage} />
          <Route path="/LNabsence-page" component={LNAbsencesPage} />
          <Route path="/anomalies-page" component={AnomaliesPage} />
          <Route
            path="/people-details-page/:id"
            component={PeopleDetailsPage}
          />
          <Route
            path="/anomalie-details-page/:id"
            component={AnomalieDetailsPage}
          />
          <Redirect from="/" to="/login-page" />
        </Switch>
        <Error duration={5000} />
      </div>
    );
  }
}

export default withCookies(App);
