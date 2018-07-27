import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { revertWindstop } from '../actions/windstop';

const Logo = props => {
  return (props.customHandler) ?
  // This is here so you can implement custom logic for what clicking the logo does on different pages
  // Specifically, when you are on the home page it goes to top panel instead of being a link
  <div
    className="d-none d-lg-block"
  >
    <style dangerouslySetInnerHTML={{__html: '#logo {display: none}'}} />
    <img id="logo" className="home" onClick={props.customHandler} src={props.imageUrl} alt="logo" />
  </div>
  :
  <div 
    className="d-none d-lg-block"
  >
    <Link 
      to="/"
      onClick={() => (props.dispatch(revertWindstop()))}
    >
      <img id="logo" src={props.imageUrl} alt="logo" />
    </Link>
  </div>
};

const mapStateToProps = state => ({
  windstop: state.windstop
});

export default connect(mapStateToProps)(Logo);
