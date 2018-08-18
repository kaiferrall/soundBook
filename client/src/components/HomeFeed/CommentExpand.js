import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
//Import components
import CommentItem from "./CommentItem";
//Functions
import { newComment } from "../../actions/postActions";

class CommentExpand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      postId: props.postId
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const commentData = {
      comment: this.state.comment,
      postId: this.state.postId
    };
    if (this.state.comment) {
      axios
        .post("http://localhost:5000/api/posts/comment", commentData)
        .then(res => {
          this.props.getComments();
          this.setState({ comment: "" });
        });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const dataToggle = this.props.postId;
    let commentList;
    if (this.props.comments) {
      commentList = this.props.comments
        .slice()
        .reverse()
        .map(comment => (
          <CommentItem
            avatarURL={this.props.avatarURL}
            date={this.props.date}
            username={this.props.username}
            key={comment._id}
            comment={comment}
          />
        ));
    }
    return (
      <div className="collapse" id={dataToggle}>
        <div id="comment-card-body" className="card card-body">
          <ul className="list-group list-group-flush">{commentList}</ul>
          <div id="comment-form-background" className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Leave a comment"
              name="comment"
              onChange={this.onChange}
              value={this.state.comment}
            />
            <div className="input-group-append">
              <button
                onClick={this.onClick}
                type="submit"
                className="btn btn-outline-secondary"
                type="button"
              >
                <i className="fas fa-paper-plane" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CommentExpand.propTypes = {
  comments: PropTypes.object.isRequired,
  postText: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  avatarURL: PropTypes.string.isRequired,
  newComment: PropTypes.func.isRequired,
  getComments: PropTypes.func.isRequired
};

export default connect(
  null,
  { newComment }
)(CommentExpand);
