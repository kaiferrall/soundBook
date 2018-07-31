import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//Import components  - {post form, threads list, notifications}
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import Threads from "./Threads";

//Import functions
import { checkExpiration } from "../../actions/authActions";

class HomeFeed extends Component {
  componentWillMount() {
    this.props.checkExpiration();
  }
  render() {
    return (
      <div className="row">
        <div id="test-1" className="col-md-3">
          <Threads />
        </div>
        <div id="test-2" className="col-md-6">
          <PostForm />
          <PostFeed />
        </div>
        <div id="test-3" className="col-md-3" />
      </div>
    );
  }
}

HomeFeed.propTypes = {
  checkExpiration: PropTypes.func.isRequired
};

export default connect(
  null,
  { checkExpiration }
)(HomeFeed);
