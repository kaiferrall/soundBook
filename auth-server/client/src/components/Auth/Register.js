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
      password: "",
      password2: "",
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      console.log(nextProps.errors);
    }
  }
  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className="row" id="register-row">
          <div className="col-md-1" />
          <div id="register-col" className="col-md-6">
            <form id="register-form" onSubmit={this.onSubmit}>
              <h3>Get Started with MyMusic</h3>
              <p id="register-subtitle">
                Share the music you love with your friends
              </p>
              <div className="register-grey-line"> </div>
              <br />
              <div className="form-group">
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
                  Must be between 8 and 40 characters.
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
              <button
                type="submit"
                id="register-button"
                className="btn btn-dark"
              >
                Submit
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
