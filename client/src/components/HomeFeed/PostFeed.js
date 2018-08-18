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
import { getAllPosts, feedIsLoading } from "../../actions/postActions";
import { getProfile } from "../../actions/profileActions";
import { clearPosts } from "../../actions/postActions";
import { clearErrors } from "../../actions/authActions";
import { checkExpiration } from "../../actions/authActions";
class PostFeed extends Component {
  constructor() {
    super();
    this.state = {
      min: 0,
      max: 10
    };
  }

  componentWillMount() {
    this.props.checkExpiration();
    this.props.getAllPosts(this.state);
    this.props.getProfile();
  }
  scrollTrack = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !this.props.loading
    ) {
      this.setState({ min: this.state.max, max: this.state.max + 5 }, () => {
        this.props.getAllPosts(this.state);
      });
    }
  };
  componentDidMount() {
    window.addEventListener("scroll", this.scrollTrack, false);
  }
  componentWillReceiveProps(newProps) {
    if (newProps.errors.noMorePosts) {
      this.setState({ min: 0, max: 10 });
    }
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollTrack, false);
    store.dispatch(clearPosts());
    store.dispatch(clearErrors());
  }

  render() {
    const user = this.props.user;
    const { profile } = this.props.profile;
    const { errors } = this.props;
    let feed;
    let loading;
    const { posts } = this.props;

    if (errors.noPosts) {
      feed = (
        <div id="home-find-more-people">
          <a href="/find">Find More People</a>
        </div>
      );
    } else {
      feed = posts.map(post => <PostCard key={post._id} post={post} />);
    }
    if (this.props.loading && !errors.noPosts) {
      loading = <FeedLoading />;
    }
    if (errors.noMorePosts) {
      loading = (
        <div className="text text-center">
          <i className="fas fa-ellipsis-h" />
        </div>
      );
    }

    return (
      <div>
        <div id="post-feed-container">
          <br />
          {feed}
          {loading}
        </div>
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
