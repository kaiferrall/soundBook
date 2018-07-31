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
//Check if the token has expired then get logged out
//Token expires in 2 hours, will be longer in the future

class SearchResults extends Component {
  render() {
    const { results } = this.props;

    const resultsDisplay = results.map(resultItem => (
      <ResultItem key={resultItem.id} results={resultItem} />
    ));
    return <div>{resultsDisplay}</div>;
  }
}

SearchResults.propTypes = {
  results: PropTypes.array.isRequired
};

export default SearchResults;
