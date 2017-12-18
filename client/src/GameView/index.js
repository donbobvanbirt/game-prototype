import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Dimmer, Loader } from 'semantic-ui-react';
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
  componentDidMount() {
    const { requestGame, match } = this.props;

    requestGame(match.params.id);
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

    return (
      <Container>
        <HeaderMenu />
        <Dimmer active={isEmpty(game)}>
          <Loader />
        </Dimmer>
        {game.error && <ErrorMessage>game not found</ErrorMessage>}
        <Map
          game={game}
          debitResources={this.debitResources}
          updateGame={update}
        />
        <GameMenu resources={game.resources} />
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
