import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import store from "../../../store";
//Functions
import { getProfilePosts, clearPosts } from "../../../actions/postActions";
import { clearViewMusic } from "../../../actions/viewActions";
import { getViewAlbums } from "../../../actions/viewActions";
//Import components

class AlbumsCarousel extends Component {
  constructor() {
    super();
  }
  componentWillMount() {
    this.props.getViewAlbums(this.props.profileId);
  }
  componentWillUnmount() {
    store.dispatch(clearViewMusic());
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
                    {" "}
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
  getViewAlbums: PropTypes.func.isRequired,
  profileId: PropTypes.string.isRequired,
  albums: PropTypes.array
};

const mapStateToProps = state => ({
  profileId: state.viewProfile.profile._id,
  albums: state.viewProfile.albums
});

export default connect(
  mapStateToProps,
  { getViewAlbums, clearViewMusic }
)(AlbumsCarousel);
