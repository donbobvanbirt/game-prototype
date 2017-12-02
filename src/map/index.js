import React, { Component } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';

import Hex from './Hex';

import { grid } from './utils';

const Container = styled.div`
  width: 2200px;
  cursor: ${props => props.dragging ? 'move' : 'pointer'};
`;

const Row = styled.div`
  clear: left;
  margin-left: ${props => props.even ? '53px' : '0'};
`;

class Map extends Component {
  state = { grid, dragging: false }

  handleStart = () => {
    console.log('in handleStart');
    this.setState({ dragging: true });
  }

  handleDrag = () => {
    // console.log('in handleDrag');
  }

  handleStop = () => {
    console.log('in handleStop');
    this.setState({ dragging: false });
  }

  renderGrid = () => (
    this.state.grid.map((arr, i) => (
      <Row key={`row-${i}`} even={i % 2 === 0}>
        {arr.map((hex, j) => (
          <Hex key={`hex-${i}-${j}`} />
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
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}
      >
        <Container className="handle" dragging={dragging}>
          {this.renderGrid()}
        </Container>
      </Draggable>

    );
  }
}

export default Map;
