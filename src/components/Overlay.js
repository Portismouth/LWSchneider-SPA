import React from 'react'
import {connect} from 'react-redux'

import { setImage } from '../actions/overlay'

class Overlay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.close = this.close.bind(this)
  }
  close() {
    this.props.dispatch(setImage(null))
  }
  blank(e) {
    // no action happens if you click image itself
    e.stopPropagation()
  }
  // componentWillReceiveProps(newProps) {
  //   if (this.state.open) this.setState({open: false})
  // }
  render() {
    return (this.props.overlay.image ?
      <div
        className="callout-image"
        onClick={this.close}
      >
        <div className="img-holder">
          <img
            onClick={this.blank}
            src={this.props.overlay.image}
            alt={this.props.text}
          />
          <div className="modal-controller"></div>
        </div>
      </div>
      :
      null
    )
  }
}

const mapStateToProps = state => ({
  overlay: state.overlay
})

export default connect(mapStateToProps)(Overlay)