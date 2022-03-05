const move = ({ arriveSet, selectedHouses, maxX, maxY }) => {
    const innerMove = (currentHouse) => {
        arriveSet.add(currentHouse)
        selectedHouses.delete(currentHouse)

        console.log('[1.0] arriveSet', Array.from(arriveSet), 'selectedHouses', Array.from(selectedHouses))
        let nextHouse
        let [y, x] = currentHouse.split(',')

        if (x > 0) {
            nextHouse = getHouse(currentHouse, ACTION.LEFT)
            if (selectedHouses.has(nextHouse)) innerMove(nextHouse)
        }
        if (y > 0) {
            nextHouse = getHouse(currentHouse, ACTION.UP)
            if (selectedHouses.has(nextHouse)) innerMove(nextHouse)
        }
        if (x < maxX) {
            nextHouse = getHouse(currentHouse, ACTION.RIGHT)
            if (selectedHouses.has(nextHouse)) innerMove(nextHouse)
        }
        if (y < maxY) {
            nextHouse = getHouse(currentHouse, ACTION.DOWN)
            if (selectedHouses.has(nextHouse)) innerMove(nextHouse)
        }
    }
    return innerMove
}

export const judgeOneBlock = (selectedHouses, maxX, maxY) => {
    selectedHouses = JSON.parse(JSON.stringify(selectedHouses)).map(e => e.join(','))
    const originSize = selectedHouses.length
    const startHouse = selectedHouses[0]
    selectedHouses = new Set(selectedHouses)
    const arriveSet = new Set()

    const innerMove = move({
        arriveSet,
        selectedHouses,
        maxX,
        maxY
    })
    innerMove(startHouse)

    if (originSize == arriveSet.size) {
        return true
    }
    return false
}

export const calBlocks = (selectedHouses, maxX, maxY) => {
    selectedHouses = JSON.parse(JSON.stringify(selectedHouses)).map(e => e.join(','))
    const originSize = selectedHouses.length
    let startHouse = selectedHouses[0]
    selectedHouses = new Set(selectedHouses)
    const arriveSet = new Set()

    const innerMove = move({
        arriveSet,
        selectedHouses,
        maxX,
        maxY
    })
    let count = 0
    // if (selectedHouses.size == 0) return 0
    while (selectedHouses.size > 0) {
        innerMove(startHouse)
        count += 1
        if (selectedHouses.size > 0) {
            startHouse = Array.from(selectedHouses)[0]
        }
    }
    return count
}

const getHouse = (currentHouse, action) => {
    const [y, x] = currentHouse.split(',').map(e => Number(e))
    let nextHouse
    switch (action) {
        case ACTION.LEFT:
            nextHouse = [y, x - 1]
            break
        case ACTION.UP:
            nextHouse = [y - 1, x]
            break
        case ACTION.RIGHT:
            nextHouse = [y, x + 1]
            break
        case ACTION.DOWN:
            nextHouse = [y + 1, x]
            break
    }
    return nextHouse.join(',')
}

const ACTION = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    UP: 'UP',
    DOWN: 'DOWN'
}