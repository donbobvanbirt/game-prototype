import React, { Component } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';

import Hex from './Hex';

import { grid as defaultGrid } from './utils';

const Container = styled.div`
  width: 2200px;
  cursor: ${props => props.dragging ? 'move' : 'pointer'};
`;

const Row = styled.div`
  clear: left;
  margin-left: ${props => props.even ? '53px' : '0'};
`;

class Map extends Component {
  state = { grid: defaultGrid, dragging: false }

  selectHex = (x, y) => {
    const { grid } = this.state;
    grid[x][y].status = 'selected';

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
          />
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
