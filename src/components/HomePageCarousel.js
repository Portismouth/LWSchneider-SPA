import React, { Component } from 'react';


export default class HomePageCarousel extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // let images = [...this.props.images, ...this.props.images.slice(0, 3)];
    let images = this.props.images
    const slideShow = images.map((image, i) => (
      <div
        className={`slide-show-img-container stagger-${i}`}
        style={{backgroundImage: `url(${image.image})`}}
        key={i}
      >
        {/* <img className="home-slider-image" src={image.image} alt="slide-image"/> */}
      </div>
    ))
    return (
      <div className="row no-gutters justify-content-center">
        <div className="slideshow col-10 col-lg-4">
          <div className="slideshow-row">
            {slideShow}
          </div>
        </div>
      </div>
    )
  }
}
