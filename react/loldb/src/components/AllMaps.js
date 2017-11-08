import React, { Component } from 'react';
import MapObject from './MapObject'

 
class AllMaps extends Component {


    constructor(props) {
        super(props);
        this.state = {
            maps: [],
            dataLoaded: 0,
            sort: ''
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

    updateSort(event) {
        this.setState({sort: event.target.value});
        this.setState({activePage: 1})
    }


    render() {
        if(this.state.dataLoaded === 0) {
            return <h2> Loading... </h2>
        } else {
            let data = this.state.maps;
            // console.log(data);
            var maps = [];
            Object.keys(data).forEach(function(key) {
                maps.push(data[key]);
            });

        if (this.state.sort === 'Ascending') {
        maps.sort(function(a, b) {
            if(a.mapName < b.mapName) return -1;
            if(a.mapName > b.mapName) return 1;
            return 0;
        });
        }
        else if(this.state.sort === 'Descending') {
            maps.sort(function(a, b) {
            if(a.mapName < b.mapName) return 1;
            if(a.mapName > b.mapName) return -1;
            return 0;
        });
        }
            
        
        return (
                <div>
                <section className="global-page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="block">
                                <h2>Maps</h2>
                                &nbsp; Sort By: &nbsp;
                                <button value='Ascending' onClick={this.updateSort.bind(this)}>Ascending</button>
                                <button value='Descending' onClick={this.updateSort.bind(this)}>Descending</button>
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