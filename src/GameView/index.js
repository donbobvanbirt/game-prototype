import React, { Component } from 'react';
import styled from 'styled-components';

import HeaderMenu from '../navigation/HeaderMenu';
import GameMenu from './GameMenu';
import Map from './map';

import { darkGray } from '../shared/basic/colors';

const Container = styled.div`
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: ${darkGray};
`;

class Layout extends Component {
  state = {}
  render() {
    return (
      <Container>
        <HeaderMenu />
        <Map />
        <GameMenu />
      </Container>
    );
  }
}

export default Layout;
