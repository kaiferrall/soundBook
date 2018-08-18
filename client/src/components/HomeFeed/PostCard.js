import React, { Component, PureComponent } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
//Import components  - {post form, threads list, notifications}
import Tags from "../Profile/Tags";
import CommentExpand from "./CommentExpand";

//Import functions
import { checkExpiration } from "../../actions/authActions";
import { addLike } from "../../actions/postActions";
import { getAllPosts } from "../../actions/postActions";
import likeStatus from "../../utilities/likeStatus";

class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      postId: props.post._id,
      likes: {
        amount: props.post.likes.length,
        status: false
      }
    };
    this.onClick = this.onClick.bind(this);
    this.getComments = this.getComments.bind(this);
    this.viewProfile = this.viewProfile.bind(this);
  }

  viewProfile() {
    if (this.props.user.username === this.props.post.username) {
      window.location.href = "/profile";
    } else {
      window.location.href = `/view/${this.props.post.username}`;
    }
  }
  onClick() {
    if (!likeStatus(this.props.post.likes, this.props.user.id)) {
      const postData = {
        postId: this.state.postId
      };
      this.props.addLike(postData);
      this.setState({
        likes: { amount: this.props.post.likes.length + 1, status: true }
      });
    }
  }
  getComments() {
    const post = {
      postId: this.state.postId
    };

    axios
      .post("http://localhost:5000/api/posts/comments", post)
      .then(res => {
        this.setState({ comments: res.data });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { post } = this.props;
    const user = this.props.user;
    const dataToggle = "#" + post._id;
    let lineStyle = {};
    let height;
    let commentAmount = null;
    let avatarURL;
    let buttonStyle = {
      color: "#5e92e5"
    };
    if (post.comments.length > 0) {
      commentAmount = post.comments.length;
    }
    if (post.avatar) {
      avatarURL = `http://localhost:5000/avatars/${post.avatar}`;
    }
    if (likeStatus(post.likes, user.id) || this.state.likes.status) {
      buttonStyle = {
        color: "#4C9F70"
      };
    }
    if (post.text.length < 50) {
      const height = 20 / post.text.length;
      lineStyle = {
        height: height + "px"
      };
    }
    let tags;
    if (post.tags) {
      tags = post.tags.map(tag => <Tags key={tag} tag={tag} />);
    }
    return (
      <div className="row">
        <div className="col-md-12">
          <div style={lineStyle ? lineStyle : null} className="post-grey-line">
            {" "}
          </div>
          <div id="post-card" className="card">
            <div className="card-body">
              <h6
                id="post-card-username"
                onClick={this.viewProfile}
                className="card-title"
              >
                {" "}
                <img id="navbar-image" src={avatarURL} alt="" />
                {"   "}
                {post.username}
              </h6>
              <h6 className="card-subtitle mb-2 text-muted">{post.title}</h6>
              <p id="post-card-text" className="card-text">
                {post.text}
              </p>
              {tags ? tags : null}
              <small id="post-date" className="form-text text-muted">
                {post.date}
              </small>
              <br />
              <a
                onClick={this.onClick}
                href="javascript:void(0)"
                id="post-like-amount"
                className="card-link"
                style={buttonStyle}
              >
                {this.state.likes.amount > 0 ? this.state.likes.amount : null}
                <i id="post-like-icon" className="fas fa-arrow-up fa-sm" />
              </a>
              <a
                onClick={this.getComments}
                data-toggle="collapse"
                href={dataToggle}
                role="button"
                id="post-comment-icon"
                aria-expanded="false"
                aria-controls={dataToggle}
                className="card-link"
              >
                {commentAmount > 0 ? commentAmount : null}
                <i
                  id="post-comment-icon-i"
                  data-toggle="modal"
                  className="far fa-comment-alt"
                />
              </a>
              <CommentExpand
                getComments={this.getComments}
                avatarURL={avatarURL ? avatarURL : null}
                username={post.username}
                postId={post._id}
                comments={
                  this.state.comments.length > 0 ? this.state.comments : null
                }
              />
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  getAllPosts: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { addLike, getAllPosts }
)(PostCard);
