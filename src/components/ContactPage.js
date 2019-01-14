import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { scaleWindstop } from '../actions/windstop';

//Component Imports
import Panel from './Panel';
import PanelAddress from './PanelAddress';
import PanelTitle from './PanelTitle';
import PanelText from './PanelText';
import PanelContact from './PanelContact';
import { setPanel } from '../actions/panel';
import GunShowPromo from './GunShowPromo';

class ContactPage extends Component {
  state = {
    panelTitle: '',
    panelText: '',
    panelImage: ''
  }
  // Dispatching this to force Navigation to rerender
  componentWillMount() {
    this.props.dispatch(setPanel(0))
  }
  componentDidMount() {
    fetch('https://lws.impactpreview.com/wp-json/wp/v2/pages/167')
      .then(res => res.json())
      .then(
        result => {
          console.log(result)
          this.setState({
            panelTitle: result.acf.panel_title,
            panelText: result.acf.panel_text,
            panelImage: result.acf.panel_image
          })
        },
        error => {
          console.log(error);
        }
      );
    this.props.dispatch(scaleWindstop());
  }
  render() {
    return (
      <div className="page">
        <Panel
          className="panel"   
          style={{ backgroundImage: `url(${this.state.panelImage})` }}
        >
          <GunShowPromo 
            imageUrl={
              'https://lws.impactpreview.com/wp-content/uploads/2019/01/shot-show-banner-1.png'
            }
          />
          <PanelTitle
            colSpan={3} 
            panelTitle={this.state.panelTitle}
          />
          <PanelText
            textId={"contactText"}
            panelText={this.state.panelText}
          />
          <PanelAddress />
          <PanelContact />
          <div className="row no-gutters justify-content-center mt-4 mt-lg-3">
            <p id="collab" className="panel-text text-center">Want to join our proud team of collaborators?</p>
          </div>
          <div className="row no-gutters justify-content-center">
            <Link className="careers-link" to="/careers">See open positions</Link>
          </div>
        </Panel>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  windstop: state.windstop
});

export default connect(mapStateToProps)(ContactPage);