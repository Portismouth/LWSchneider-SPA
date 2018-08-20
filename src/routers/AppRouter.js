import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

//Component Imports
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import WindStop from '../components/WindStop';
import Overlay from '../components/Overlay';
//Page Imports
import HomePage from '../components/HomePage';
import CapabilitiesPage from '../components/CapabilitiesPage';
import ValuesPage from '../components/ValuesPage';
import AboutPage from '../components/AboutPage';
import ContactPage from '../components/ContactPage';
import CareersPage from '../components/CareersPage';

const AppRouter = () => (
  <BrowserRouter>
    <div className="container-fluid">
      <Logo imageUrl="https://lws.impactpreview.com/wp-content/uploads/2018/06/lws-logo.svg" />
      <Navigation />
      <WindStop imageUrl="https://lws.impactpreview.com/wp-content/uploads/2018/06/windstop-overlay.svg" />
      <Switch location={location} >
        <Route path="/" component={HomePage} exact={true} />
        <Route path="/capabilities" component={CapabilitiesPage} />
        <Route path="/values" component={ValuesPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/careers" component={CareersPage} />
      </Switch>
      <Overlay />
      <Footer />
    </div>
  </BrowserRouter>
);

export default AppRouter;
