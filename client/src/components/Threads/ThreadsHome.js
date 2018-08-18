import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import store from "../../store";

//Functions
import { getThreads } from "../../actions/threadActions";
import { checkExpiration } from "../../actions/authActions";

//components
import ThreadCreate from "./ThreadCreate";
import ThreadsItem from "./ThreadsItem";

class ThreadsHome extends Component {
  componentWillMount() {
    this.props.checkExpiration();
    this.props.getThreads();
  }
  render() {
    const { threads } = this.props;
    let threadsList;
    if (threads.length > 0) {
      const lastIndex = threads.length - 1;
      threadsList = threads.map(thread => (
        <ThreadsItem lastIndex={lastIndex} thread={thread} key={thread._id} />
      ));
    }
    return (
      <div className="row">
        <div className="col-md-4">
          <h1>Your Threads</h1>
          <br />
          {threadsList}
        </div>
        <div className="col-md-4">
          <h1>Suggested Threads?</h1>
        </div>
        <div className="col-md-4">
          <ThreadCreate />
        </div>
      </div>
    );
  }
}

ThreadsHome.propTypes = {
  checkExpiration: PropTypes.func.isRequired,
  getThreads: PropTypes.func.isRequired,
  threads: PropTypes.array
};

const mapStateToProps = state => ({
  threads: state.threads.threads
});

export default connect(
  mapStateToProps,
  { checkExpiration, getThreads }
)(ThreadsHome);
