import React, { Component } from 'react';
import '../index.css';

class ItemObject extends Component {

	// constructor(props) {
	// 	super(props);
	// }

	render () {
		return (
	       <div className="col-sm-4 container">
	       		<figure className="wow">
		            <a href="\home">
		                <div class="img-wrapper2">
		                    <img src={this.props.thisItem.image} class="img-responsive" alt="portfolio items" />
		                </div>
		            </a>
		            <figcaption>
			            <div>
			                <h4> {this.props.thisItem.name}</h4>
			                <h4>
			                    Cost: {this.props.thisItem.gold.total}
			                </h4>
			                <h4> {this.props.thisItem.sanitizedDescription} </h4>
			            </div>
			        </figcaption>
		        </figure>
	    	</div> );
	}

}

export default ItemObject;