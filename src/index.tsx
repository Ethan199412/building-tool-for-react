import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./app";

new window.VConsole();

window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    console.log("页面是从 BFCache 恢复的 ✅");
  } else {
    console.log("页面是正常加载的");
  }
});

const urlParams = new URLSearchParams(window.location.search);
export const isWx = urlParams.get('wx');
console.log('[p2.0] wx', isWx)

ReactDOM.render(<App />, document.getElementById("root"));