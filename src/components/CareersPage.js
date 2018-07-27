import React, { Component } from 'react';
import { connect } from 'react-redux';
import { scaleWindstop } from '../actions/windstop';

//Component Imports
import Panel from './Panel';
import PanelTitle from './PanelTitle';
import PanelText from './PanelText';

class CareersPage extends Component {
  state = {
    panelTitle: '',
    panelText: '',
    panelImage: '',
    jobListings: [],
    peopleImage: ''
  }
  componentDidMount() {
    fetch('https://lws.impactpreview.com/wp-json/wp/v2/pages/292')
      .then(res => res.json())
      .then(
        result => {
          console.log(result)
          this.setState({
            panelTitle: result.acf.panel_title,
            panelText: result.acf.panel_text,
            panelImage: result.acf.panel_image,
            jobListings: result.acf.open_positions,
            peopleImage: result.acf.people_link_image
          })
        },
        error => {
          console.log(error);
        }
      );
    this.props.dispatch(scaleWindstop())
  }
  render() {
    const jobListings = this.state.jobListings.map((listing, i) => (
      <div 
        className={
          i === this.state.jobListings.length-1
          ? "job-listing border-top border-bottom py-1 py-lg-2"
          : "job-listing border-top py-1 py-lg-2"
        }
        key={i}
      >
        <div 
          className="row no-gutters">
          <p className="career-col-heading">
            {listing.position_title}
          </p>
        </div>
        <div 
          className="row no-gutters">
          <p className="listing-text">
            {listing.position_blurb}
          </p>
        </div>
      </div>
    ));
    return (
      <div id="careersPage" className="page">
        <Panel className="panel">
          <PanelTitle
            panelTitle={this.state.panelTitle} 
            titleId={"careersTitle"}
          />
          <PanelText
            textId={"careersText"} 
            colSpan={4} 
            panelText={this.state.panelText} 
          />
          <div className="row no-gutters justify-content-center">
            <div className="col-11 col-lg-8">
              <div className="row no-gutters justify-content-center">
                <img className="careers-hero" src={this.state.panelImage} alt=""/>
              </div>
              <div className="row no-gutters justify-content-lg-center mt-3">
                <div className="col-10 col-lg-4 mb-3 mb-lg-0 pr-2 pr-lg-4">
                  {jobListings}
                </div>
                <div className="col-10 col-lg-4 pr-2 pr-lg-4">
                  <div className="row no-gutters mb-3">
                    <p className="career-col-heading">
                      To apply, please email Jesse at:
                    </p>
                    <a className="careers-main-link" href="mailto:jessen@lwschneider.com">
                      jessen@lwschneider.com
                    </a>
                  </div>
                  <div className="row no-gutters">
                    <p className="career-col-text">
                      Experienced candidates for these positions start at
                      $13 up to $20 per hour, depending on skill level. We
                      provide excellent benefits, including medical, dental
                      and vision insurance, a matching 401K savings plan,
                      free golf course membership, immediate vacation
                      accrual, and the opportunity to earn additional paid
                      time off through perfect attendance.
                    </p>
                    <p className="career-col-text">
                      We’re also looking for college students for summer
                      work!
                    </p>
                  </div>
                </div>
                <div className="col-10 col-lg-4 pr-lg-4">
                  <div className="row no-gutters mb-2 mb-lg-3">
                    <p className="career-col-heading">
                      New to Manufacturing or CNC Machining?
                    </p>
                  </div>
                  <div className="row no-gutters">
                    <p className="career-col-text">
                      Through our partnership with Peoplelink, we recruit
                      individuals who are interested in a career path and
                      willing to learn. Please call Peoplelink directly at
                      <a className="phone" href="tel:+815-875-3835"> 815-915-8739</a>, visit them at 102 South Main Street,
                      Princeton, Illinois, or email <span className="career-email-span">
                        <a href="mailto:kclevenger@peoplelinkstaffing.com">
                          kclevenger@peoplelinkstaffing.com.
                        </a> 
                      </span> 
                    </p>
                  </div>
                  <div 
                    className="row no-gutters justify-content-baseline"
                  >
                    <img className="people-link-image" src={this.state.peopleImage} alt="people-link-image"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  windstop: state.windstop
});
export default connect(mapStateToProps)(CareersPage)