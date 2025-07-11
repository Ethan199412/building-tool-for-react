import * as React from "react";
import "./app.less";
import axios from "axios";

// axios.defaults.withCredentials = true;

// 需要放 index.d.ts 文件到根目录并在 tsconfig
// includes 里引入才能解决 vscode 报错

class TestDiff extends React.Component<any, any> {
  state: any;
  constructor(props) {
    super(props);
    this.state = {
      list: [3, 1, 5, 2, 4],
    };
  }

  handleClick = async () => {
    await axios.post("http://172.25.125.179:3000/log/log");
  };

  // 问题的原因在于 oldChildrenMap 里面的 rootId 重复了
  render() {
    return (
      <div>
        <div>hi</div>
        <button onClick={this.handleClick}>fetch</button>
      </div>
    );
  }
}

export default TestDiff;
