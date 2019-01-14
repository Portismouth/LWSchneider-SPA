import React, { Component } from 'react';

export default class LinkedIn extends Component {
  state = {
    hover: false
  };
  handleHoverState() {
    this.setState({
      hover: true
    });
  };
  render() {
    return (
      <div className="row no-gutters">
        <a
          onMouseEnter={() => this.setState({ hover: true })}
          onMouseLeave={() => this.setState({ hover: false })}
          href="https://www.linkedin.com/company/l-w-schneider-inc/"
          target="_blank"
        >
          {this.state.hover ? (
            <img
              src="/wp-content/uploads/2018/06/linkenin-icon-onhover.svg"
              alt=""
            />
          ) : (
            <img
              src="/wp-content/uploads/2018/06/linkenin-icon.svg"
              alt=""
            />
          )}
        </a>
      </div>
    );
  }
}
