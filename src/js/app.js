import React, { Component } from "react";
import "./index.less";
import img from "./react.jpg";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <img src={img} style={{ width: 100 }} />
        <h1> This is a building Tool designed by Ethan, Welcome for using. </h1>
        <div>
          compared with create-react-app, this building tool will expose
          webpack.config.js so that you could customize for your project.
        </div>
      </div>
    );
  }
}

export default App;
