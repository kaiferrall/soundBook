import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Import components  - {post form, threads list, notifications}
import Tags from "../Profile/Tags";

//Import functions
import { checkExpiration } from "../../actions/authActions";

class PostCard extends Component {
  render() {
    const { post } = this.props;
    const likeAmount = post.likes.length;
    let lineStyle = {};
    let height;
    if (post.text.length < 50) {
      const height = 80 / post.text.length;
      lineStyle = {
        height: height + "px"
      };
    }
    let tags;

    if (post.tags) {
      tags = post.tags.map(tag => <Tags tag={tag} />);
    }
    return (
      <div className="row">
        <div className="col-md-12">
          <div style={lineStyle ? lineStyle : null} className="post-grey-line">
            {" "}
          </div>
          <div id="post-card" className="card">
            <div className="card-body">
              <h5 className="card-title">
                {" "}
                <img id="navbar-image" src="no-avatar.png" alt="" />
                {"   "}
                {post.username}
              </h5>
              <h6 className="card-subtitle mb-2 text-muted">{post.title}</h6>
              <p className="card-text">{post.text}</p>
              {tags ? tags : null}
              <small id="post-date" className="form-text text-muted">
                {post.date}
              </small>
              <br />
              <a href="#" id="post-like-amount" className="card-link">
                {likeAmount ? likeAmount : null}
                <i id="post-like-icon" className="far fa-thumbs-up" />
              </a>
              <a href="#" className="card-link">
                <i className="far fa-comment-alt" />
              </a>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired
};

export default connect()(PostCard);
