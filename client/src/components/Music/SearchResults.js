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
import { logoutUser } from "../../actions/authActions";

//Import components
import ResultItem from "./ResultItem";
import ResultItemArtists from "./ResultItemArtists";
import ResultItemSongs from "./ResultItemSongs";

class SearchResults extends Component {
  render() {
    let resultsDisplay;
    const { results } = this.props;
    const { type } = this.props;
    console.log(type);
    if (type === "albums") {
      console.log(type);
      resultsDisplay = results.map(resultItem => (
        <ResultItem key={resultItem.id} results={resultItem} />
      ));
    } else if (type === "artists") {
      resultsDisplay = results.map(resultItem => (
        <ResultItemArtists key={resultItem.id} results={resultItem} />
      ));
    }
    return <div>{resultsDisplay}</div>;
  }
}

SearchResults.propTypes = {
  results: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired
};

export default SearchResults;
