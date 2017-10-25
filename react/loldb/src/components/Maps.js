import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AllMaps from './AllMaps'
import SingleMap from './SingleMap'
 
class Maps extends Component {
    render() {
        return (
        	<Switch>
    			<Route exact path='/maps' component={AllMaps}/>
   				<Route path ='/maps/:id' component={SingleMap}/>
  			</Switch>
        )
    }
}

export default Maps;
