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

class ResultItem extends Component {
  render() {
    const { results } = this.props;
    return (
      <div>
        <div id="search-albums-card" className="card bg-light">
          <img
            id="albums-search-img"
            className="card-img-top"
            src={results.cover}
          />
          <div id="search-albums-body" className="card-body">
            <p className="card-text">
              {results.name}
              <a
                href="#"
                id="albums-add-button"
                className="badge badge-primary"
              >
                Add
              </a>
            </p>
            <p id="search-albums-artist">{results.artist}</p>
            <small>{results.release_date}</small>
          </div>
        </div>
        <div id="search-albums-grey"> </div>
      </div>
    );
  }
}

ResultItem.propTypes = {
  results: PropTypes.object.isRequired
};

export default ResultItem;
