import React, { Component } from 'react';
import styled from 'styled-components';

import HeaderMenu from '../navigation/HeaderMenu';
import GameMenu from './components/GameMenu';
import Map from './components/Map';

import { darkGray } from '../shared/basic/colors';

const Container = styled.div`
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: ${darkGray};
`;

class Layout extends Component {
  state = {
    resources: {
      energy: 1000,
      iron: 1000,
      gold: 350,
      silver: 400,
      nickel: 1000,
      carbon: 1000,
      hydrogen: 1000,
      platinum: 1000,
      silicon: 1000,
      copper: 200,
      steel: 1000,
      machineParts: 50,
      computerHardware: 133,
    },
  }

  debitResources = (costObj) => {
    const { resources } = this.state;

    Object.keys(costObj).forEach((resource) => {
      const previousBallance = resources[resource];
      const newBalance = previousBallance - costObj[resource];
      resources[resource] = newBalance;
    });

    this.setState({ resources });
  }

  render() {
    const { resources } = this.state;
    return (
      <Container>
        <HeaderMenu />
        <Map resources={resources} debitResources={this.debitResources} />
        <GameMenu resources={resources} />
      </Container>
    );
  }
}

export default Layout;
