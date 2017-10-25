import React, { Component } from 'react';
import myMap from './maps.json';
import MapObject from './MapObject'

 
class AllMaps extends Component {

    render() {
        let data = myMap;
        console.log(data);
        var maps = [];
        Object.keys(myMap).forEach(function(key) {
            maps.push(myMap[key]);
        });

        console.log(maps);
        
    
        return (
        	<div className="row">{maps.map(mapjson => 
        		<MapObject key={mapjson.id} thisMap={mapjson} />)}
    
        	</div>
        )
    }
}

export default AllMaps;