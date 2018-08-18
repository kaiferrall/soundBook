import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//Import components  - {post form, threads list, notifications}
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";

//Import functions
import { checkExpiration } from "../../actions/authActions";

class Threads extends Component {
  render() {
    return (
      <div className="threads-container">
        <h2 id="threads-title">
          <i id="threads-logo" className="fas fa-code-branch" />
        </h2>
        <div className="list-group">
          <a
            href="#"
            className="list-group-item list-group-item-action flex-column align-items-start "
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">List group item heading</h5>
              <small>3 days ago</small>
            </div>
            <p className="mb-1">
              Donec id elit non mi porta gravida at eget metus. Maecenas sed
              diam eget risus varius blandit.
            </p>
            <small>Donec id elit non mi porta.</small>
          </a>
          <a
            href="#"
            className="list-group-item list-group-item-action flex-column align-items-start"
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">List group item heading</h5>
              <small className="text-muted">3 days ago</small>
            </div>
            <p className="mb-1">
              Donec id elit non mi porta gravida at eget metus. Maecenas sed
              diam eget risus varius blandit.
            </p>
            <small className="text-muted">Donec id elit non mi porta.</small>
          </a>
          <a
            href="#"
            className="list-group-item list-group-item-action flex-column align-items-start"
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">List group item heading</h5>
              <small className="text-muted">3 days ago</small>
            </div>
            <p className="mb-1">
              Donec id elit non mi porta gravida at eget metus. Maecenas sed
              diam eget risus varius blandit.
            </p>
            <small className="text-muted">Donec id elit non mi porta.</small>
          </a>
        </div>
      </div>
    );
  }
}

export default connect()(Threads);
