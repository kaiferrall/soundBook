import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import store from "../../../store";
//Functions
import { getProfileArtists } from "../../../actions/musicActions";
import { getProfilePosts, clearPosts } from "../../../actions/postActions";
import { clearMusic } from "../../../actions/musicActions";
//Import components

class ArtistsCarousel extends Component {
  componentWillMount() {
    this.props.getProfileArtists(this.props.profileId);
  }
  componentWillUnmount() {
    store.dispatch(clearMusic());
    store.dispatch(clearPosts());
  }
  render() {
    const { artists } = this.props;
    let artistsCarouselItems;
    if (artists) {
      artistsCarouselItems = artists.map((artist, index) => {
        return (
          <li id="albums-list" className="list-group-item">
            <div className="row">
              <div className="col-md-6">
                <img
                  id="profile-album-img"
                  className="rounded"
                  src={artist.cover}
                />
              </div>
              <div className="col-md-6">
                <h5 id="profile-album-name">
                  {artist.name}{" "}
                  <a
                    href="#"
                    id="profile-albums-del"
                    className="badge badge-light"
                  >
                    remove
                  </a>
                </h5>
                <p id="profile-album-artist">{artist.genre}</p>
                <small id="profile-album-release">
                  Spotify popularity: {artist.popularity}
                </small>
              </div>
            </div>
          </li>
        );
      });
    }

    return (
      <div>
        <ul className="list-group list-group-flush">{artistsCarouselItems}</ul>
      </div>
    );
  }
}

ArtistsCarousel.propTypes = {
  user: PropTypes.object,
  getProfileArtists: PropTypes.func.isRequired,
  profileId: PropTypes.string.isRequired,
  artists: PropTypes.array
};

const mapStateToProps = state => ({
  user: state.auth.user,
  profileId: state.profile.profile._id,
  artists: state.music.artists
});

export default connect(
  mapStateToProps,
  { getProfileArtists }
)(ArtistsCarousel);
