import React, { Component } from 'react';
import {connect} from 'react-redux';

import {setGallery} from '../actions/overlay';

import PartCallouts from './PartCallouts';

class PartsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panelIndex: 0,
      partsIndex: 'Main'
    };
  }
  handleTogglePartsImage = e => {
    this.setState({
      partsIndex: e.target.value
    });
  };
  openGallery = e => {
    this.props.dispatch(setGallery(this.props.handgunsGroup[e.target.id.slice(8)].part_gallery))
  };
  render() {
    const partsIndex = this.state.partsIndex;
    const handgunsGroup = this.props.handgunsGroup;
    const handgunPanels = handgunsGroup.map((image, i) => (
      <div className="col-10 position-absolute" key={image.part_label}>
        <div className="row no-gutters justify-content-center">
          <img
            className={
              partsIndex == image.part_label
                ? 'handgun parts-panel active'
                : 'handgun parts-panel inactive'
            }
            src={image.part_image}
            alt="parts"
            key={image.part_label}
          />
          {image.part_label !== 'Main' && (
            <div
              id={image.part_label.replace(/ /g, '') + 'Div'}
              className="col-3 position-absolute d-none d-lg-block"
              key={image.part_label + 'div'}
            >
              <div className="row no-gutters">
                <button
                  className={
                    this.state.partsIndex === image.part_label
                      ? 'button--parts-panel active'
                      : 'button--parts-panel'
                  }
                  id={image.part_label.replace(/ /g, '') + 'Button'}
                  onClick={this.handleTogglePartsImage}
                  value={image.part_label}
                >
                  {image.part_label}
                </button>
                {image.part_gallery && this.state.partsIndex === image.part_label && (
                  <button
                    className="button--open-gallery"
                    onClick={this.openGallery}
                    id={`gallery-${i}`}
                  ></button>
                )}
              </div>
              <div className="row no-gutters">
                <PartCallouts
                  callouts={image.part_callouts && image.part_callouts}
                  style={
                    partsIndex == image.part_label
                      ? { visibility: 'visible' }
                      : { visibility: 'hidden' }
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>
    ));
    return <div className="row no-gutters justify-content-center py-5">
        <div id="handgunPartShowcase" className="col-10 position-relative">
          <div className="row no-gutters justify-content-center">
            <img className="parts-image invisible" src={handgunsGroup[0]['part_image']} alt="parts" />
            {handgunPanels}
          </div>
          <div className="row no-gutters justify-content-center" />
        </div>
      </div>;
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(PartsPanel)