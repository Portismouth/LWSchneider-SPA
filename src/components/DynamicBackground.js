import React from 'react'
import {connect} from 'react-redux'

class DynamicBackground extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      background: null
    }

  }
  componentWillReceiveProps(newProps) {
    this.setState({background: newProps.panel.image})
  }
  render() {
    return (this.state.background ?
      <div
        className={'background-container'}
        style={{backgroundImage: `url(${this.state.background})`}}
      ></div>
      :
      null
    )
  }
}

const mapStateToProps = state => ({
  panel: state.panel
})

export default connect(mapStateToProps)(DynamicBackground)