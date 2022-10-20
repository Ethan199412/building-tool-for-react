import * as React from "react";
import "./app.less";
import { mult, pow } from "../utils";
import { Bar } from "@ant-design/plots";

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

class App extends React.Component {
  constructor(props: any) {
    super(props);
    // console.log('[p1]', module.hot);
  }

  render() {
    return (
      <div className="App">
        <div className="flex">
          <div className="flex-item">
            <DemoBar />
            {/* <canvas width={300}/> */}
          </div>
          <div className="flex-item">
            {/* <canvas width={300}/> */}
            <DemoBar />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
