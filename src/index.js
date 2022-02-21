import React from "react";
import ReactDOM from "react-dom";
import App from "./ts/app";

console.log('index.js 加载')

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/dist/service-worker.js').then(() => {
            console.log('sw 注册成功了')
        }).catch(_ => {
            console.log('sw 注册失败了')
        })
    })
}
ReactDOM.render(<App />, document.getElementById("root"));