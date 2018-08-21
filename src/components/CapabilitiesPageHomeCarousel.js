import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

export default class AboutPageCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      touchX: null
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
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
      this.setState({touchX: null})
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
    const nextIndex = this.state.activeIndex === this.props.images.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }
  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.props.images.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }
  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }
  render() {
    const { activeIndex } = this.state;
    const slides = this.props.images.map((image, i) => (
      <CarouselItem
        onExiting={this.onExiting}
        onExited={this.onExited}
        key={image.carousel_image}
      >
        <img className="cap-carousel-img" src={image.carousel_image} alt="image" />
      </CarouselItem>
    ));
    return (
      <div
        className="row no-gutters justify-content-center"
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
      >
        <div className="col-11 col-lg-6">
          <div id="capPageHomeCarousel" className="row no-gutters justify-content-center pad-bot-15">
            <Carousel
              activeIndex={activeIndex}
              next={this.next}
              previous={this.previous}
              ride={'carousel'}
              interval={2000}
            >
              <CarouselIndicators items={slides} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
              {slides}
            </Carousel>
          </div>
        </div>
      </div>
    )
  }
}
