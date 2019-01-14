
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavItem, NavLink as Link, NavbarBrand, NavbarToggler } from 'reactstrap';
import { revertWindstop } from '../actions/windstop';
import { setPanel } from '../actions/panel';

class Navigation extends Component {
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
    // console.log(Collapse.prototype);
    // console.log('where am i', this.props.location)
    let pathname = this.props.location.pathname
    if (pathname.length > 1 && pathname.slice(-1) == '/') pathname = pathname.slice(0, -1)
    return (
      <Navbar className={this.state.isOpen ? '' : 'retracted'} light expand="lg">
        {(pathname == '/') ?
          <div
            className="d-lg-none"
            onClick={e => {
              if (this.state.isOpen) this.toggle(e)
              this.props.dispatch(revertWindstop())
              this.props.dispatch(setPanel(0))
            }}
          >
            <img id="logo" src="/wp-content/uploads/2018/06/lws-logo.svg" alt=""/>
          </div>
          :
          <NavLink 
            className="d-lg-none"
            to="/"
            onClick={e => {
              if (this.state.isOpen) this.toggle(e)
              this.props.dispatch(revertWindstop())
            }}
          >
            <img id="logo" src="/wp-content/uploads/2018/06/lws-logo.svg" alt=""/>
          </NavLink>
        }
        <NavbarToggler 
          onClick={this.toggle} 
          style={{ 
          backgroundImage: this.state.isOpen 
            ? 'url(/wp-content/uploads/2018/07/closemenu.svg)' 
            : 'url(/wp-content/uploads/2018/07/hamburgermenu.svg)',
            backgroundRepeat: "no-repeat" 
          }} 
        />
        <Collapse isOpen={this.state.isOpen} navbar>
          <div id="windStopNav">
            <img
              src="/wp-content/uploads/2018/06/windstop-overlay.svg"
              alt="turny-thing"
            />
          </div>
          <Nav navbar>
            <NavItem>
              {(pathname == '/') ?
                <div
                  className="nav-link is-active"
                  onClick={e => {
                    this.toggle(e)
                    this.props.dispatch(setPanel(0))
                  }}
                >
                  Home
                </div>
                :
                <NavLink
                  to="/"
                  className="nav-link" 
                  onClick={this.toggle}
                >
                  Home
                </NavLink>
              }
            </NavItem>
            <NavItem>
              {(pathname == '/capabilities') ?
                <div
                  className="nav-link is-active"
                  onClick={e => {
                    this.toggle(e)
                    this.props.dispatch(setPanel(0))
                  }}
                >
                  Capabilities
                </div>
                :
                <NavLink 
                  to="/capabilities" 
                  className="nav-link"  
                  onClick={this.toggle}
                >
                  Capabilities
                </NavLink>
              }
            </NavItem>
            <NavItem>
              {(pathname == '/values') ?
                <div
                  className="nav-link is-active"
                  onClick={e => {
                    this.toggle(e)
                    this.props.dispatch(setPanel(0))
                  }}
                >
                  Values
                </div>
                :
                <NavLink 
                  to="/values" 
                  className="nav-link"  
                  onClick={this.toggle}
                >
                  Values
                </NavLink>
              }
            </NavItem>
            <NavItem>
              {(pathname == '/about') ?
                <div
                  className="nav-link is-active"
                  onClick={e => {
                    this.toggle(e)
                    this.props.dispatch(setPanel(0))
                  }}
                >
                  About
                </div>
                :
                <NavLink 
                  to="/about" 
                  className="nav-link" 
                  activeClassName="is-active" 
                  onClick={this.toggle}
                >
                  About
                </NavLink>
              }
            </NavItem>
            <NavItem>
              {(pathname == '/contact') ?
                <div
                  className="nav-link is-active"
                  onClick={e => {
                    this.toggle(e)
                    this.props.dispatch(setPanel(0))
                  }}
                >
                  Contact
                </div>
                :
                <NavLink 
                  to="/contact" 
                  className="nav-link" 
                  activeClassName="is-active" 
                  onClick={this.toggle}
                >
                  Contact
                </NavLink>
              }
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

// Only mapping this to force component to rerender appropriately
const mapStateToProps = (state) => ({
  panel: state.panel
});

export default connect(mapStateToProps)(Navigation);