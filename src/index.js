import React from "react";
import ReactDOM from "react-dom";
import App from "./ts/app";

console.log('index.js 加载')

/* if you want pwa support */
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load',
//         () => {
//             navigator.serviceWorker.register('/dist/service-worker.js').then(_ => {
//                 console.log('sw 注册成功')
//             }).catch(_=>{
//                 console.log('sw 注册失败')
//             })
//         })
// }

ReactDOM.render(<App />, document.getElementById("root"));