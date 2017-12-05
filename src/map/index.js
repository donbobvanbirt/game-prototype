import React, { Component } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';

import Hex from './Hex';
import { HexInfoModal } from './modals';

import { defaultGrid, calculateNeighbors } from './utils';

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

  buildBase = () => {
    const { grid, selectedHex } = this.state;
    // const { status } = grid[x][y];
    const { status, position } = selectedHex;
    const x = position[0];
    const y = position[1];

    if (status !== 'visible') return;

    const neighbors = calculateNeighbors(x, y);
    grid[x][y].status = 'controlled';
    selectedHex.status = 'controlled';

    neighbors.forEach((hexArr) => {
      const X = hexArr[0];
      const Y = hexArr[1];
      if (grid[X][Y].status === 'hidden') {
        grid[X][Y].status = 'visible';
      }
    });

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
              buildBase={this.buildBase}
            />}
        </Container>
      </Draggable>

    );
  }
}

export default Map;
