import React, { Component } from "react";
import { withCookies } from "react-cookie";

import { Route, Switch, Redirect } from "react-router";

import Error from "views/Error/Error";

// pages for this product
import AboutUsPage from "views/AboutUsPage/AboutUsPage.js";
import BlogPostPage from "views/BlogPostPage/BlogPostPage.js";
import BlogPostsPage from "views/BlogPostsPage/BlogPostsPage.js";
import ComponentsPage from "views/ComponentsPage/ComponentsPage.js";
import ContactUsPage from "views/ContactUsPage/ContactUsPage.js";
import EcommercePage from "views/EcommercePage/EcommercePage.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import PresentationPage from "views/PresentationPage/PresentationPage.js";
import PricingPage from "views/PricingPage/PricingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import ProductPage from "views/ProductPage/ProductPage.js";
import SectionsPage from "views/SectionsPage/SectionsPage.js";
import ShoppingCartPage from "views/ShoppingCartPage/ShoppingCartPage.js";
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
        <Switch>
          <Route path="/about-us" component={AboutUsPage} />
          {/* <Route path="/blog-post" component={BlogPostPage} />
          <Route path="/blog-posts" component={BlogPostsPage} />
          <Route path="/components" component={ComponentsPage} />
          <Route path="/contact-us" component={ContactUsPage} />
          <Route path="/ecommerce-page" component={EcommercePage} /> */}
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
          {/* <Route path="/pricing" component={PricingPage} />
          <Route path="/profile-page" component={ProfilePage} />
          <Route path="/product-page" component={ProductPage} />
          <Route path="/sections" component={SectionsPage} />
          <Route path="/shopping-cart-page" component={ShoppingCartPage} /> */}
          <Route path="/signup-page" component={SignupPage} />
          <Route path="/error-page" component={ErrorPage} />
          {/* <Route path="/presentation-page" component={PresentationPage} /> */}
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
          {/* <Route path="/" component={PresentationPage} /> */}
        </Switch>
        <Error duration={5000} />
      </div>
    );
  }
}

export default withCookies(App);
