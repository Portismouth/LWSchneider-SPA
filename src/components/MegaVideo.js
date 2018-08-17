import React from 'react'
import {connect} from 'react-redux'

class MegaVideo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false
    }
    this.player = React.createRef()

    this.toggleVideo = this.toggleVideo.bind(this)
  }
  toggleVideo() {
    if (!this.state.active) this.player.current.play()
    else this.player.current.pause()
    this.setState({active: !this.state.active})
  }
  componentWillReceiveProps() {
    if (this.state.active) {
      this.player.current.pause()
      this.setState({active: false})
    }
  }
  render() {
    // console.log(this.player)
    return (
      <div className={`row mega-video justify-content-center${this.state.active ? ' active' : ''}`}>
        <button onClick={this.toggleVideo}>
          Yo check out this video dawg
        </button>
        <video
          ref={this.player}
          onClick={this.toggleVideo}
          src={this.props.videoSrc}
        ></video>
        <div
          className="mega-video-controller modal-controller"
          onClick={this.toggleVideo}
        ></div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  panel: state.panel
})

export default connect(mapStateToProps)(MegaVideo)