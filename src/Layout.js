import React, { Component } from 'react';
import styled from 'styled-components';

import HeaderMenu from './navigation/HeaderMenu';
import Footer from './navigation/Footer';

const Container = styled.div`
  height: 100%;
  position: relative;
`;

class Layout extends Component {
  state = {}
  render() {
    return (
      <Container>
        <HeaderMenu />
        <Footer />
      </Container>
    );
  }
}

export default Layout;
