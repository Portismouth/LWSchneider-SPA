import React, { Component } from 'react';
import { connect } from 'react-redux';

class CapabilitiesPageCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frontItem: 0,
      startItem: 1,
      position: 0,
      rightItem: 1,
      leftItem: this.props.galleryImages.length - 1,
      itemCount: this.props.galleryImages.length,
      magnify: false,
      touchX: null
    };
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
    this.handleSwapLeft = this.handleSwapLeft.bind(this);
    this.handleSwapRight = this.handleSwapRight.bind(this);
    this.handleClickLeft = this.handleClickLeft.bind(this);
    this.handleClickRight = this.handleClickRight.bind(this);
    this.toggleMagnify = this.toggleMagnify.bind(this);
    this.closeMagnify = this.closeMagnify.bind(this);
  }
  handleTouchStart(e) {
    e.stopPropagation()
    this.setState({
      touchX: e.changedTouches[0].clientX
    })
  }
  handleTouchEnd(e) {
    e.stopPropagation()
    if (this.state.touchX) {
      if (this.state.touchX - e.changedTouches[0].clientX > 0) {
        this.handleSwapLeft()
      } else if (this.state.touchX - e.changedTouches[0].clientX < 0) {
        this.handleSwapRight()
      }
      this.setState({touchX: null})
    }
  }
  handleClickLeft() {
    if (window.innerWidth > 991) this.handleSwapLeft()
  }
  handleClickRight() {
    if (window.innerWidth > 991) this.handleSwapRight()
  }
  handleSwapLeft() {
    let { leftItem, frontItem, rightItem, itemCount } = this.state;
    this.setState({
      rightItem: (rightItem < itemCount - 1) ? rightItem + 1 : 0,
      frontItem: (frontItem < itemCount - 1) ? frontItem + 1 : 0,
      leftItem: (leftItem < itemCount - 1) ? leftItem + 1 : 0,
      magnify: false
    });
  }
  handleSwapRight() {
    let { leftItem, frontItem, rightItem, itemCount } = this.state;
    this.setState({
      rightItem: (rightItem > 0) ? rightItem - 1 : itemCount - 1,
      frontItem: (frontItem > 0) ? frontItem - 1 : itemCount - 1,
      leftItem: (leftItem > 0) ? leftItem - 1 : itemCount - 1,
      magnify: false
    });
  }
  toggleMagnify(e) {
    this.setState({magnify: !this.state.magnify})
  }
  closeMagnify() {
    if (this.state.magnify) this.setState({magnify: false})
  }
  componentWillReceiveProps() {
    if (this.state.magnify) this.setState({magnify: false})
  }
  render() {
    const { leftItem, frontItem, rightItem } = this.state;
    const images = this.props.galleryImages;
    const slides = images.map((image, i) => {
      return (
        <div
          className={
            i === frontItem
              ? `col-8 col-lg-5 items front${this.state.magnify ? ' magnify' : ''}`
              : i === leftItem
                ? 'col-8 col-lg-5 items left'
                : i === rightItem
                  ? 'col-8 col-lg-5 items right'
                  : 'col-8 col-lg-5 items back'
          }
          key={i}
          id={i}
          // onTouchEnd={
          //   i === rightItem
          //     ? this.handleSwapLeft
          //     : i === leftItem
          //       ? this.handleSwapRight
          //       : function(){}
          // }
          onClick={
            i === rightItem
              ? this.handleClickLeft
              : i === leftItem
                ? this.handleClickRight
                : function(){}
          }
        >
          <img className="parts-gallery-image" src={image.gallery_image} alt="" />
          {i === frontItem && (<div className="modal-controller" onClick={this.toggleMagnify}></div>)}
          {/* {this.state.magnify && i === frontItem ?
            <div
              className="callout-image"
              onClick={this.closeMagnify}
            >
              <div className="img-holder">
                <img className="parts-gallery-image" src={image.gallery_image} alt="" />
                <div className="modal-controller" onClick={this.toggleMagnify}></div>
              </div>
            </div>
            :
            <img className="parts-gallery-image" src={image.gallery_image} alt="" />
          }
          {(i === frontItem && !this.state.magnify) && (
            <div className="modal-controller" onClick={this.toggleMagnify}></div>
          )} */}
        </div>
      );
    });
    // console.log(this.state.itemCount)
    return (
      <div className="row no-gutters justify-content-center">
        <div className="col-10">
          {/* <div
            className="click-shield d-lg-none"
            onTouchStart={this.handleTouchStart}
            onTouchEnd={this.handleTouchEnd}
          ></div> */}
          <div
            id="capPageCarousel"
            className="row no-gutters justify-content-center"
            onTouchStart={this.handleTouchStart}
            onTouchEnd={this.handleTouchEnd}
          >
            {slides}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  panel: state.panel
})

export default connect(mapStateToProps)(CapabilitiesPageCarousel)