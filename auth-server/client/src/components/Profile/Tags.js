import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import PropTypes from "prop-types";

//Import components

class Tags extends Component {
  render() {
    const paddingStyle = {
      padding: "0 4px"
    };
    return (
      <a
        href="#"
        key={this.props.tag}
        id="profile-tags-items"
        className="card-link btn btn-light"
        style={paddingStyle}
      >
        {this.props.tag}
      </a>
    );
  }
}

Tags.propTypes = {
  tag: PropTypes.string.isRequired
};

export default Tags;
