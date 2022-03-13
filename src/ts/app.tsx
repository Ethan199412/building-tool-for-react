import * as React from "react";
import "./app.less";
import { mult, pow } from '../utils'
const { useState, useEffect } = React
console.log('[p1]', mult(2, 3))
// 需要放 index.d.ts 文件到根目录并在 tsconfig
// includes 里引入才能解决 vscode 报错
import img from "../assets/react.jpg";
import Sub from "./component";

// console.log('app.tsx 加载')
// if (module.hot) {
//     module.hot.accept('./app.tsx', () => {
//         console.log('[p0] hot module replacement')
//     })
// }


function App() {
    // const [count, setCount] = useState(0)
    // const [disable, setDisable] = useState(true)

    // // 这种用法是初始化的时候和变化的时候都会执行 componentDidMount 和 ComponentDidUpdate 的结合
    // useEffect(() => {
    //     console.log(count)
    //     if (count % 2 == 0) {
    //         console.log(count)
    //     }

    //     return () => {
    //         console.log('卸载')
    //     }
    // }, [count]) // 能够引起副作用执行的依赖

    // useEffect(() => {
    //     const handleClick = () => console.log(1)
    //     document.addEventListener('click', handleClick)
    //     return () => {
    //         document.removeEventListener('click', handleClick)
    //     }
    // }, [])

    // return (<div>
    //     <button onClick={() => setDisable(!disable)}>{disable ? '禁用' : '启用'}</button>
    //     函数组件：{count}
    //     <button onClick={() => setCount(count + 1)}>点击</button>
    // </div>)
    const [visible, setVisible] = useState(true)
    return (<div>
        <button onClick={() => setVisible(!visible)}>click</button>
        {visible && <Sub />}
    </div>)
}

// class App extends React.Component<any, any> {
//     constructor(props) {
//         super(props)
//         this.state = {
//             count: 0
//         }
//     }

//     handleClick = () => {
//         this.setState({
//             count: this.state.count + 1
//         })
//     }

//     render() {
//         const { count } = this.state
//         if (count % 2 == 0) console.log(count)
//         return <div>
//             {count}
//             <button onClick={this.handleClick}>更新</button>
//         </div>
//     }
// }

export default App;