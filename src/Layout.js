import React, { Component } from 'react';
import styled from 'styled-components';

import HeaderMenu from './HeaderMenu';

const Container = styled.div`
  height: 100%;
`;

class Layout extends Component {
  state = {}
  render() {
    return (
      <Container>
        <HeaderMenu />
      </Container>
    );
  }
}

export default Layout;
