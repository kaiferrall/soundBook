import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";

//Import functions
import { createPost } from "../../actions/postActions";
import { getAllPosts } from "../../actions/postActions";
//Import components  - {post form, threads list, notifications}

class PostForm extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      text: "",
      tags: "",
      errors: {},
      rows: "1"
    };
    this.onSelect = this.onSelect.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onSelect() {
    this.setState({ rows: "4" });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onClick() {
    const newPost = {
      text: this.state.text,
      title: this.state.title,
      tags: this.state.tags
    };
    this.props.createPost(newPost);
    this.setState({ rows: "1", text: "", title: "", tags: "" });
    setTimeout(this.props.getAllPosts(), 2500);
  }
  render() {
    const { errors } = this.props;

    return (
      <div>
        <div id="profile-form-container">
          <h2>Leave a Post </h2>
          <textarea
            onSelect={this.onSelect}
            onChange={this.onChange}
            value={this.state.text}
            rows={this.state.rows}
            type="text"
            className="form-control"
            id="post-text"
            placeholder="What do you want to say?"
            name="text"
          />
          <div className="invalid-feedback">{errors.text}</div>
          <p id="home-add-tags">
            <a
              data-toggle="collapse"
              href="#collapseExample"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              <i className="fas fa-ellipsis-h" /> more
            </a>
          </p>
          <div className="collapse" id="collapseExample">
            <div>
              <div className="input-group mb-3">
                <input
                  onChange={this.onChange}
                  value={this.state.title}
                  name="title"
                  type="text"
                  className="form-control"
                  placeholder="Add a title"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  onChange={this.onChange}
                  value={this.state.tags}
                  name="tags"
                  type="text"
                  className="form-control"
                  placeholder="Add tags like jazz, soul, or hip-hop"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
              </div>
            </div>
          </div>
          <button
            id="post-button"
            onClick={this.onClick}
            type="submit"
            className="btn btn-outline-primary"
          >
            <i className="fas fa-location-arrow" />
          </button>
          <div className="home-grey-line"> </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  createPost: PropTypes.func.isRequired,
  getAllPosts: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createPost, getAllPosts }
)(PostForm);
