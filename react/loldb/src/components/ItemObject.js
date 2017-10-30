import React, { Component } from 'react';
import '../index.css';

class ItemObject extends Component {

    // constructor(props) {
    //     super(props);
    // }


    render () {
    	// console.log(this.props.thisItem)
        return (
           <div className="col-sm-2 container">
                   <figure className="wow">
                    <a href={`/items/${this.props.thisItem.id}`}>
                        <div className="img-wrapper2">
                            <img src={this.props.thisItem.image} className="img-responsive" alt="portfolio items" />
                        </div>
                    </a>
                    <figcaption>
                        <span>
                            <p><strong> {this.props.thisItem.name}</strong></p>
                    
                            <div className="text">
                            	<p> <strong>Cost:</strong> {this.props.thisItem.gold.total} </p>
                            	<p> <strong>Desc:</strong>{this.props.thisItem.sanitizedDescription} </p>
                            	<p> <strong> Sell: </strong> {this.props.thisItem.gold.sell} </p>
                            </div>
                        </span>
                    </figcaption>
                </figure>
            </div> );
    }

}

export default ItemObject;