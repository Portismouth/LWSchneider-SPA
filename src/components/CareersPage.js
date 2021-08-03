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
    peopleImage: '',
    careerHeader: '',
    careerEmail: '',
    careerEmailHref: '',
    paraOne: '',
    paraTwo: ''
  }
  componentDidMount() {
    fetch('/wp-json/wp/v2/pages/292')
      .then(res => res.json())
      .then(
        result => {
          console.log(result)
          this.setState({
            panelTitle: result.acf.panel_title,
            panelText: result.acf.panel_text,
            panelImage: result.acf.panel_image,
            jobListings: result.acf.open_positions,
            peopleImage: result.acf.people_link_image,
            careerHeader: result.acf.career_contact_header,
            careerEmail: result.acf.career_contact_email,
            careerEmailHref: "mailto:" + result.acf.career_contact_email,
            paraOne: result.acf.paragraph_one,
            paraTwo: result.acf.paragraph_two,
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
        <Panel className="panel careers-panel">
          <PanelTitle
            colSpan={6}
            panelTitle={this.state.panelTitle}
            titleId={"careersTitle"}
          />
          <PanelText
            textId={"careersText"}
            colSpan={6}
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
                      {this.state.careerHeader}
                    </p>
                    <a className="careers-main-link" href={this.state.careerEmailHref}>
                      {this.state.careerEmail}
                    </a>
                  </div>
                  <div className="row no-gutters">
                    <p className="career-col-text">
                      {this.state.paraOne}
                    </p>
                    <p className="career-col-text">
                      {this.state.paraTwo}
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
                      <a className="phone" href="tel:+815-875-3835"> 815-915-8739</a> or email <span className="career-email-span">
                        <a href="mailto:kclevenger@peoplelinkstaffing.com">
                          Princeton@peoplelinkstaffing.com.
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
