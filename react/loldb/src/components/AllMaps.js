import React, { Component } from 'react';
import myMap from './maps.json';
import MapObject from './MapObject'

 
class AllMaps extends Component {

    render() {
        let data = myMap;
        // console.log(data);
        var maps = [];
        Object.keys(myMap).forEach(function(key) {
            maps.push(myMap[key]);
        });
        
    
        return (
            <div>
            <section className="global-page-header">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="block">
                            <h2>Maps</h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        	<div className="row">{maps.map(mapjson => 
        		<MapObject key={mapjson.id} thisMap={mapjson} />)}
                
        	</div>
            
        </div>
        )
    }
}

export default AllMaps;