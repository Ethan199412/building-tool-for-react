import * as React from "react";
import { useEffect, useState } from 'react'
import "./app.less";
import { mult, pow } from '../utils'
import axios from 'axios'
// import 'antd/dist/antd.css';
import { Button, Input } from 'antd'
import './app.less'

const App = () => {
    const [text, setText] = useState('')
    const [list, setList] = useState<any[]>([])

    useEffect(() => {
        const liststr = localStorage.getItem('list')
        if (liststr) {
            setList(JSON.parse(liststr))
        }
    }, [])

    useEffect(() => {
        console.log('[p1.2] effect')
        localStorage.setItem('list', JSON.stringify(list))
    }, [list.length])

    const handleClick = () => {
        const id = +new Date()
        list.push({ text, key: id, id })
        setList([...list])
        setText('')
    }

    const handleChange = (e) => {
        // console.log('[p1.0] value', value)
        setText(e.target.value)
    }

    const handleDelete = (key) => {
        console.log('[p1.0] key', key)
        const index = list.findIndex(e => e.key == key)

        console.log('[p1.0] index', index)
        list.splice(index, 1)
        setList([...list])
    }

    return (
        <div className="app-container">
            {/* <h1>304 Caching Example</h1>
            <img src='http://localhost:3010/api/v1/image'/> */}
            <div className="top-container">
                <Input style={{ width: 80 }} value={text} onChange={handleChange} />
                <Button type='primary' onClick={handleClick}>add</Button>
            </div>
            {list.map(e => {
                const { text, key } = e
                return <Item
                    text={text}
                    key={key}
                    id={key}
                    handleDelete={handleDelete}
                />
            })}
        </div>
    );
};

const Item = (props) => {
    const { text, handleDelete, id } = props;
    return < div className="item-container" >
        <div>{text}</div>
        <Button onClick={() => handleDelete(id)}>delete</Button>
    </div >
}

export default App;