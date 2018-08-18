import React, { Component } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Import components
import ThreadCreate from "./ThreadCreate";
//Import functions

class ThreadsItem extends Component {
  truncate = str => {
    if (str.length > 100) {
      return str.substring(0, 100);
    } else {
      return str;
    }
  };
  render() {
    const { thread } = this.props;
    const { lastIndex } = this.props;
    const threadLink = "/thread/" + thread.name;
    let comment;
    if (thread.comments.length > 0) {
      comment = this.truncate(thread.comments[0].text);
    }
    return (
      <div>
        <div id="threads-list-card" className="list-group">
          <a
            id="threads-list-a"
            href={threadLink}
            className="list-group-item list-group-item-action flex-column align-items-start"
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{thread.name}</h5>
              <small id="threads-list-date">
                {thread.comments.length > 0 ? thread.comments[0].date : ""}
              </small>
            </div>
            <p className="mb-1">
              {comment ? comment + " ..." : "No comments yet"}
            </p>
            <small>
              {" "}
              - {thread.comments.length > 0 ? thread.comments[0].username : ""}
            </small>
          </a>
        </div>
      </div>
    );
  }
}

ThreadsItem.propTypes = {
  thread: PropTypes.object.isRequired,
  lastIndex: PropTypes.number
};

export default ThreadsItem;
