import * as React from "react";
import "./app.less";
import { mult, pow } from '../utils'
import axios from 'axios'

axios.defaults.withCredentials = true

// 需要放 index.d.ts 文件到根目录并在 tsconfig
// includes 里引入才能解决 vscode 报错
import img from "../assets/react.jpg";
console.log('[p1]', img)

class App extends React.Component {
    constructor(props: any) {
        super(props);
    }

    handleClick = () => {
        // axios.get()
    }

    render() {
        return (
            <div className="App" >
                <img src={img} style={{ width: 100 }} />
                <h1> This is a building Tool designed by Ethan, Welcome for using. </h1>
                <button onClick={this.handleClick}>fetch</button>
            </div>
        );
    }
}

export default App;