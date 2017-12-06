import React, { Component } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';

import Hex from './components/Hex';
import { HexInfoModal } from './components/modals';

import { defaultGrid, calculateNeighbors, industrialItems } from './utils';

const Container = styled.div`
  width: 2200px;
  cursor: ${props => props.dragging ? 'move' : 'default'};
`;

const Row = styled.div`
  clear: left;
  margin-left: ${props => props.even ? '53px' : '0'};
`;

class Map extends Component {
  state = {
    grid: defaultGrid(),
    dragging: false,
    selectedHex: null,
  }

  buildBase = (grid, selectedHex) => {
    const newGrid = grid;
    const newHex = selectedHex;
    const { status, position } = selectedHex;
    const x = position[0];
    const y = position[1];

    if (status !== 'visible') return;

    const neighbors = calculateNeighbors(x, y);
    newGrid[x][y].status = 'controlled';
    newHex.status = 'controlled';

    neighbors.forEach((hexArr) => {
      const X = hexArr[0];
      const Y = hexArr[1];
      if (newGrid[X][Y].status === 'hidden') {
        newGrid[X][Y].status = 'visible';
      }
    });

    this.setState({ grid: newGrid, selectedHex: newHex });
  }

  build = (item) => {
    const itemObj = industrialItems[item];
    const { grid, selectedHex } = this.state;
    const { position, buildings } = selectedHex;
    const x = position[0];
    const y = position[1];

    selectedHex.buildings = [...buildings, itemObj];
    grid[x][y] = selectedHex;

    this.props.debitResources(itemObj.cost);

    if (item === 'base') return this.buildBase(grid, selectedHex);

    this.setState({ grid, selectedHex });
  }

  viewHex = (hex) => {
    if (hex.status === 'hidden') return;
    this.setState({ selectedHex: hex });
  }

  closeHexModal = () => {
    this.setState({ selectedHex: null });
  }

  renderGrid = () => (
    this.state.grid.map((arr, i) => (
      <Row key={`row-${i}`} even={i % 2 === 0}>
        {arr.map((hex, j) => (
          <Hex
            key={`hex-${i}-${j}`}
            // status={hex.status}
            onClick={() => this.viewHex(hex)}
            {...hex}
          >
            {`${i}-${j}`}
          </Hex>
        ))}
      </Row>
    ))
  )

  render() {
    const { dragging, selectedHex } = this.state;
    // const { resources } = this.props;

    return (
      <Draggable
        handle=".handle"
        defaultPosition={{ x: -500, y: -500 }}
        position={null}
        grid={[25, 25]}
        onStart={() => this.setState({ dragging: true })}
        onStop={() => this.setState({ dragging: false })}
      >
        <Container className="handle" dragging={dragging}>
          {this.renderGrid()}
          {selectedHex &&
            <HexInfoModal
              hex={selectedHex}
              close={this.closeHexModal}
              build={this.build}
            />}
        </Container>
      </Draggable>

    );
  }
}

Map.propTypes = {
  debitResources: PropTypes.func.isRequired,
};

export default Map;
