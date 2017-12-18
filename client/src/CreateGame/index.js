import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { requestNewGame } from './actions';

const Container = styled.div`
  height: 100%;
`;

class CreateGame extends Component {
  state = { requesting: false };

  componentWillReceiveProps(nextProps) {
    if (nextProps.game) {
      this.props.history.push(`/game/${nextProps.game._id}`);
    }
  }

  createGame = () => {
    this.setState({ requesting: true });
    this.props.newGame();
  }

  render() {
    return (
      <Container>
        <Button
          onClick={this.createGame}
          disabled={this.state.requesting}
          secondary
        >
          New game
        </Button>
      </Container>
    );
  }
}

CreateGame.propTypes = {
  newGame: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = ({ game }) => ({
  game,
});

const mapDispatchToProps = dispatch => ({
  newGame() {
    dispatch(requestNewGame());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame);
