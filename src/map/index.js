import React, { Component } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';

import Hex from './Hex';

const Container = styled.div`
`;

const Row = styled.div`
  clear: left;
  margin-left: ${props => props.even ? '53px' : '0'};
`;

class Map extends Component {
  state = {}

  handleStart = () => {
    console.log('in handleStart');
  }

  handleDrag = () => {
    console.log('in handleDrag');
  }

  handleStop = () => {
    console.log('in handleStop');
  }

  render() {
    return (
      <Draggable

        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        grid={[25, 25]}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}
      >
        <Container className="handle">
          <Row>
            <Hex />
            <Hex />
            <Hex />
            <Hex />
            <Hex />
            <Hex />
          </Row>
          <Row even>
            <Hex />
            <Hex />
            <Hex />
            <Hex />
            <Hex />
          </Row>
          <Row>
            <Hex />
            <Hex />
            <Hex />
            <Hex />
            <Hex />
            <Hex />
          </Row>
          <Row even>
            <Hex />
            <Hex />
            <Hex />
            <Hex />
            <Hex />
          </Row>
          <Row>
            <Hex />
            <Hex />
            <Hex />
            <Hex />
            <Hex />
            <Hex />
          </Row>
          <Row even>
            <Hex />
            <Hex />
            <Hex />
            <Hex />
            <Hex />
          </Row>
          <Row>
            <Hex />
            <Hex />
            <Hex />
            <Hex />
            <Hex />
            <Hex />
          </Row>
        </Container>
      </Draggable>

    );
  }
}

export default Map;
