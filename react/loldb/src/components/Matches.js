import React from 'react';
import { Switch, Route } from 'react-router-dom'
import AllMatches from './AllMatches'
import SingleMatch from './SingleMatch'

const Matches = () => (
  <Switch>
    <Route exact path='/matches' component={AllMatches}/>
    <Route path='/matches/:matchId' component={SingleMatch}/>
  </Switch>
)



export default Matches;
