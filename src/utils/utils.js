export const judgeOneBlock = (selectedHouses, maxX, maxY) => {
    const move = (currentHouse) => {
        arriveSet.add(currentHouse)
        selectedHouses.remove(currentHouse)
        console.log('[p0.1]', Array.from(arriveSet), Array.from(selectedHouses))
        let nextHouse
        let [y, x] = currentHouse

        if (x > 0) {
            nextHouse = getHouse(currentHouse, ACTION.LEFT)
            if (selectedHouses.has(nextHouse)) move(nextHouse)
        }
        if (y > 0) {
            nextHouse = getHouse(currentHouse, ACTION.DOWN)
            if (selectedHouses.has(nextHouse)) move(nextHouse)
        }
        if (x < maxX) {
            nextHouse = getHouse(currentHouse, ACTION.RIGHT)
            if (selectedHouses.has(nextHouse)) move(nextHouse)
        }
        if (y < maxY) {
            nextHouse = getHouse(currentHouse, ACTION.DOWN)
            if (selectedHouses.has(nextHouse)) move(nextHouse)
        }
    }
    selectedHouses = JSON.parse(JSON.stringify(selectedHouses))
    const startHouse = selectedHouses[0]
    selectedHouses = new Set(selectedHouses)
    const arriveSet = new Set()

    move(startHouse)
    if (selectedHouses.size == arriveSet.size) {
        return true
    }
    return false
}

const getHouse = (currentHouse, action) => {
    const [y, x] = currentHouse
    switch (action) {
        case ACTION.LEFT:
            return [y, x - 1]
        case ACTION.UP:
            return [y - 1, x]
        case ACTION.RIGHT:
            return [y, x + 1]
        case ACTION.DOWN:
            return [y + 1, x]
    }
}

const ACTION = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    UP: 'UP',
    DOWN: 'DOWN'
}