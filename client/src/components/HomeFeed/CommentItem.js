import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//Import components
//Functions

class CommentItem extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (this.props.comment.username === this.props.user.username) {
      window.location.href = "/profile";
    } else {
      window.location.href = `/view/${this.props.comment.username}`;
    }
  }
  render() {
    let avatarURL;
    if (this.props.comment.avatar) {
      avatarURL = `http://localhost:5000/avatars/${this.props.comment.avatar}`;
    }
    return (
      <div id="comment-item">
        <li className="list-group-item">
          <div className="d-flex flex-row">
            <div className="p-2">
              {" "}
              <img onClick={this.onClick} id="navbar-image" src={avatarURL} />
            </div>
            <div className="p-2">
              {" "}
              <p onClick={this.onClick} id="comment-username">
                {this.props.comment.username}
              </p>
            </div>
          </div>
          <p id="comment-text">{this.props.comment.text}</p>
        </li>
      </div>
    );
  }
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(CommentItem);
