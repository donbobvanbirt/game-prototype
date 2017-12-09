import React from 'react';
import { Provider } from 'react-redux';

import GameView from './GameView';

import store from './store';

const App = () => (
  <Provider store={store}>
    <GameView />
  </Provider>
);

export default App;
