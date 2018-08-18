import React, { Component } from "react";
import { Link } from "react-router-dom";

class FeedLoading extends Component {
  render() {
    return (
      <div className="text-center">
        <img id="loading-image" src="FeedLoading.gif" />
      </div>
    );
  }
}

export default FeedLoading;
