import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { revertWindstop } from '../actions/windstop';

const Logo = props => (
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
);

const mapStateToProps = state => ({
  windstop: state.windstop
});

export default connect(mapStateToProps)(Logo);
