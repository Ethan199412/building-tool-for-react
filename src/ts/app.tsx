import * as React from "react";
import "./app.less";
import { mult, pow } from '../utils'
import { Translation } from 'react-i18next';
import i18next from '../locale'
const { t } = i18next
// 需要放 index.d.ts 文件到根目录并在 tsconfig
// includes 里引入才能解决 vscode 报错
import img from "../assets/react.jpg";

class App extends React.Component {
    constructor(props: any) {
        super(props);
        console.log('[p1]', module.hot);
    }

    render() {
        return (
            <div className="App" >
                <img src={img} style={{ width: 100 }} />
                <h1>{t('Welcome to React')}</h1>
            </div>
        );
    }
}

export default App;