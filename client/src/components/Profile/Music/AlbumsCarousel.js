import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import store from "../../../store";
//Functions
import { getProfileAlbums } from "../../../actions/musicActions";
import { getProfilePosts, clearPosts } from "../../../actions/postActions";
import { clearMusic } from "../../../actions/musicActions";
//Import components

class AlbumsCarousel extends Component {
  componentWillMount() {
    this.props.getProfileAlbums(this.props.profileId);
    this.props.getProfilePosts(this.props.user.id);
  }
  componentWillUnmount() {
    store.dispatch(clearMusic());
    store.dispatch(clearPosts());
  }
  render() {
    const { albums } = this.props;
    let aLbumsCarouselItems;
    if (albums) {
      aLbumsCarouselItems = albums.map((album, index) => {
        return (
          <li id="albums-list" className="list-group-item">
            <div className="row">
              <div className="col-md-6">
                <img
                  id="profile-album-img"
                  className="rounded"
                  src={album.cover}
                />
              </div>
              <div className="col-md-6">
                <h5 id="profile-album-name">
                  {album.name}{" "}
                  <a
                    href="#"
                    id="profile-albums-del"
                    className="badge badge-light"
                  >
                    remove
                  </a>
                </h5>
                <p id="profile-album-artist">{album.artist}</p>
                <small id="profile-album-release">{album.date}</small>
              </div>
            </div>
          </li>
        );
      });
    }

    return (
      <div>
        <ul className="list-group list-group-flush">{aLbumsCarouselItems}</ul>
      </div>
    );
  }
}

AlbumsCarousel.propTypes = {
  user: PropTypes.object,
  getProfileAlbums: PropTypes.func.isRequired,
  getProfilePosts: PropTypes.func.isRequired,
  profileId: PropTypes.string.isRequired,
  albums: PropTypes.array
};

const mapStateToProps = state => ({
  user: state.auth.user,
  profileId: state.profile.profile._id,
  albums: state.music.albums
});

export default connect(
  mapStateToProps,
  { getProfileAlbums, getProfilePosts }
)(AlbumsCarousel);
