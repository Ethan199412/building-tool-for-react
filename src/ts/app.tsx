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
      imageList: [],
      topScrollYStart: 0,
      downScrollYStart: 0,
      bottomClassName: "stick",
      height: undefined
    };
  }

  componentDidMount(): void {
    // (window as any).container = document.querySelector(".container");
    setTimeout(() => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.querySelector(".container")!;

      console.log("[p1.4]", { clientHeight, scrollHeight });

      // 有滚动
      if (scrollHeight > clientHeight) {
      } else {
        this.setState({
          bottomClassName: "bottom",
          height: '100%'
        });
      }
    }, 1000);
  }

  state: any;

  handleTouchStart = (e) => {
    console.log("click triggered");
    const scroll = document
      .querySelector(".scroll")
      ?.getBoundingClientRect().top;
    console.log("[p1.0] ", { scroll, y: e.touches[0].clientY });

    this.setState({
      topScrollYStart: e.touches[0].clientY,
      downScrollYStart: e.touches[0].clientY,
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

    console.log("[p1.3]", {
      scrollTop,
      clientHeight,
      scrollHeight,
      containerTop,
      scrollEleTop,
    });

    // 并未达边界条件重置，上顶端
    if (scrollEleTop! - containerTop! < 10) {
      this.setState({
        topScrollYStart: currentMouseY,
      });
      // return
    }

    if (scrollTop + clientHeight < scrollHeight) {
      this.setState({
        downScrollYStart: currentMouseY,
      });
      // return
    }

    // 滚动条在顶部
    if (scrollEleTop! - containerTop! >= 10) {
      const offset = currentMouseY - this.state.topScrollYStart;
      this.setState({
        moveDistance: offset ** 0.8,
        sec: 0,
      });
      return;
    }

    // 滚动条在底部
    // 这个公式很重要，判断滚动条是否触底的重要条件
    if (scrollTop + clientHeight >= scrollHeight) {
      const offset = currentMouseY - this.state.downScrollYStart;
      console.log("[p1.5] offset", offset);
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

  render() {
    return (
      <div className="container">
        <div
          className="scroll"
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
          style={{
            transform: `translateY(${this.state.moveDistance}px)`,
            transition: `transform ${this.state.sec}ms`,
            height: this.state.height
          }}
        >
          {/* <img src="https://www.shenmegeng.cn/uploads/20220215/11e181d18aaa441bc301b1973a881e05.jpg" />
          <img src="https://www.shenmegeng.cn/uploads/20220215/11e181d18aaa441bc301b1973a881e05.jpg" /> */}
          <img src="https://www.shenmegeng.cn/uploads/20220215/11e181d18aaa441bc301b1973a881e05.jpg" />
          <img src="https://www.shenmegeng.cn/uploads/20220215/11e181d18aaa441bc301b1973a881e05.jpg" />
          <div className={this.state.bottomClassName}>下滑翻页</div>
        </div>
        
      </div>
    );
  }
}

export default App;
