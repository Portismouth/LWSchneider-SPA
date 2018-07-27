import React from 'react'

const ValuesPageHero = (props) => (
  <div className="row no-gutters justify-content-center">
    <div className="col-11 col-lg-6">
      <img className="values-hero" src={props.imageSrc} alt="hero image" />
    </div>
  </div>
)

export default ValuesPageHero;
