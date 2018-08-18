import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider, connect } from "react-redux";
import PropTypes from "prop-types";

//Import components
import FollowingItem from "./FollowingItem";
//Functions
import { viewFollowing } from "../../actions/viewActions";

class Following extends Component {
  componentWillMount() {
    const userId = {
      userId: this.props.userId
    };
    this.props.viewFollowing(userId);
  }
  render() {
    const { following } = this.props;
    console.log(following);
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
          <p>Not following anyone</p>
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
  userId: PropTypes.string.isRequired,
  viewFollowing: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  userId: state.viewProfile.profile.user,
  following: state.viewProfile.following
});

export default connect(
  mapStateToProps,
  { viewFollowing }
)(Following);
