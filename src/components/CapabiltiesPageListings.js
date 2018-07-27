import React from 'react';

export default class CapabilitiesPageListings extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const capabilitiesListings = this.props.pageListing;

    const listings = capabilitiesListings.map((listing, i) => (
      <div 
        key={i + 1}
        className="col-12 col-lg"
      >
        <div className="row no-gutters justify-content-lg-center">
          <h1
            className="capabilities-listing-header"
          >{listing.listings_title}</h1>
            <ul className="capabilities-list">
              {listing.list_items.map((item, i) => (
                <li
                  key={i + 1}
                >
                  {item.list_item}
                </li>
              ))}
            </ul>
        </div>
      </div>
    ))
  return (
    <div className="row no-gutters justify-content-center">
      <div className="col-11 col-lg-7">
        <div className="row no-gutter justify-content-center">
          {listings}
        </div>
      </div>
    </div>
    )
  }
}