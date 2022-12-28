import * as React from "react";
import "./app.less";
import { mult, pow } from "../utils";
import { Bar } from "@ant-design/plots";
import { Component, useEffect, useRef, useState } from "react";

// 需要放 index.d.ts 文件到根目录并在 tsconfig
// includes 里引入才能解决 vscode 报错
// import img from "../assets/react.jpg";

console.log("app.tsx 加载");
// if (module.hot) {
//     module.hot.accept('./app.tsx', () => {
//         console.log('[p0] hot module replacement')
//     })
// }
const DemoBar = () => {
  const data = [
    {
      year: "1951 年",
      value: 38,
    },
    {
      year: "1952 年",
      value: 52,
    },
    {
      year: "1956 年",
      value: 61,
    },
    {
      year: "1957 年",
      value: 145,
    },
    {
      year: "1958 年",
      value: 48,
    },
  ];
  const config = {
    data,
    xField: "value",
    yField: "year",
    seriesField: "year",
    legend: {
      position: "top-left",
    } as any,
  };
  return <Bar {...config} />;
};

// let num1 = 0

function App() {
  const [num, setNum] = useState(0);
  const ref = useRef<any>({});

  useEffect(() => {
    setInterval(() => {
      const { num } = ref.current;
      console.log("[p1.1]", { num });
    }, 1000);
  }, []);

  ref.current.num = num;
  // useEffect(() => {
  //   console.log("each run");
  //   ref.current.num = num;
  // });

  const handleClick = () => {
    setNum(num + 1);
    console.log("[p1.0]", { num });
  };

  return (
    <div>
      {num}
      <button onClick={handleClick}>按钮</button>
    </div>
  );
}

// class App extends Component<any, any> {
//   constructor(props) {
//     super(props);
//     this.state = { num: 0 };
//   }
//   componentDidMount(): void {
//     setInterval(() => {
//       const { num } = this.state;
//       console.log("[p1.1]", { num });
//     },1000);
//   }

//   handleClick = () => {
//     this.setState({
//       num: this.state.num + 1,
//     });
//   };
//   render() {
//     const { num } = this.state;
//     return (
//       <div>
//         {num}
//         <button onClick={this.handleClick}>click</button>
//       </div>
//     );
//   }
// }

export default App;
