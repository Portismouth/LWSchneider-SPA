import React from 'react';
import { NavLink } from 'react-router-dom';

import LinkedIn from './LinkedIn';

const Footer = () => (
  <div
    id="footer"
    className="row no-gutters justify-content-center d-none d-md-flex"
  >
    <div className="col-11">
      <div className="row no-gutters">
        <div className="col-4">
          <div className="row no-gutters">
            <div className="col-lg-6">
              <a
                className="address"
                href="https://goo.gl/maps/i3cJNAnpTnM2"
                target="_blank"
              >
                <div className="row no-gutters">1180 North Sixth Street</div>
                <div className="row no-gutters">Princeton, IL 61356</div>
              </a>
            </div>
            <div className="col-lg-6 d-flex align-items-end">
              <div className="row no-gutters">
                <a className="phone" href="tel:+815-875-3835">
                  815-875-3835
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-1 d-flex align-items-center">
          <LinkedIn />
        </div>
        <div className="col-7">
          <div className="row no-gutters justify-content-end">
            <NavLink
              id="careersLink"
              to={{
                pathname: '/careers'
              }}
              activeClassName="is-active"
              className="text-right"
            >
              CAREERS
            </NavLink>
          </div>
          <div className="row no-gutters justify-content-end">
            <p className="copyright text-right">
              &copy; {new Date().getFullYear()} L.W. Schneider. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  windstop: state.windstop
});

export default (Footer);
