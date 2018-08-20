import React, { Component } from 'react';
// import _ from 'lodash';
import { connect } from 'react-redux';
import { scaleWindstop } from '../actions/windstop';
import { setPanel } from '../actions/panel';
require('es6-promise').polyfill();
require('isomorphic-fetch');

//Component Imports
import Panel from './Panel';
import PanelTitle from './PanelTitle';
import PanelText from './PanelText';
import ScrollButton from './ScrollButton';
import ValuesPageHero from './ValuesPageHero';
import ValuesPageVideo from './ValuesPageVideo';

class ValuesPage extends Component {
  state = {
    assets: [],
    didScroll: 0,
    throttleSwitch: 0,
    touchX: null,
    touchY: null
  }
  componentWillMount() {
    this.props.dispatch(setPanel(0))
  }
  componentDidMount() {
    fetch('https://lws.impactpreview.com/wp-json/wp/v2/pages/165')
      .then(res => res.json())
      .then(
        result => {
          console.log(result)
          const baseResult = result.acf['values_panels_group']
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
      this.setState(() => ({
        throttleSwitch: 12
      }));
    } else if (direction < 0 && this.props.panel.index > 0) {
      this.props.dispatch(setPanel(this.props.panel.index - 1));
      this.setState(() => ({
        throttleSwitch: 12
      }));
    }
  };
  render() {
    const assets = this.state.assets;
    const panelIndex = this.props.panel.index;
    const panels = assets.map((asset, i) => (
      <Panel
        className={panelIndex == i ? 'panel active' : 'panel inactive'}
        key={i + 1}
      >
        {i === 0 && (
          <div>
            <ValuesPageHero imageSrc={asset.panel_image} />
            <PanelTitle
              titleId={"valuesHomeTitle"} 
              colSpan={{
                xl: 8,
                lg: 10,
                md: 10
              }}
              panelTitle={asset.panel_title} 
            />
            <PanelText
              colSpan={6} 
              panelText={asset.panel_text} 
            />
          </div>
        )}
        {i === 1 && (
          <div>
            <PanelTitle 
              colSpan={{
                xl: 6,
                lg: 8,
                md: 10
              }}
              panelTitle={asset.panel_title}
              titleId={'lw-break'}
            />
            <ValuesPageVideo videoSrc={asset.panel_video} />
          </div>
        )}
        {i === 2 && (
          <div>
            <ValuesPageHero imageSrc={asset.panel_image} />
            <PanelTitle panelTitle={asset.panel_title} />
            <PanelText
              colSpan={{
                xl: 4,
                lg: 6,
              }} 
              panelText={asset.panel_text} 
            />
          </div>
        )}
        {i === 3 && (
          <ValuesPageHero imageSrc={asset.panel_image} />
        )}
      </Panel>
    ));
    let buttonText = ''
    if (panelIndex === 0) buttonText = 'See Our Video'
    else if (panelIndex === 2) buttonText = 'In The News'
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
    )
  }
}

const mapStateToProps = (state) => ({
  windstop: state.windstop,
  panel: state.panel
});

export default connect(mapStateToProps)(ValuesPage);