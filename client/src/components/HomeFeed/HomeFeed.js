import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//Import components  - {post form, threads list, notifications}
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import Threads from "./Threads";
import ThreadsItem from "../Threads/ThreadsItem";
import HomeFindProfiles from "./Find/HomeFindProfiles";

//Import functions
import { checkExpiration } from "../../actions/authActions";
import { getProfile } from "../../actions/profileActions";
import { getThreads } from "../../actions/threadActions";

class HomeFeed extends Component {
  componentWillMount() {
    this.props.checkExpiration();
    this.props.getThreads();
  }
  render() {
    const { profile } = this.props.profile;
    const { threads } = this.props;
    let promptOrFind;
    let promptThreads;
    let threadsList;

    const profilePrompt2 = (
      <div id="home-profile-prompt2">
        <i id="home-profile-prompt-icon" className="fas fa-user-circle fa-2x" />
        <br />
        <a href="/profile">Setup your profile here</a>
      </div>
    );
    if (!profile && !this.props.profile.loading) {
      promptOrFind = profilePrompt2;
    } else {
      promptOrFind = <HomeFindProfiles />;
    }
    if (profile && threads.length === 0) {
      promptThreads = (
        <div className="text text-center">
          <a href="/threads">Create or join threads here</a>
        </div>
      );
    }

    if (threads.length > 0) {
      const lastIndex = threads.length - 1;
      threadsList = threads.map(thread => (
        <ThreadsItem lastIndex={lastIndex} thread={thread} key={thread._id} />
      ));
    }
    return (
      <div className="row">
        <div id="test-1" className="col-md-3">
          <div className="threads-list-container">
            <div id="thread-branch-icon">
              <i className="fas fa-code-branch fa-2x" />
            </div>
            {threadsList}
          </div>
          {promptThreads}
        </div>
        <div id="test-2" className="col-md-6">
          <PostForm />
        </div>
        <div id="test-3" className="col-md-3">
          {promptOrFind}
        </div>
      </div>
    );
  }
}

HomeFeed.propTypes = {
  checkExpiration: PropTypes.func.isRequired,
  getThreads: PropTypes.func.isRequired,
  profile: PropTypes.object,
  threads: PropTypes.array
};

const mapStateToProps = state => ({
  profile: state.profile,
  threads: state.threads.threads
});
export default connect(
  mapStateToProps,
  { checkExpiration, getThreads }
)(HomeFeed);
