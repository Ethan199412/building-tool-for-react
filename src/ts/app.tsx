import * as React from "react";
import "./app.less";
import { mult, pow } from "../utils";
import axios from "axios";

axios.defaults.withCredentials = true;

// 需要放 index.d.ts 文件到根目录并在 tsconfig
// includes 里引入才能解决 vscode 报错
import img from "../assets/react.jpg";
import { useRef, useState } from "react";

console.log("[p1.3] haha");
class App extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      scrollYStart: 0,
      moveDistance: 0,
      sec: 0,
    };
  }

  componentDidMount(): void {
    (window as any).container = document.querySelector(".container");
  }

  state: any;

  handleTouchStart = (e) => {
    console.log("click triggered");
    const scroll = document
      .querySelector(".scroll")
      ?.getBoundingClientRect().top;
    console.log("[p1.0] ", { scroll, y: e.touches[0].clientY });

    this.setState({
      scrollYStart: e.touches[0].clientY,
    });
  };

  handleTouchMove = (e) => {
    // console.log("click triggered");
    const scrollEleTop = document
      .querySelector(".scroll")
      ?.getBoundingClientRect().top;

    const containerTop = document
      .querySelector(".container")
      ?.getBoundingClientRect().top;

    const currentMouseY = e.touches[0].clientY;

    const { scrollTop, scrollHeight, clientHeight } =
      document.querySelector(".container")!;

    console.log("[p1.3]", { scrollTop, scrollHeight, clientHeight });

    // 滚动条在顶部
    if (scrollEleTop! - containerTop! >= 10) {
      const offset = currentMouseY - this.state.scrollYStart;
      this.setState({
        moveDistance: offset ** 0.8,
        sec: 0,
      });
      return
    }

    // 滚动条在底部
    if (scrollTop + clientHeight >= scrollHeight) {
        const offset = currentMouseY - this.state.scrollYStart;
        console.log('[p1.5] offset', offset)
        this.setState({
            moveDistance: -((-offset) ** 0.8),
            sec: 0,
          });
    }
  };

  handleTouchEnd = (e) => {
    console.log("[p1.4] moveDistance", this.state.moveDistance);
    this.setState({
      moveDistance: 0,
      sec: 300,
    });
  };

  handleMouseUp = () => {
    console.log("[p1.4] handleClick");
  };

  render() {
    return (
      <div className="container">
        <div
          className="scroll"
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
          onMouseUp={this.handleMouseUp}
          style={{
            transform: `translateY(${this.state.moveDistance}px)`,
            transition: `transform ${this.state.sec}ms`,
          }}
        >
          <img src="https://www.shenmegeng.cn/uploads/20220215/11e181d18aaa441bc301b1973a881e05.jpg" />
          <img src="https://www.shenmegeng.cn/uploads/20220215/11e181d18aaa441bc301b1973a881e05.jpg" />
          <img src="https://www.shenmegeng.cn/uploads/20220215/11e181d18aaa441bc301b1973a881e05.jpg" />
          <img src="https://www.shenmegeng.cn/uploads/20220215/11e181d18aaa441bc301b1973a881e05.jpg" />
          <div>last</div>
          <div>last</div>
        </div>
      </div>
    );
  }
}

export default App;
