import React, { Component } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Import components
import ThreadCreate from "./ThreadCreate";
import ThreadsItem from "./ThreadsItem";
import ThreadFeed from "./ThreadFeed";
//Import functions
import { getThread } from "../../actions/threadActions";
import { getThreads } from "../../actions/threadActions";
import { threadComment } from "../../actions/threadActions";

class Thread extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threadId: props.thread._id,
      text: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillMount() {
    const path = window.location.href.split("/")[4];
    const thread = path.replace("%20", " ");
    const name = {
      name: thread
    };
    this.props.getThread(name);
    this.props.getThreads();
  }
  onSubmit() {
    if (this.state.text) {
      const commentData = {
        thread: this.props.thread._id,
        text: this.state.text
      };
      this.props.threadComment(commentData);
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { thread } = this.props;
    const { threads } = this.props;
    let threadsList;
    let feed;

    if (threads.length > 0) {
      threadsList = threads.map(thread => (
        <ThreadsItem thread={thread} key={thread._id} />
      ));
    }
    let memberCount, commentCount, privateStatus;
    if (thread.private) {
      privateStatus = <i className="fas fa-lock fa-sm" />;
    } else {
      privateStatus = <i className="fas fa-lock-open fa-sm" />;
    }
    if (thread.members) {
      memberCount = thread.members.length;
    }
    if (thread.comments) {
      commentCount = thread.comments.length;
      const commentsCopy = thread.comments.slice().reverse();
      feed = commentsCopy.map(comment => (
        <ThreadFeed comment={comment} key={comment._id} />
      ));
    }

    return (
      <div className="row">
        <div className="col-md-3">
          <div className="threads-list-container">{threadsList}</div>
        </div>
        <div id="thread-comment-feed" className="col-md-6">
          <div id="thread-header" className="jumbotron">
            <div className="d-flex flex-row">
              <div id="thread-name-container" className="p-2">
                <h4>{thread.name}</h4>
              </div>
              <div id="private-status-container" className="p-2">
                {privateStatus}
              </div>
            </div>
            <small id="thread-header-count">
              {memberCount}
              {"    "}
              <i className="far fa-user" />
            </small>
            <small>
              {commentCount}
              {"    "}
              <i className="far fa-comment-alt" />
            </small>
            <br />
            <hr className="my-4" />
            <p id="thread-header-desc" className="lead">
              {thread.description}
            </p>
            <a href="#" className="badge badge-light">
              Add Members
            </a>
          </div>
          <div id="thread-content">{feed}</div>
          <div id="thread-comment-form">
            <form onSubmit={this.onSubmit}>
              <br />
              <textarea
                placeholder="Leave a comment"
                name="text"
                value={this.state.text}
                onChange={this.onChange}
                rows="3"
                id="thread-comment-input"
                type="text"
              />
              <button
                id="thread-post-button"
                type="submit"
                className="btn btn-outline-primary"
              >
                <i className="fas fa-paper-plane" />
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-3">
          <ThreadCreate />
        </div>
      </div>
    );
  }
}

Thread.propTypes = {
  getThread: PropTypes.func.isRequired,
  getThreads: PropTypes.func.isRequired,
  threadComment: PropTypes.func.isRequired,
  thread: PropTypes.object.isRequired,
  threads: PropTypes.array
};

const mapStateToProps = state => ({
  thread: state.threads.thread,
  threads: state.threads.threads
});
export default connect(
  mapStateToProps,
  { getThread, getThreads, threadComment }
)(Thread);
