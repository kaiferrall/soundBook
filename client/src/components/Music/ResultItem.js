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
import { addAlbum } from "../../actions/musicActions";

class ResultItem extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    const { results } = this.props;
    const album = {
      albumId: results.id,
      name: results.name,
      cover: results.cover,
      artist: results.artist,
      date: results.release_date
    };
    this.props.addAlbum(album);
  }
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
                onClick={this.onClick}
                href="javascript:void(0)"
                id="albums-add-button"
                className="badge badge-primary"
              >
                <i className="fas fa-plus" />
                {"    "}Add
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
  results: PropTypes.object.isRequired,
  addAlbum: PropTypes.func.isRequired
};

export default connect(
  null,
  { addAlbum }
)(ResultItem);
