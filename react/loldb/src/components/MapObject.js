import React, { Component } from 'react';
import '../index.css';

class MapObject extends Component {

    // constructor(props) {
    //     super(props);
    // }


    render () {
    	// console.log(this.props.thisItem)
        return (
           <div className="col-sm-2 container">
                   <figure className="wow">
                    <a href={`/items/${this.props.thisMap.id}`}>
                        <div class="img-wrapper2">
                            <img src={this.props.thisMap.image} class="img-responsive" alt="portfolio items" height={200} />
                        </div>
                    </a>
                    <figcaption>
                        <span>
                            <p><strong> {this.props.thisMap.name}</strong></p>
                            
                        </span>
                    </figcaption>
                </figure>
            </div> );
    }

}

export default MapObject;