import React, { Component } from 'react';
import styled from 'styled-components';

import HeaderMenu from './navigation/HeaderMenu';
import Footer from './navigation/Footer';
import Map from './map';

const Container = styled.div`
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: #515151;
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
