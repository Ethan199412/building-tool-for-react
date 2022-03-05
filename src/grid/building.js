import React, { Component } from "react";
import img from "../assets/react.jpg";
import { judgeOneBlock, calBlocks } from "../utils/utils";
import './building.less'

const x = 8, y = 8
class Building extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: new Array(y).fill(Array(x).fill({})),
      gridCopy: new Array(y).fill(Array(x).fill({})),
      isOneBlock: false,
      totalBlocks: 0
    }
    this.selectedHouses = []
    document.addEventListener('keydown', this.handleKeyDown)
    document.addEventListener('keyup', this.handleKeyUp)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
    document.removeEventListener('keyup', this.handleKeyUp)
  }

  handleClickHouse = (floorIndex, houseIndex, e) => {
    e.stopPropagation()

    let { grid, gridCopy } = this.state
    grid = JSON.parse(JSON.stringify(grid))
    gridCopy = JSON.parse(JSON.stringify(gridCopy))

    if (this.ctrl) {
      this.selectedHouses.push([floorIndex, houseIndex])
      grid[floorIndex][houseIndex].selected = true
      this.setState({
        grid
      })
    }
    else {
      this.selectedHouses = [[floorIndex, houseIndex]]
      gridCopy[floorIndex][houseIndex].selected = true
      this.setState({
        grid: gridCopy
      })
    }

    const res = judgeOneBlock(this.selectedHouses, x - 1, y - 1)
    const totalBlocks = calBlocks(this.selectedHouses, x - 1, y - 1)
    this.setState({
      isOneBlock: res,
      totalBlocks
    })
  }

  handleKeyDown = (e) => {
    if (e.metaKey || e.ctrlKey) {
      this.ctrl = true
    }
  }

  handleKeyUp = (e) => {
    this.ctrl = false
  }

  deselect = () => {
    const { gridCopy } = this.state
    this.setState({
      grid: gridCopy,
      isOneBlock: false,
      totalBlocks: 0
    })
    this.selectedHouses = []
  }

  render() {
    console.log(this.selectedHouses)
    const { grid, isOneBlock, totalBlocks } = this.state
    console.log('isOneBlock', isOneBlock)
    return (
      <div>
        <div className="building-container" onClick={this.deselect}>
          {
            grid.map((floor, floorIndex) => {
              return <div className="unit-container flex">
                {
                  floor.map((house, houseIndex) => {
                    return <div className={`house-container ${house.selected ? 'selected' : ''}`} onClick={(e) => this.handleClickHouse(floorIndex, houseIndex, e)}>
                      {floorIndex}{houseIndex}
                    </div>
                  })
                }
              </div>
            })}
        </div>
        <div>是一片：{isOneBlock.toString()}</div>
        <div>有几片：{totalBlocks}</div>
      </div>
    );
  }
}

export default Building;
