import React, { Component } from 'react';
import PartCallouts from './PartCallouts';
export default class PartsPanel extends Component {
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
              className="col-3 position-absolute"
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
    return (
      <div className="row no-gutters justify-content-center py-5">
        <div className="col-10 position-relative">
          <div className="row no-gutters justify-content-center">
            <img
              className="parts-image invisible"
              src={handgunsGroup[0]['part_image']}
              alt="parts"
            />
            {handgunPanels}
          </div>
          <div className="row no-gutters justify-content-center">

          </div>
        </div>
      </div>
    );
  }
}
