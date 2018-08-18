import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
//Import components

//Import functions
import { checkExpiration } from "../../actions/authActions";
import { createThread } from "../../actions/threadActions";

class ThreadCreate extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      desc: "",
      private: false
    };
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onClick() {
    this.state.private = !this.state.private;
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const newThread = {
      name: this.state.name,
      desc: this.state.desc,
      private: this.state.private
    };
    this.props.createThread(newThread);
  }
  render() {
    const { errors } = this.props;
    return (
      <div>
        <p className="text text-center" id="threads-new-threads">
          <a
            data-toggle="collapse"
            href="#collapseExample"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <i className="fas fa-plus" /> New Thread
          </a>
        </p>
        <div className="collapse" id="collapseExample">
          <div className="input-group mb-3">
            <div id="thread-create-card" className="card">
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <h4>Create a new Thread</h4>
                  <label id="thread-create-label">Thread name</label>
                  <input
                    type="text"
                    className={classnames("form-control", {
                      "is-invalid": errors.threads
                    })}
                    onChange={this.onChange}
                    placeholder="Give this thread a name"
                    value={this.state.name}
                    name="name"
                  />
                  <div className="invalid-feedback">{errors.threads}</div>
                  <label id="thread-create-label">Thread description</label>
                  <input
                    type="text"
                    onChange={this.onChange}
                    className={classnames("form-control", {
                      "is-invalid": errors.description
                    })}
                    placeholder="Quick description"
                    value={this.state.desc}
                    name="desc"
                  />
                  <div className="invalid-feedback">{errors.description}</div>
                  <br />
                  <div className="form-check">
                    <input
                      onClick={this.onClick}
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      Make this thread private
                    </label>
                  </div>
                  <button
                    id="thread-create-btn"
                    type="submit"
                    className="btn btn-dark"
                  >
                    create
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ThreadCreate.propTypes = {
  profile: PropTypes.object.isRequired,
  createThread: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createThread }
)(ThreadCreate);
