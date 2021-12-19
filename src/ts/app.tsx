import * as React from "react";
import "./app.less";

// 需要放 index.d.ts 文件到根目录并在 tsconfig
// includes 里引入才能解决 vscode 报错
import img from "../assets/react.jpg";

console.log('app.tsx 加载')
if (module.hot) {
    module.hot.accept('./app.tsx', () => {
        console.log('[p0] hot module replacement')
    })
}

const a = undefined
class App extends React.Component {
    constructor(props: any) {
        super(props);
        console.log('[p1]', module.hot);a.e = 5
    }

    render() {
        return (
            <div className="App" >
                <img src={img} style={{ width: 100 }} />
                <h1> This is a building Tool designed by Ethan, Welcome for using. </h1>
                <h2> The TS Version </h2>
                <div>
                    compared with create - react - app, this building tool will expose
                    webpack.config.js so that you could customize for your project.
                </div>
            </div>
        );
    }
}

export default App;