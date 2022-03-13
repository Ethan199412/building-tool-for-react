import React from "react";
import ReactDOM from "react-dom";
import App from "./ts/app";
import Demo from "./ts/hooks/demo";
import Demo1 from "./ts/hooks/demo1";
import Demo3 from "./ts/hooks/demo3";


console.log('index.js 加载')

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

ReactDOM.render(<Demo3
    // list={['car', 'bike']}
/>, document.getElementById("root"));