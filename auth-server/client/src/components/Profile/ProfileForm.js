import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import { Provider } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profileActions";
import { getProfile } from "../../actions/profileActions";

//Import components

class ProfileForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      bio: "",
      tags: "",
      profileImage: "",
      twitter: "",
      facebook: "",
      instagram: "",
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const newProfile = {
      name: this.state.name,
      bio: this.state.bio,
      tags: this.state.tags,
      profileImage: this.state.profileImage,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      instagram: this.state.instagram
    };
    this.props.createProfile(newProfile);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;
    const tags = (
      <div id="profileForm-tags" className="card">
        <div className="card-header">
          <i id="profile-check-info" className="fas fa-check-circle" /> Tags
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Tags quickly describe your interests
          </li>
          <li className="list-group-item">
            Tags will help you find people with similar interests
          </li>
        </ul>
      </div>
    );
    const bio = (
      <div id="profileForm-bio" className="card">
        <div className="card-header">
          <i id="profile-check-info" className="fas fa-check-circle" /> Bio
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Your bio will be seen by people, use it to give a quick description
            of yourself
          </li>
        </ul>
      </div>
    );
    return (
      <div>
        <div className="row" id="register-row">
          <div className="col-md-1" />
          <div id="register-col" className="col-md-6">
            <form id="profile-form" onSubmit={this.onSubmit}>
              <h3>
                Hey {this.props.user.username}, create a profile to get started
              </h3>
              <div className="register-grey-line"> </div>
              <div id="profile-top" className="form-group">
                <label>*Name</label>
                <input
                  type="text"
                  className={classnames("form-control", {
                    "is-invalid": errors.name
                  })}
                  id="exampleInputEmail1"
                  placeholder="Enter Your Full Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
                <div className="invalid-feedback">{errors.name}</div>
              </div>
              <div className="form-group">
                <label>*Bio</label>
                <textarea
                  rows="3"
                  cols="10"
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  className={classnames("form-control", {
                    "is-invalid": errors.bio
                  })}
                  placeholder="Enter a quick bio about yourself"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                />
                <div className="invalid-feedback">{errors.bio}</div>
              </div>
              <div className="form-group">
                <label>Tags</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Eg. music, rap, jazz, rock, soul"
                  name="tags"
                  value={this.state.tags}
                  onChange={this.onChange}
                />
                <small className="form-text text-muted">
                  Seperate each tag with a comma
                </small>
              </div>

              <br />
              <div className="form-group">
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fab fa-twitter fa-lg" />
                    </div>
                  </div>
                  <input
                    type="text"
                    className={classnames("form-control", {
                      "is-invalid": errors.twitter
                    })}
                    id="inlineFormInputGroup"
                    placeholder="Must be a URL"
                    name="twitter"
                    value={this.state.twitter}
                    onChange={this.onChange}
                  />
                  <div className="invalid-feedback">{errors.twitter}</div>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fab fa-instagram fa-lg" />
                    </div>
                  </div>
                  <input
                    type="text"
                    className={classnames("form-control", {
                      "is-invalid": errors.instagram
                    })}
                    id="inlineFormInputGroup"
                    placeholder="Must be a URL"
                    name="instagram"
                    value={this.state.instagram}
                    onChange={this.onChange}
                  />
                  <div className="invalid-feedback">{errors.instagram}</div>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fab fa-facebook fa-lg" />
                    </div>
                  </div>
                  <input
                    type="text"
                    className={classnames("form-control", {
                      "is-invalid": errors.facebook
                    })}
                    id="inlineFormInputGroup"
                    placeholder="Must be a URL"
                    name="facebook"
                    value={this.state.facebook}
                    onChange={this.onChange}
                  />
                  <div className="invalid-feedback">{errors.facebook}</div>
                </div>
              </div>

              <button
                type="submit"
                id="register-button"
                className="btn btn-dark"
              >
                Create
              </button>
            </form>
          </div>
          <div className="col-md-5">
            {tags}
            {bio}
          </div>
        </div>
      </div>
    );
  }
}

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getProfile: PropTypes.func,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(ProfileForm));
