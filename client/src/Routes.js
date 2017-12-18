import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import styled from 'styled-components';
//
// const Container = styled.div`
//   height: 100%;
// `;

import GameView from './GameView';
import CreateGame from './CreateGame';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={CreateGame} />
      <Route exact path="/game/:id" component={GameView} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
