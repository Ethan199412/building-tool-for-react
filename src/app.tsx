import * as React from "react";
import * as ReactDOM from "react-dom";
import "./app.less";
import img from "./assets/react.jpg";
import { useLocation, useNavigate } from "react-router-dom";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { isWx } from ".";

interface IProps {
  // replaceUrl: (url: string) => void
}

const IndexPage = () => {
  const navigate = useNavigate();
  const [text, setText] = React.useState('This is Index Page. Welcome!');

  React.useEffect(()=>{
    console.log('[p1.0] mounted')
    setTimeout(() => {
      console.log('[p1.5] setTimeout')
      setText(`This is Index Page. 
          Welcome!This is Index Page. Welcome!This is Index Page.
           Welcome!This is Index Page. Welcome!This is Index Page. 
           Welcome!This is Index Page. Welcome!This is Index Page.
            Welcome!This is Index Page. Welcome!This is Index Page.
             Welcome!This is Index Page. Welcome!This is Index Page. 
             Welcome!This is Index Page. Welcome!This is Index Page.
              Welcome!This is Index Page. Welcome!This is Index Page.
               Welcome!This is Index Page. Welcome!This is Index Page.
                Welcome!This is Index Page. Welcome!This is Index Page.`)
      },500)
  }, [])

  const handleClick = () => {
    if(isWx){
      console.log('wx miniProgram')
      window.wx.miniProgram.navigateTo({url: `/pages/index-2/index?url=${location.origin}/test`});
      return
    }
    location.href = "/test";       // 跳转到 /test
    // navigate("/test", { replace: true }); // 替换当前历史记录，不可回退
  };

  return (
    <div>
      <h1>{text}</h1>
      <button onClick={handleClick}>Go to Test Page</button>
    </div>
  );
};

class TestPage extends React.Component {
  handleBack = () => {
    location.href = "/index"; // 跳回 /index
  };

  back = () => {
    history.back();
  }

  render() {
    return (
      <div className="App">
        <h1>This is Test Page 🎉</h1>
        <button onClick={this.back}>back</button>
        {/* <button onClick={this.handleBack}>Back to Index</button> */}
      </div>
    );
  }
}

// 简单路由渲染
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/index" element={<IndexPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

// ReactDOM.render(<IndexPage />, document.getElementById("root"));