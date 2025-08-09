import * as React from "react";
import "./app.less";
import axios from "axios";
import img from "./assets/react.jpg";

class TestDiff extends React.Component<any, any> {
  state: any;
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  handleClick = async () => {
    
  };

  render() {
    return (
      <div className="App" >
      <img src={img} style={{ width: 100 }} />
      <h1> This is a building Tool designed by Ethan, Welcome for using. </h1>
      <button onClick={this.handleClick}>fetch</button>
  </div>
    );
  }
}

export default TestDiff;
