import React, { Component } from 'react';
import '../index.css';

class MapObject extends Component {

    // constructor(props) {
    //     super(props);
    // }


    render () {
                            // <div className="text">
                            //     <p><strong>Champs: </strong>{this.props.thisMap.champs["0"]}...</p>
                            //     <p><strong>Champs: </strong>{this.props.thisMap.champs["0"]}...</p>
                            // </div>
    	console.log(this.props.thisMap)
        return (
           <div className="col-sm-3 container">
                   <figure className="wow">
                    <a href={`/maps/${this.props.thisMap.mapName}`}>
                        <img src={this.props.thisMap.image} class="img-responsive" alt="portfolio items" height={200} />
                    </a>
                    <figcaption>
                        <span>
                            <p><strong> {this.props.thisMap.mapName}</strong></p>
                            
                        </span>
                    </figcaption>
                </figure>
            </div> );
    }

}

export default MapObject;