import React from 'react';
import { Switch, Route } from 'react-router-dom'
import AllMatches from './AllMatches'
import MatchSingle from './MatchSingle'
//import SingleItem from './SingleItem.js'



const Matches = () => (
  <Switch>
    <Route exact path='/matches' component={AllMatches}/>
    <Route path='/matches/:matchId' component={MatchSingle}/>
  </Switch>
)



export default Matches;
