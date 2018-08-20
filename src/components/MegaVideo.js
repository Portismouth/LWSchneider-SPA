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
  blank(e) {
    e.stopPropagation()
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
        <button className="button--link" onClick={this.toggleVideo}>
          See Our Video
        </button>
        <div className="mega-player" onClick={this.toggleVideo}>
          <div className="vid-holder">
            <video
              ref={this.player}
              onClick={this.blank}
              poster="https://lwschneider.com/wp-content/themes/lws-theme/assets/img/VideoPreview.png"
              src={this.props.videoSrc}
              controls
            ></video>
            <div className="modal-controller"></div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  panel: state.panel
})

export default connect(mapStateToProps)(MegaVideo)