import React from 'react';
// import _ from 'lodash';
import { connect } from 'react-redux';
import { scaleWindstop } from '../actions/windstop';

//Component Imports
import CapabilitiesPageCarousel from './CapabilitiesPageCarousel';
import CapabilitesPageListings from './CapabiltiesPageListings';
import Panel from './Panel';
import PanelTitle from './PanelTitle';
import PanelText from './PanelText';
import HandgunPartsPanel from './HandgunPartsPanel';
import HandgunPartsPanelMobile from './HandgunPartsPanelMobile';
import RiflePartsPanel from './RiflePartsPanel';
import RiflePartsPanelMobile from './RiflePartsPanelMobile';
import ScrollButton from './ScrollButton';
import { setPanel } from '../actions/panel';

class CapabilitiesPage extends React.Component {
  state = {
    assets: [],
    activePartsPanel: 0,
    activeButton: 0,
    didScroll: 0,
    throttleSwitch: 0,
    touchX: null,
    touchY: null
  };
  componentWillMount() {
    this.props.dispatch(setPanel(0))
  }
  componentDidMount() {
    fetch('https://lws.impactpreview.com/wp-json/wp/v2/pages/133')
      .then(res => res.json())
      .then(
        result => {
          console.log(result);
          const baseResult = result.acf['capabilities_panel_group'];
          this.setState({
            assets: Object.values(baseResult)
          });
        },
        error => {
          console.log(error);
        }
      );
    this.props.dispatch(scaleWindstop());
    this.interval = setInterval(() => {
      if (this.state.throttleSwitch > 0) this.setState({throttleSwitch: this.state.throttleSwitch - 1})      
      if (this.state.didScroll !== 0) {
        this.handleChangePanels(this.state.didScroll)
        this.setState({didScroll: 0})
      }
    }, 100)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  handleScroll = e => {
    if (this.state.didScroll === 0 && this.state.throttleSwitch === 0) this.setState({didScroll: e.deltaY})
  }
  handleTouchStart = e => {
    this.setState({
        touchX: e.changedTouches[0].clientX,
        touchY: e.changedTouches[0].clientY
    })
  }
  handleTouchEnd = e => {
    let deltaX = this.state.touchX - e.changedTouches[0].clientX
    let deltaY = this.state.touchY - e.changedTouches[0].clientY
    let slope = Math.abs(deltaY / deltaX)
    if (this.state.touchY && slope >= .5 && Math.abs(deltaY) > 20) {
      this.handleChangePanels(deltaY)
    }
    this.setState({touchX: null, touchY: null})
  }
  handleChangePanels = direction => {
    if (direction > 0 && this.props.panel.index < this.state.assets.length - 1) {
      this.props.dispatch(setPanel(this.props.panel.index + 1));
      this.setState({
        throttleSwitch: 12
      });
    } else if (direction < 0 && this.props.panel.index > 0) {
      this.props.dispatch(setPanel(this.props.panel.index - 1));
      this.setState({
        throttleSwitch: 12
      })
    }
  };
  handleChangePartsPanels = () => {
    this.state.activePartsPanel === 0
      ? this.setState({
          activePartsPanel: 1,
          activeButton: 1
        })
      : this.setState({
          activePartsPanel: 0,
          activeButton: 0
        });
  };
  render() {
    const assets = this.state.assets;
    const panelIndex = this.props.panel.index;
    const panels = assets.map((asset, i) => (
      <Panel
        className={panelIndex == i ? 'panel active' : 'panel inactive'}
        key={i + 1}
      >
        {/* Home Panel */}
        {i === 0 && (
          <div className="content-wrapper">
            <PanelTitle panelTitle={asset.panel_title} />
            <PanelText panelText={asset.panel_text} />
          </div>
        )}
        {/* Parts Panel */}
        {i === 1 && (
          <div className="content-wrapper">
            <PanelTitle 
              titleId={"handgunPartsTitle"}
              panelTitle={asset.panel_title} 
              colSpan={6} 
            />
            <div className="row no-gutters justify-content-center">
              <p className="explore-text d-none d-lg-block">Click Below to Explore</p>
            </div>
            <div className="row no-gutters justify-content-center">
              <div className="col-lg-6">
                <div className="row no-gutters justify-content-between">
                  <div className="col-lg-auto col-6">
                    <button
                      className={
                        this.state.activeButton === 0
                          ? 'button--parts active'
                          : 'button--parts'
                      }
                      onClick={this.handleChangePartsPanels}
                    >
                      Handguns
                    </button>
                  </div>
                  <div className="col-lg-auto col-6">
                    <button
                      className={
                        this.state.activeButton === 1
                          ? 'button--parts active'
                          : 'button--parts'
                      }
                      onClick={this.handleChangePartsPanels}
                    >
                      Modern Sporting Rifles
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {this.state.activePartsPanel === 0 ? (
              window.innerWidth > 576 
                ? <HandgunPartsPanel handgunsGroup={asset.handguns_group} />
                  : <HandgunPartsPanelMobile handgunsGroup={asset.handguns_group} />
            ) : (
              window.innerWidth > 576
                ? <RiflePartsPanel sportingRiflesGroup={asset.sporting_rifles_group} />
                  : <RiflePartsPanelMobile handgunsGroup={asset.sporting_rifles_group} />
            )}
          </div>
        )}
        {/* For Gallery Panel */}
        {i === 2 && (
          <div className="content-wrapper">
            <PanelTitle panelTitle={asset.panel_title} />
            <CapabilitiesPageCarousel galleryImages={asset.gallery_images} />
            <PanelText panelText={asset.panel_text} />
          </div>
        )}
        {i === 3 && (
          <div 
            id="capabilitiesListing"
            className="content-wrapper">
            <CapabilitesPageListings
              pageListing={asset.capabilities_listings}
            />
          </div>
        )}
      </Panel>
    ));
    let buttonText = ''
    if (panelIndex == 0) buttonText = 'See Parts'
    else if (panelIndex == 1) buttonText = 'See Gallery'
    else if (panelIndex == 2) buttonText = 'See Processes'
    return (
      <div
        className="page"
        onWheel={this.handleScroll}
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
      >
        {(panelIndex !== 0) ?
          <ScrollButton
            arrowUp={true}
            buttonText={panelIndex === 1 && "Go Back"}
            handleChangePanels={() => this.handleChangePanels(-1)}
          />
          : null
        }
        {panels}
        {(panelIndex < assets.length - 1) ?
          <ScrollButton
            handleChangePanels={() => this.handleChangePanels(1)}
            buttonText={buttonText}
          />
          : null
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  windstop: state.windstop,
  panel: state.panel
});

export default connect(mapStateToProps)(CapabilitiesPage);