import React, { Component } from 'react';
import styled from 'styled-components';

import HeaderMenu from './navigation/HeaderMenu';
import Footer from './navigation/Footer';
import Map from './map';

import { darkGrey } from './shared/basic/colors';

const Container = styled.div`
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: ${darkGrey};
`;

class Layout extends Component {
  state = {}
  render() {
    return (
      <Container>
        <HeaderMenu />
        <Map />
        <Footer />
      </Container>
    );
  }
}

export default Layout;
