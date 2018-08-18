import React, { Component } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Import components
import ThreadCreate from "./ThreadCreate";
import ThreadsItem from "./ThreadsItem";
//Import functions

class ThreadFeed extends Component {
  render() {
    const { comment } = this.props;
    return (
      <div id="thread-feed-item">
        <h6 className="text text-muted">{comment.username}</h6>
        <p>{comment.text}</p>
        <small id="thread-feed-date" className="text text-muted">
          {comment.date}
        </small>
      </div>
    );
  }
}

ThreadFeed.propTypes = {
  comment: PropTypes.object.isRequired
};

export default ThreadFeed;
