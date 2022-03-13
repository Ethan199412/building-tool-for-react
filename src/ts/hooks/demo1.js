import React, { useState } from 'react'

const useMyHook = (initValue) => {
    const [value, setValue] = useState(initValue || '')
    const onChange = (e) => {
        setValue(e.target.value)
    }
    return { value, onChange }
}

function Demo1() {
    const myHookValue = useMyHook('myHook')
    return (
        <div className="app">
            <p>value:{myHookValue.value}</p>
            <input value={myHookValue.value} onChange={myHookValue.onChange} />
        </div>
    )
}

export default Demo1