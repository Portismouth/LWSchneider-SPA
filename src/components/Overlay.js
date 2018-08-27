import React from 'react'
import {connect} from 'react-redux'

import {setImage, setGallery, setVideo} from '../actions/overlay'

import CapabilitiesPageCarousel from './CapabilitiesPageCarousel'

class Overlay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.closeImage = this.closeImage.bind(this)
    this.closeGallery = this.closeGallery.bind(this)    
    this.closeVideo = this.closeVideo.bind(this)
  }
  closeImage() {
    this.props.dispatch(setImage(null))
  }
  closeGallery() {
    this.props.dispatch(setGallery(null))
  }
  closeVideo() {
    this.props.dispatch(setVideo(null))
  }
  blank(e) {
    // no action happens if you click image itself
    e.stopPropagation()
  }
  render() {
    const options = this.props.overlay.options
    if (this.props.overlay.image) {
      return (
        <div
          className="callout-image"
          onClick={this.closeImage}
        >
          <div className="img-holder">
            <img
              onClick={this.blank}
              className={options.translucent ? 'translucent' : ''}
              src={this.props.overlay.image}
              alt={this.props.text}
            />
            <div
              className={options.controllerClass ? `modal-controller ${options.controllerClass}` : 'modal-controller'}
            ></div>
          </div>
        </div>
      )
    } else if (this.props.overlay.gallery) {
      return (
        <div
          className="callout-image"
          onClick={this.closeGallery}
        >
          <div
            className="gallery-holder"
            onClick={this.blank}
          >
            <CapabilitiesPageCarousel
              galleryImages={this.props.overlay.gallery}
            />
            <div className="modal-controller yellow" onClick={this.closeGallery}></div>
          </div>
        </div>
      )
    } else if (this.props.overlay.video) {
      return (
        <div
          className="mega-player"
          onClick={this.closeVideo}
        >
          <div className="vid-holder">
            <video
              onClick={this.blank}
              src={this.props.overlay.video}
              autoPlay
              controls
            ></video>
            <div className="modal-controller yellow"></div>
          </div>
        </div>
      )
    } else {
      return (null)
    }
  }
}

const mapStateToProps = state => ({
  overlay: state.overlay
})

export default connect(mapStateToProps)(Overlay)