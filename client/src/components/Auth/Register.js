import React, { Component } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      username: "",
      avatar: null,
      password: "",
      password2: "",
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileHandler = this.fileHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      console.log(nextProps.errors);
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const fd = new FormData();
    fd.append("email", this.state.email);
    fd.append("username", this.state.username);
    fd.append("password", this.state.password);
    fd.append("password2", this.state.password2);
    if (this.state.avatar) {
      fd.append("avatar", this.state.avatar, this.state.avatar.name);
    }
    this.props.registerUser(fd, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  fileHandler(e) {
    this.setState({ avatar: e.target.files[0] });
  }
  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className="row" id="register-row">
          <div className="col-md-1" />
          <div id="register-col" className="col-md-6">
            <form id="register-form" onSubmit={this.onSubmit}>
              <h3>Get Started with soundBook</h3>
              <p id="register-subtitle">
                Share the music you love with your friends
              </p>
              <div className="register-grey-line"> </div>
              <br />
              <div id="register-email" className="form-group">
                <label>Email address</label>
                <input
                  type="text"
                  className={classnames("form-control", {
                    "is-invalid": errors.email
                  })}
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  placeholder="Enter email"
                />
                <div className="invalid-feedback">{errors.email}</div>
              </div>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="username"
                  className={classnames("form-control", {
                    "is-invalid": errors.username
                  })}
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange}
                  placeholder="Username"
                />
                <div className="invalid-feedback">{errors.username}</div>
                <small id="emailHelp" className="form-text text-muted">
                  This is what you will sign in with.
                </small>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className={classnames("form-control", {
                    "is-invalid": errors.password
                  })}
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  placeholder="Create a Password"
                />
                <small id="emailHelp" className="form-text text-muted">
                  Must be 8-40 characters.
                </small>
                <div className="invalid-feedback">{errors.password}</div>
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className={classnames("form-control", {
                    "is-invalid": errors.password2
                  })}
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onChange}
                  placeholder="Confirm Password"
                />
                <div className="invalid-feedback">{errors.password2}</div>
              </div>
              <div className="form-group">
                <label id="register-avatar-label">Profile Photo</label>
                <input
                  type="file"
                  id="register-avatar"
                  className="form-control"
                  name="avatar"
                  onChange={this.fileHandler}
                />
                <div className="invalid-feedback" />
              </div>
              <button
                type="submit"
                id="register-button"
                className="btn btn-dark"
              >
                Register
              </button>
              <div className="register-grey-2"> </div>
              <small id="register-login" className="form-text text-muted">
                <Link id="register-login" to="/login">
                  Already have an account? Login here.
                </Link>
              </small>
            </form>
          </div>
          <div className="col-md-5">
            <i id="register-icon" className="fas fa-music" />
            <br />
            <i id="register-icon-2" className="fas fa-music" />
            <i id="register-icon-3" className="fas fa-music" />
          </div>
        </div>
      </div>
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
