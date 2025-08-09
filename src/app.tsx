import * as React from "react";
import "./app.less";
import axios from "axios";
import img from "./assets/react.jpg";
import store from './store/index'
class TestDiff extends React.Component<any, any> {
  state: any;
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  componentDidMount(): void {
    console.log('[p1.0] store', store)
  }

  handleClick = () => {
    location.replace('/?a=1&b=2')
  };

  handleAddNum = () => {
    store.num += 1
    console.log('[p1.1] ', store)
  }

  render() {
    return (
      <div className="App" >
      <img src={img} style={{ width: 100 }} />
      <h1> This is a building Tool designed by Ethan, Welcome for using. </h1>
      <button onClick={this.handleClick}>replace url</button>
      <button onClick={this.handleAddNum}>add</button>
  </div>
    );
  }
}

export default TestDiff;
