import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Board from './containers/Board/Board'
import CryptoCoin from './containers/CryptoCoin/CryptoCoin';


function App() {
  return (
    <BrowserRouter>

      <Switch>
        <Route
          path="/"
          component={Board}
          exact
        />
        <Route
          path="/criptocoin/:id"
          component={CryptoCoin}
        />
      </Switch>

    </BrowserRouter>

  );
}

export default App;
