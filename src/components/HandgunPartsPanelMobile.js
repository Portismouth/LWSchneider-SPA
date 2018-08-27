import React, { Component } from 'react';
import {connect} from 'react-redux';

import {setGallery} from '../actions/overlay';

import PartCallouts from './PartCallouts';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
{/* captionText={
  image.part_callouts.map(
    (callout) => (callout.callout)
  ).join("\n ")
} */}

class MobilePartsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      touchX: null
    };
    this.slicedGunGroup = this.props.handgunsGroup.slice(1);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.openGallery = this.openGallery.bind(this);
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
        this.next()
      } else if (this.state.touchX - e.changedTouches[0].clientX < 0) {
        this.previous()
      }
      this.setState({ touchX: null })
    }
  }
  onExiting() {
    this.animating = true;
  }
  onExited() {
    this.animating = false;
  }
  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.slicedGunGroup.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }
  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.slicedGunGroup.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }
  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }
  openGallery(e) {
    e.stopPropagation()
    this.props.dispatch(setGallery(this.props.handgunsGroup[e.target.id.slice(8)].part_gallery))
  }
  render() {
    const { activeIndex } = this.state;
    const handgunsGroup = this.props.handgunsGroup.slice(1);
    const slides = handgunsGroup.map((image, i) => (
      <CarouselItem
        onExiting={this.onExiting}
        onExited={this.onExited}
        key={image.part_label + 'div'}
      >
        <img
          className={'handgun parts-panel'}
          src={image.part_image}
          alt="parts"
          key={image.part_label}
        />
        <div id="mobilePartsCar" className="carousel-caption">
          <h3>{image.part_label}</h3>
          {image.part_callouts.map((callout, i) => (
            <p
              key={callout.callout}
            >
              {callout.callout}
            </p>
          ))}
          {image.part_gallery && (
            <button
              className="button--open-gallery"
              onClick={this.openGallery}
              id={`gallery-${i + 1}`}
            ></button>
          )}
        </div>
      </CarouselItem>
    ));
    return (
      <div
        className="row no-gutters justify-content-center"
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
      >
        <div className="col-10">
          <div className="row no-gutters justify-content-center">
            <p className="parts-hint">Swipe right or left to view parts</p>
          </div>
          <div id="mobileHandgunCarousel" className="row no-gutters justify-content-center">
            <Carousel
              activeIndex={activeIndex}
              next={this.next}
              previous={this.previous}
              ride={'carousel'}
              interval={false}
            >
              <CarouselIndicators items={slides} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
              {slides}
            </Carousel>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(MobilePartsPanel)