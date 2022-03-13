import * as React from "react";

const { useState, useEffect } = React


function Sub() {
    const [count, setCount] = useState(0)
    const [disable, setDisable] = useState(true)

    // 这种用法是初始化的时候和变化的时候都会执行 componentDidMount 和 ComponentDidUpdate 的结合
    useEffect(() => {
        // console.log(count)
        // if (count % 2 == 0) {
        //     console.log(count)
        // }

        return () => {
            
        }
    }, [count]) // 能够引起副作用执行的依赖

    useEffect(() => {
        console.log('挂载')
        const handleClick = () => console.log(1)
        document.addEventListener('click', handleClick)
        return () => {
            console.log('卸载')
            document.removeEventListener('click', handleClick)
        }
    }, []) // 如果是空数组那么内部和返回值分别代表 mount 和 unmount

    return (<div>
        <button onClick={() => setDisable(!disable)}>{disable ? '禁用' : '启用'}</button>
        函数组件：{count}
        <button onClick={() => setCount(count + 1)}>点击</button>
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

export default Sub;