import React, { Component, useMemo, useState } from 'react';

const useFormatList = (list) => {

    const formatter = () => {
        console.log('[p1.0] format')
        return list.map(item => {
            return item.toUpperCase()
        })
    }
    return useMemo(formatter, [])
}

const Demo = ({ list }) => {
    const [number, setNumber] = useState(0)

    const newList = useFormatList(list)
    console.log('list', list, newList)

    return <>
        <div className='list'>
            {newList.map(item => <div key={item}>{item}</div>)}
        </div>
        <div className='number'>
            <div>{number}</div>
            <button onClick={() => setNumber(number + 1)}>add</button>
        </div>
    </>
}

export default Demo