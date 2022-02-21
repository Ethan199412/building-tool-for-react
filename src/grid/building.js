import React, { Component } from "react";
import img from "../assets/react.jpg";
import { judgeOneBlock } from "../utils/utils";
import './building.less'


class Building extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: new Array(5).fill(Array(5).fill(0)),
      gridCopy: new Array(5).fill(Array(5).fill(0)),
      isOneBlock: false
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
      grid[floorIndex][houseIndex] = 1
      this.setState({
        grid
      })
    }
    else {
      this.selectedHouses = [[floorIndex, houseIndex]]
      gridCopy[floorIndex][houseIndex] = 1
      this.setState({
        grid: gridCopy
      })
    }

    const res = judgeOneBlock(this.selectedHouses, grid[0].length - 1, grid.length - 1)
    this.setState({
      isOneBlock: res
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
      isOneBlock: false
    })
    this.selectedHouses = []
  }

  render() {
    console.log(this.selectedHouses)
    const { grid, isOneBlock } = this.state
    console.log('isOneBlock', isOneBlock)
    return (
      <div>
        <div className="building-container" onClick={this.deselect}>
          {
            grid.map((floor, floorIndex) => {
              return <div className="unit-container flex">
                {
                  floor.map((house, houseIndex) => {
                    return <div className={`house-container ${house == 1 ? 'selected' : ''}`} onClick={(e) => this.handleClickHouse(floorIndex, houseIndex, e)}>

                    </div>
                  })
                }
              </div>
            })}
        </div>
        <div>是一片：{isOneBlock.toString()}</div>
      </div>
    );
  }
}

export default Building;
