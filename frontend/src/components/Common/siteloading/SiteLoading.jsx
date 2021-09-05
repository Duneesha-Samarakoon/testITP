import React, { Component } from "react";
import "./SiteLoading.css";

import Loader from "react-loader-spinner";
export default class App extends React.Component {
  //other logic
  render() {
    return (
      <div className="overlay" align="center">
        <Loader
          type="BallTriangle"
          color="#00BFFF"
          className="logo"
          height={100}
          width={100}
          //   timeout={3000} //3 secs
        />
      </div>
    );
  }
}
