import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import CountryDetails from './CountryDetails';
import CountryList from './CountryList';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/country/:code/details" component={CountryDetails} />
        <Route component={CountryList} />
      </Switch>
    </BrowserRouter>
  
  );
}

export default App;
