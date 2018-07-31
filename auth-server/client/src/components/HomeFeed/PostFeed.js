import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import store from "../../store";
//Import components  - {post form, threads list, notifications}
import PostForm from "./PostForm";
import PostCard from "./PostCard";
import FeedLoading from "../FeedLoading";
//Import functions
import { getAllPosts } from "../../actions/postActions";
import { getProfile } from "../../actions/profileActions";
import { clearPosts } from "../../actions/postActions";
import { checkExpiration } from "../../actions/authActions";

class PostFeed extends Component {
  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    this.props.checkExpiration();
    this.props.getAllPosts();
  }
  componentDidMount() {
    this.props.getProfile();
  }

  onClick() {
    this.props.getAllPosts();
  }
  componentWillUnmount() {
    store.dispatch(clearPosts());
  }
  render() {
    const user = this.props.user;
    const { profile } = this.props.profile;
    const { errors } = this.props;
    let feed;
    let profileState;
    if (this.props.loading) {
      if (errors.posts) {
        profileState = (
          <div id="feed-no-posts">
            <a href="/profile">Click here to get started</a>
          </div>
        );
      }
      feed = (
        <div>
          <FeedLoading />
        </div>
      );
    } else {
      const { posts } = this.props;

      feed = posts.map(post => <PostCard key={post._id} post={post} />);
    }

    return (
      <div>
        <div id="posts-load">
          <a onClick={this.onClick} href="#">
            <i id="posts-load-icon" className="fas fa-sync-alt fa-lg" />
            {"  "}reload
          </a>
        </div>
        <br />
        {feed}
        {profileState}
        {this.props.loading ? null : <a href="#">Load more</a>}
      </div>
    );
  }
}

PostFeed.propTypes = {
  checkExpiration: PropTypes.func.isRequired,
  getAllPosts: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  errors: PropTypes.object,
  posts: PropTypes.array,
  loading: PropTypes.bool,
  profile: PropTypes.object,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  errors: state.errors,
  posts: state.posts.posts,
  profile: state.profile,
  loading: state.posts.loading,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { checkExpiration, getAllPosts, getProfile }
)(PostFeed);
