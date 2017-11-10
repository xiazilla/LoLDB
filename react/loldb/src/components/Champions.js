import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AllChampions from './AllChampions';
import SingleChampion from './SingleChampion';

const Champions = () => (
  <Switch>
    <Route exact path='/champions' component={AllChampions} />
    <Route path='/champions/:name' component={SingleChampion} />
  </Switch>
);

export default Champions;
