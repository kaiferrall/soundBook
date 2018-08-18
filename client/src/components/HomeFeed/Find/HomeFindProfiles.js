import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import store from "../../../store";
//Import functions
import { getProfiles } from "../../../actions/profileActions";
import { getProfile } from "../../../actions/profileActions";
import { clearProfileSearch } from "../../../actions/profileActions";
//Import components
import HomeFindItems from "./HomeFindItems";
class HomeFindProfiles extends Component {
  constructor() {
    super();
    this.state = {
      search: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.search) {
      const searchData = {
        search: this.state.search
      };
      this.props.getProfiles(searchData);
    }
  }
  onClick() {
    store.dispatch(clearProfileSearch());
    this.setState({ search: "" });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { profiles } = this.props;
    const clearSearch = (
      <a id="home-find-clear" onClick={this.onClick} href="javascript:void(0)">
        Clear
      </a>
    );
    let searchResults;
    if (profiles) {
      searchResults = profiles.map((profile, index) => {
        return (
          <ul
            id="home-find-result"
            key={profile.id}
            className="list-group list-group-flush"
          >
            <HomeFindItems kye={profile.id} index={index} profile={profile} />
          </ul>
        );
      });
    }

    return (
      <div>
        <h4 id="home-find-title">Find people</h4>
        <div id="home-find-card" className="card">
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  onChange={this.onChange}
                  id="home-find-input"
                  className="form-control"
                  placeholder="Search for people by username"
                  value={this.state.search}
                  name="search"
                />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="submit">
                    <i className="fas fa-search" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        {profiles.length > 0 ? clearSearch : null}
        <br />
        {searchResults}
        <br />
        <div id="home-find-grey"> </div>
      </div>
    );
  }
}

HomeFindProfiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.string,
  profiles: PropTypes.array
};

const mapStateToProps = state => ({
  profiles: state.find,
  profile: state.profile.profile
});
export default connect(
  mapStateToProps,
  { getProfiles }
)(HomeFindProfiles);
