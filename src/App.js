// @flow
import React, { Component } from "react";

type f1 = (a: number, b: number) => number

import "./index.less";
import img from "./react.jpg";

class App extends Component<any> {
  constructor(props: any) {
    super(props);
  }

  handleClick: Function = () => {
    console.log(this.add(1, 4))
  }

  add: f1 = (a, b) => {
    return a + b
  }

  render(): any {
    return (
      <div className="App">
        <img src={img} style={{ width: 100 }} />
        <h1> This is a building Tool designed by Ethan, Welcome for using. </h1>
        <div>
          compared with create-react-app, this building tool will expose
          webpack.config.js so that you could customize for your project.
        </div>
        <button onClick={this.handleClick}>click</button>
      </div>
    );
  }
}

export default App;
