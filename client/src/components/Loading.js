import React, { Component } from "react";
import { Link } from "react-router-dom";

class Loading extends Component {
  render() {
    return (
      <div className="text-center">
        <img id="loading-image-profile" src="FeedLoading.gif" />
      </div>
    );
  }
}

export default Loading;
