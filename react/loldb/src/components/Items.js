import React from 'react';
import { Switch, Route } from 'react-router-dom'
import AllItems from './AllItems'
import SingleItem from './SingleItem.js'


const Items = () => (
  <Switch>
    <Route exact path='/items' component={AllItems}/>
    <Route path ='/items/:name' component={SingleItem}/>
  </Switch>
)

export default Items;
