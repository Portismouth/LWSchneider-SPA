import React from 'react';

export default class Panel extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div 
        className={this.props.className}
        style={this.props.style}
      >
        <div className="row no-gutters justify-content-center w-100 align-items-center">
          <div className="page-content col-12 justify-content-center">
            {this.props.children} 
          </div>
        </div>
      </div>
    );
  }
}