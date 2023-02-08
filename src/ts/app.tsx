import { Form, Input, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import * as React from "react";
import { useState } from "react";
import "./app.less";
import 'antd/dist/antd.css'

interface IFilter1 {
    name?: string,
    class?: string,
    gender?: string
}

const { Option } = Select
const { Item } = Form

const optionList = [
    {
        key: 'filter1',
        text: 'filter1'
    },
    {
        key: 'filter2',
        text: 'filter2'
    }
]

const optionList1 = [
    {
        key: 'filter3',
        text: 'filter3'
    },
    {
        key: 'filter4',
        text: 'filter4'
    }
]

const getParamsFromUrl = () => {
    const { search } = location
    if (!search.includes('?')) return {}

    const params = {}

    const paramArr = search.split('?')[1].split('&')

    for (let e of paramArr) {
        let [key, value] = e.split('=') as any
        if (value[0] == '[' && value[value.length - 1] == ']') {
            value = value.slice(1, value.length - 1).split(',')
        }
        params[key] = value
    }
    return params
}

function useUrlState<T>(initVal: T) {
    let [val, setVal] = useState(initVal)

    const updateUrlSearch = (params: T) => {
        const currentParams = getParamsFromUrl()

        let search = '?'

        const combinedParams = { ...currentParams, ...params }
        console.log('[p2.0]',{currentParams, combinedParams, params})
        for (let key in combinedParams) {
            let value: any = combinedParams[key]
            if (Array.isArray(value)) {
                if(value.length == 0) continue
                value = '[' + value.join(',') + ']'
            }
            search += value && `${key}=${value}&`
        }
        search = search.slice(0, search.length - 1)
        //if (search == currentSearch) search = ''
        history.pushState(null, null, search)
    }

    const urlVal = getParamsFromUrl()
    val = { ...val, ...urlVal }
    //setVal(val)

    const setUrlState = (val: T) => {
        updateUrlSearch(val)
        setVal(val)
    }

    return [val, setUrlState] as [T, Function]
}

function Filter1() {
    const [info, setInfo] = useUrlState({})
    const params = getParamsFromUrl()
    console.log('[p1.2] params', params)

    const handleChange = (name, value) => {
        console.log('[p1.0] e', { name, value })
        const copy = { ...info }
        copy[name] = value
        setInfo(copy)
    }

    return <div>
        {
            optionList.map(e => {
                return <div className="flex option-box" key={e.key}>
                    <label>{e.text}</label>
                    <Select
                        value={info[e.key]}
                        onChange={(value) => handleChange(e.key, value)}
                        style={{ width: 80 }}
                    // key={e.key}
                    >
                        <Option value='1' key='1'>选项1</Option>
                        <Option value='2' key='2'>选项2</Option>
                        <Option value='3' key='3'>选项3</Option>
                    </Select>
                </div>
            })
        }
    </div>
}

function Filter2() {
    const [info, setInfo] = useUrlState({})
    const params = getParamsFromUrl()
    console.log('[p1.2] params', params)

    const handleChange = (name, value) => {
        console.log('[p2.0] e', { name, value })
        const copy = { ...info }
        copy[name] = value
        setInfo(copy)
    }

    return <div>
        {
            optionList1.map(e => {
                return <div className="flex option-box" key={e.key}>
                    <label>{e.text}</label>
                    <Select
                        value={info[e.key]}
                        onChange={(value) => handleChange(e.key, value)}
                        style={{ width: 80 }}
                        mode='multiple'
                    // key={e.key}
                    >
                        <Option value='1' key='1'>选项1</Option>
                        <Option value='2' key='2'>选项2</Option>
                        <Option value='3' key='3'>选项3</Option>
                    </Select>
                </div>
            })
        }
    </div>
}

function App() {
    return <>
        <Filter1 />
        <Filter2 />
    </>
}

export default App;