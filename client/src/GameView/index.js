import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Dimmer, Loader, Sidebar } from 'semantic-ui-react';
import { isEmpty } from 'lodash';

import HeaderMenu from '../navigation/HeaderMenu';
import GameMenu from './components/GameMenu';
import Map from './components/Map';

import { getGame, updateGame } from './actions';

import { darkGray, red } from '../shared/basic/colors';

const Container = styled.div`
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: ${darkGray};
`;

const ErrorMessage = styled.h1`
  margin: 50px;
  color: ${red};
`;

class Layout extends Component {
  state = { sideMenuVisible: true };

  componentDidMount() {
    const { requestGame, match } = this.props;

    requestGame(match.params.id);
  }

  toggleSideMenu = () => {
    console.log('sideMenuVisible:', this.state.sideMenuVisible);
    this.setState({
      sideMenuVisible: !this.state.sideMenuVisible,
    });
  }

  debitResources = (costObj) => {
    const { resources } = this.props.game;

    Object.keys(costObj).forEach((resource) => {
      const previousBallance = resources[resource];
      const newBalance = previousBallance - costObj[resource];
      resources[resource] = newBalance;
    });

    return resources;
  }

  render() {
    const { game, update } = this.props;
    const { sideMenuVisible } = this.state;

    return (
      <Container>
        <HeaderMenu toggleSideMenu={this.toggleSideMenu} />
        <Dimmer active={isEmpty(game)}>
          <Loader />
        </Dimmer>
        {game.error &&
          <ErrorMessage>
            {game.error.message || 'something bad happened'}
          </ErrorMessage>}
        <Map
          game={game}
          debitResources={this.debitResources}
          updateGame={update}
        />
        <Sidebar
          animation="overlay"
          width="wide"
          direction="right"
          visible={sideMenuVisible}
          icon="labeled"
        >
          <GameMenu resources={game.resources} />
        </Sidebar>
      </Container>
    );
  }
}

Layout.propTypes = {
  requestGame: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
};

const mapStateToProps = ({ game }) => ({
  game,
});

const mapDispatchToProps = dispatch => ({
  requestGame(id) {
    dispatch(getGame(id));
  },
  update(id, obj) {
    dispatch(updateGame(id, obj));
  },
});

const enhance = compose(connect(mapStateToProps, mapDispatchToProps), withRouter);

export default enhance(Layout);
