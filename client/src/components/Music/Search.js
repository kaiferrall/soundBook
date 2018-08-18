import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { getProfile } from "../../actions/profileActions";
import { searchAlbums } from "../../actions/searchActions";
import PrivateRoute from "../Auth/PrivateRoute";
import store from "../../store";
//Functions
import profileCompletion from "../../utilities/profileCompletion";
import { logoutUser } from "../../actions/authActions";
import { clearSearch } from "../../actions/searchActions";

//Import components
import SearchResults from "./SearchResults";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      type: "albums",
      search: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.type = this.type.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onClick() {
    const search = {
      search: this.state.search,
      type: this.state.type
    };

    this.props.searchAlbums(search);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.searches) {
      this.setState({ searches: nextProps.searches });
    }
  }

  componentWillUnmount() {
    store.dispatch(clearSearch());
  }

  type(e) {
    this.setState({ type: e.target.value });
  }
  render() {
    return (
      <div>
        <div id="music-search-row" className="row">
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
            <select
              onChange={this.type}
              id="type-select"
              className="custom-select custom-select-sm"
            >
              <option selected value="albums">
                Albums
              </option>
              <option value="artists">Artists</option>
              <option value="songs">Songs</option>
            </select>

            <br />
            <div id="search-grey-line" className="bg-secondary">
              {" "}
            </div>
          </div>
          <div id="search-collage" className="col-md-4" />
        </div>
        <div className="row">
          <div id="search-albums-results" className="col-md-8">
            <SearchResults
              type={this.props.type}
              results={this.props.results}
            />
          </div>
          <div className="col-md-4" />
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  searchAlbums: PropTypes.func.isRequired,
  results: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  results: state.searches.results,
  type: state.searches.type
});

export default connect(
  mapStateToProps,
  { searchAlbums }
)(Search);
