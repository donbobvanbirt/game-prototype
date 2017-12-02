import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 150px;
  background-color: #000000;
`;

class Footer extends Component {
  state = {}
  render() {
    return (
      <Container />
    );
  }
}

export default Footer;
