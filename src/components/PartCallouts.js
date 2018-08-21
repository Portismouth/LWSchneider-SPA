import React from 'react'
import {connect} from 'react-redux'

import {setImage} from '../actions/overlay'

class PartCallouts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.open = this.open.bind(this)
  }
  open(e) {
    this.props.dispatch(setImage(this.props.callouts[e.target.id].callout_image, {translucent: true}))
  }
  componentWillUnmount() {
    if (this.props.overlay.image) this.props.dispatch(setImage(null))
  }
  render() {
    const callouts = this.props.callouts.map((callout, i) => (
      <li 
        key={callout.callout}
      >
        {(callout.callout_image) ?
          <div
            id={i}
            className="interactive-callout"
            onClick={this.open}
          >
            {callout.callout}
          </div>
          : callout.callout
        }
      </li>
    ))
    return (
      <ul
        className="part-callouts" 
        style={this.props.style}
      >
        {callouts}
      </ul>
    )
  }
}

const mapStateToProps = state => ({
  overlay: state.overlay
})

export default connect(mapStateToProps)(PartCallouts);
