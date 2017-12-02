import React, { Component } from 'react';
import styled from 'styled-components';

import { black } from '../shared/basic/colors';

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 150px;
  background-color: ${black};
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
