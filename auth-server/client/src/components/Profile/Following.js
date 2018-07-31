import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider, connect } from "react-redux";
import PropTypes from "prop-types";

//Import components
import FollowingItem from "./FollowingItem";
//Functions
import { getFollowing } from "../../actions/profileActions";

class Following extends Component {
  componentDidMount() {
    this.props.getFollowing();
  }
  render() {
    const { following } = this.props;

    let followingList;
    if (following.length > 0) {
      followingList = following.map(following => (
        <ul key={following.user} className="list-group list-group-flush">
          <FollowingItem following={following} />
        </ul>
      ));
    } else {
      followingList = (
        <div id="followers-none-container">
          <i id="profile-followers-none" className="fas fa-search fa-4x" />
          <br />
          <br />
          <a href="/find">Find people</a>
        </div>
      );
    }
    return (
      <div
        className="modal fade"
        id="followingModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Following
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{followingList}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Following.propTypes = {
  following: PropTypes.array.isRequired,
  getFollowing: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  following: state.profile.following
});

export default connect(
  mapStateToProps,
  { getFollowing }
)(Following);
