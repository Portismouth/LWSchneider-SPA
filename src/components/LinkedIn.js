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
      <div>
        <a
          onMouseEnter={() => this.setState({ hover: true })}
          onMouseLeave={() => this.setState({ hover: false })}
          href="https://www.linkedin.com/company/l-w-schneider-inc/"
          target="_blank"
        >
          {this.state.hover ? (
            <img
              src="https://lws.impactpreview.com/wp-content/uploads/2018/06/linkenin-icon-onhover.svg"
              alt=""
            />
          ) : (
            <img
              src="https://lws.impactpreview.com/wp-content/uploads/2018/06/linkenin-icon.svg"
              alt=""
            />
          )}
        </a>
      </div>
    );
  }
}
