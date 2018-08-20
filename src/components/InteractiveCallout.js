import React from 'react'
import {connect} from 'react-redux'

class InteractiveCallout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
    this.toggle = this.toggle.bind(this)
  }
  toggle() {
    this.setState({open: !this.state.open})
  }
  blank(e) {
    // no action happens if you click image itself
    e.stopPropagation()
  }
  componentWillReceiveProps() {
    if (this.state.open) this.setState({open: false})
  }
  render() {
    return (
      <div className="interactive-callout" onClick={this.toggle}>
        <span>{this.props.text}</span>
        {this.state.open && (
          <div className="callout-image">
            <div className="img-holder">
              <img
                onClick={this.blank}
                src={this.props.image}
                alt={this.props.text}
              />
              <div className="modal-controller"></div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  panel: state.panel
})

export default connect(mapStateToProps)(InteractiveCallout)