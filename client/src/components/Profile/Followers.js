import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//Import components
import FollowerItem from "./FollowerItem";
//Functions
import { getFollowers } from "../../actions/profileActions";

class Followers extends Component {
  componentDidMount() {
    this.props.getFollowers();
  }
  render() {
    const { followers } = this.props;

    let followersList;
    if (followers.length > 0) {
      followersList = followers.map(follower => (
        <ul key={follower.user} className="list-group list-group-flush">
          <FollowerItem follower={follower} />
        </ul>
      ));
    } else {
      followersList = (
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
        id="followersModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Followers
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
            <div className="modal-body">{followersList}</div>
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
Followers.propTypes = {
  followers: PropTypes.array.isRequired,
  getFollowers: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  followers: state.profile.followers
});

export default connect(
  mapStateToProps,
  { getFollowers }
)(Followers);
