import React from 'react';
import windstop from '../reducers/windstop';
import { connect } from 'react-redux';


class WindStop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rotate: 0,
      rotating: false,  
    };
    
  }
  componentWillReceiveProps(props) {
    this.setState(props.windstop);
  }

  render() {
    const styles = {
      transition: 'all 1.25s ease',
      height: this.state.height,
      transform: 'rotate(' + this.state.rotate + 'deg)'
    };
    return (
      <div 
        id="windStop"
        style={this.state.rotating ? {'z-index': 0} : {}}
      >
        <img
          className={this.state.rotating ? 'rotating' : ''}
          style={{ ...styles}}
          src={this.props.imageUrl} 
          alt="turny-thing"
        />
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  windstop: state.windstop
});

export default connect(mapStateToProps)(WindStop);