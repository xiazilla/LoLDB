import React, { Component } from 'react';
import './Champions.css';


class ChampionObject extends Component {

	// constructor(props) {
	// 	super(props);
	// }

	render () {
		return (
	      <div className="col-sm-3 container">
	       		<figure className="wow">
		            <a href="\home">
		                <div className="img-wrapper2">
		                    <img src={this.props.thisChampion.image} class="img-responsive" alt="portfolio items" />
		                </div>
		            </a>
		            <figcaption>
		            	<span>
			                <h4><strong> {this.props.thisChampion.name}</strong></h4>
			                
			                <p> {this.props.thisChampion.title} </p>
				        </span>
			        </figcaption>
		        </figure>
	    	</div> 

	     );

	}

}

export default ChampionObject;