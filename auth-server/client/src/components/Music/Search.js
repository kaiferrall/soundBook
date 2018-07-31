import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { getProfile } from "../../actions/profileActions";
import { searchAlbums } from "../../actions/searchActions";
import PrivateRoute from "../Auth/PrivateRoute";

//Functions
import profileCompletion from "../../utilities/profileCompletion";
import { logoutUser } from "../../actions/authActions";

//Import components
import SearchResults from "./SearchResults";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      type: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onClick() {
    const search = {
      search: this.state.search
    };
    if (search.search) {
      this.props.searchAlbums(search);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.searches) {
      this.setState({ searches: nextProps.searches });
    }
  }
  render() {
    return (
      <div>
        <div className="row">
          <div id="search-banner" className="col-md-8 ">
            <h1 className="text-dark" id="search-title">
              Add to your library
            </h1>
            <p className="text-secondary" id="search-subtitle">
              Searches use Spotifys music library
            </p>

            <div className="input-group mb-3" id="search-music-form">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                name="search"
                value={this.state.search}
                onChange={this.onChange}
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
            <br />
            <div id="search-grey-line" className="bg-secondary">
              {" "}
            </div>
          </div>
          <div id="search-collage" className="col-md-4">
            <img id="search-albums" src="feedLoading.gif" />
          </div>
        </div>
        <div className="row">
          <div id="search-albums-results" className="col-md-8">
            <SearchResults results={this.props.results} />
          </div>
          <div className="col-md-4" />
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  searchAlbums: PropTypes.func.isRequired,
  results: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  results: state.searches
});

export default connect(
  mapStateToProps,
  { searchAlbums }
)(Search);
