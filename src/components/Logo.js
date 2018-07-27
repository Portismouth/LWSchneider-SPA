import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { revertWindstop } from '../actions/windstop';

const Logo = props => {
  return (props.customHandler) ?
  <div>
    <style dangerouslySetInnerHTML={{__html: '#logo {display: none}'}} />
    <img id="logo" className="home" onClick={props.customHandler} src={props.imageUrl} alt="logo" />
  </div>
  :
  <div>
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
