import React, { Component } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';

import Hex from './Hex';

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
  state = { grid: defaultGrid(), dragging: false }

  selectHex = (x, y) => {
    const { grid } = this.state;
    const { status } = grid[x][y];
    if (status !== 'bordered') return;

    const neighbors = calculateNeighbors(x, y);
    grid[x][y].status = 'controlled';
    neighbors.forEach((hexArr) => {
      const X = hexArr[0];
      const Y = hexArr[1];
      if (grid[X][Y].status === 'hidden') {
        grid[X][Y].status = 'bordered';
      }
    });

    this.setState({ grid });
  }

  renderGrid = () => (
    this.state.grid.map((arr, i) => (
      <Row key={`row-${i}`} even={i % 2 === 0}>
        {arr.map((hex, j) => (
          <Hex
            key={`hex-${i}-${j}`}
            status={hex.status}
            onClick={() => this.selectHex(i, j)}
          >
            {`${i}-${j}`}
          </Hex>
        ))}
      </Row>
    ))
  )

  render() {
    const { dragging } = this.state;

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
        </Container>
      </Draggable>

    );
  }
}

export default Map;
