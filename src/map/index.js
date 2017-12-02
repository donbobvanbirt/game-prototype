import React, { Component } from 'react';
import styled from 'styled-components';

import Hex from './Hex';

const Container = styled.div`
`;

const Row = styled.div`
  clear: left;
  margin-left: ${props => props.even ? '53px' : '0'};
`;

class Map extends Component {
  state = {}
  render() {
    return (
      <Container>
        <Row>
          <Hex />
          <Hex />
          <Hex />
        </Row>
        <Row even>
          <Hex />
          <Hex />
        </Row>
        <Row>
          <Hex />
          <Hex />
          <Hex />
        </Row>
      </Container>
    );
  }
}

export default Map;
