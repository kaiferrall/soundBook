import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      console.log(nextProps.errors);
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const userData = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors } = this.state;

    return (
      <div className="row">
        <div className="col-md-4" />
        <div id="login-mid-col" className="col-md-4">
          <form id="login-form" onSubmit={this.onSubmit}>
            <div id="login-form-logo">
              <i className="fas fa-music fa-4x" />
            </div>
            <h2 id="login-form-title">Login to soundBook</h2>
            <div className="form-group">
              <input
                type="text"
                className={classnames("form-control", {
                  "is-invalid": errors.username
                })}
                id="login-username"
                placeholder="Username"
                name="username"
                onChange={this.onChange}
                value={this.state.username}
              />
              <small id="emailHelp" className="form-text text-muted">
                Username is case sensitive.
              </small>
              <div className="invalid-feedback">{errors.username}</div>
            </div>
            <div className="form-group">
              <input
                type="password"
                className={classnames("form-control", {
                  "is-invalid": errors.password
                })}
                id="exampleInputPassword1"
                placeholder="Password"
                name="password"
                onChange={this.onChange}
                value={this.state.password}
              />
              <div className="invalid-feedback">{errors.password}</div>
            </div>
            <button id="welcome-submit" type="submit" className="btn btn-dark">
              Login
            </button>
            <div id="welcome-register">
              <Link id="welcome-register" to="/register">
                New to MyMusic? Register here
              </Link>
            </div>
          </form>
        </div>
        <div className="col-md-4" />
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
