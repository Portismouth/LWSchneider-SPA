
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavItem, NavLink as Link, NavbarBrand, NavbarToggler } from 'reactstrap';
import WindStop from './WindStop';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    }
    this.toggle = this.toggle.bind(this)
  }
  toggle() {
    if(window.innerWidth < 992) {
      this.setState({
        isOpen: !this.state.isOpen
      })
    }
  }
  render() {
    return (
      <Navbar light expand="lg">
        <NavbarBrand
          className="d-lg-none"
        >
          <NavLink 
            to="/"
            onClick={this.state.isOpen && this.toggle}
          >
            <img id="logo" src="https://lws.impactpreview.com/wp-content/uploads/2018/06/lws-logo.svg" alt=""/>
          </NavLink>
        </NavbarBrand>
        <NavbarToggler 
          onClick={this.toggle} 
          style={{ 
          backgroundImage: this.state.isOpen 
            ? 'url(https://lws.impactpreview.com/wp-content/uploads/2018/07/closemenu.svg)' 
            : 'url(https://lws.impactpreview.com/wp-content/uploads/2018/07/hamburgermenu.svg)',
            backgroundRepeat: "no-repeat" 
          }} 
        />
        <Collapse isOpen={this.state.isOpen} navbar>
          <div id="windStopNav">
            <img
              src="https://lws.impactpreview.com/wp-content/uploads/2018/06/windstop-overlay.svg"
              alt="turny-thing"
            />
          </div>
          <Nav navbar>
            <NavItem>
              <NavLink 
                to="/capabilities" 
                className="nav-link" 
                activeClassName="is-active" 
                onClick={this.toggle}
              >
                Capabilities
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink 
                to="/values" 
                className="nav-link" 
                activeClassName="is-active" 
                onClick={this.toggle}
              >
                Values
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink 
                to="/about" 
                className="nav-link" 
                activeClassName="is-active" 
                onClick={this.toggle}
              >
                About
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink 
                to="/contact" 
                className="nav-link" 
                activeClassName="is-active" 
                onClick={this.toggle}
              >
                Contact
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
