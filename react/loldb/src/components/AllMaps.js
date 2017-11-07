import React, { Component } from 'react';
import MapObject from './MapObject'

 
class AllMaps extends Component {


    constructor(props) {
        super(props);
        this.state = {
            maps: [],
            dataLoaded: 0
        }
    }

    componentWillMount() {
        let url = `https://loldbapi.appspot.com/api/maps`

        fetch(url)
        .then(response => {
            return response.json()
            }).then(results => {
                console.log(results)
                this.setState({maps: results.result})
                this.setState({dataLoaded: 1})
                // console.log("state", this.state.data)
            })    }


    render() {
        if(this.state.dataLoaded === 0) {
            return <div> Loading... </div>
        } else {
            let data = this.state.maps;
            // console.log(data);
            var maps = [];
            Object.keys(data).forEach(function(key) {
                maps.push(data[key]);
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
        		<MapObject key={mapjson.mapId} thisMap={mapjson} />)}
        	</div>

            {maps.length === 0 ? <div> No Items Match Your Search </div> :
            <section className="global-page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="block">
                                    <div className="pager in-line"> 
                                        <button className="active">1</button>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>   
            </section>}  
                
            </div>
        )
        }
    }
}

export default AllMaps;