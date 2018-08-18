import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import store from "../../store";
//Import functions
import { getProfiles } from "../../actions/profileActions";
import { clearPosts } from "../../actions/postActions";
import { getProfile } from "../../actions/profileActions";
import { clearProfileSearch } from "../../actions/profileActions";

//Import components
import FindItems from "./FindItems";
class FeedLoading extends Component {
  constructor() {
    super();
    this.state = {
      search: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onClick2 = this.onClick2.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    if (this.state.search) {
      const searchData = {
        search: this.state.search
      };
      this.props.getProfiles(searchData);
    }
  }
  onClick2() {
    store.dispatch(clearProfileSearch());
    this.setState({ search: "" });
  }
  componentWillMount() {
    this.props.getProfile();
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillUnmount() {
    store.dispatch(clearPosts());
    store.dispatch(clearProfileSearch());
  }
  render() {
    const { profiles } = this.props;
    const clearSearch = (
      <a
        id="find-clear-search"
        onClick={this.onClick2}
        href="javascript:void(0)"
      >
        Clear
      </a>
    );
    let searchResults;
    if (profiles) {
      searchResults = profiles.map((profile, index) => {
        return (
          <div id="find-results" key={profile.user} className="card-group">
            <FindItems index={index} profile={profile} />
          </div>
        );
      });
    }
    return (
      <div>
        <div className="row">
          <div className="col-md-1" id="find-left" />
          <div id="find-middle-col" className="col-md-6">
            <div id="find-search-card">
              <h2 id="find-title">Search for people by their username</h2>
              <div className="input-group mb-3" id="profile-search-form">
                <input
                  type="text"
                  onChange={this.onChange}
                  id="find-profiles-input"
                  className="form-control"
                  placeholder="Username..."
                  value={this.state.search}
                  name="search"
                />
                <div className="input-group-append">
                  <button
                    onClick={this.onClick}
                    className="btn btn-outline-secondary"
                    type="button"
                  >
                    <i className="fas fa-search" />
                  </button>
                </div>
              </div>
              <div className="find-grey-line"> </div>
            </div>
          </div>
          <div className="col-md-5" />
        </div>
        <div className="row">
          <div className="col-md-1" />
          <div className="col-md-6">
            {profiles.length > 0 ? clearSearch : null}
            {searchResults}
          </div>
          <div className="col-md-5" />
        </div>
      </div>
    );
  }
}

FeedLoading.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  clearPosts: PropTypes.func.isRequired,
  profile: PropTypes.object,
  profiles: PropTypes.array
};

const mapStateToProps = state => ({
  profiles: state.find,
  profile: state.profile.profile
});
export default connect(
  mapStateToProps,
  { getProfiles, clearPosts, getProfile }
)(FeedLoading);
